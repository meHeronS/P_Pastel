// scriptPedidos.js

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const quantidade = document.getElementById(`quantidade-${nome}`).value;
    if (quantidade > 0) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.nome === nome);
        if (itemExistente) {
            itemExistente.quantidade += parseInt(quantidade);
        } else {
            carrinho.push({ nome, preco, quantidade: parseInt(quantidade) });
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    } else {
        alert('Quantidade inválida.');
    }
}

// Função para atualizar o carrinho de compras
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    let total = 0;
    carrinho.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.innerHTML = `
            <span>${item.nome}</span>
            <span>${item.quantidade} x R$${item.preco.toFixed(2)}</span>
            <span>R$${itemTotal.toFixed(2)}</span>
            <button onclick="editarQuantidade('${item.nome}', -1)">-</button>
            <button onclick="editarQuantidade('${item.nome}', 1)">+</button>
            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        carrinhoDiv.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrinho-total';
    totalDiv.innerHTML = `Total: R$${total.toFixed(2)}`;
    carrinhoDiv.appendChild(totalDiv);
}

// Função para editar a quantidade no carrinho
function editarQuantidade(nome, delta) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(nome);
        } else {
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
        }
    }
}

// Função para remover itens do carrinho
function removerDoCarrinho(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.nome !== nome);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para finalizar o pedido
function finalizarPedido() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            const pedidos = data.pedidos;
            const numeroPedido = String(pedidos.length + 1).padStart(7, '0');
            const nomeCliente = localStorage.getItem('nomeCliente');
            const valorTotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
            
            const novoPedido = {
                data: new Date().toLocaleString(),
                cliente: nomeCliente,
                numeroPedido,
                produtos: carrinho,
                valor: valorTotal,
                status: 'Pendente'
            };

            pedidos.push(novoPedido);
            localStorage.setItem('pedidos', JSON.stringify(pedidos));

            // Exibir resumo do pedido
            document.getElementById('pedidoCliente').style.display = 'none';
            document.getElementById('resumoPedido').style.display = 'block';
            document.getElementById('resumoNome').innerText = `Cliente: ${nomeCliente}`;
            document.getElementById('resumoNumero').innerText = `Pedido Nº: ${numeroPedido}`;
            document.getElementById('resumoTotal').innerText = `Total: R$${valorTotal.toFixed(2)}`;
        })
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

// Carregar os sabores na página de pedidos
function carregarSabores() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const saboresDiv = document.getElementById('sabores');
            saboresDiv.innerHTML = '';
            data.sabores.forEach(sabor => {
                const saborDiv = document.createElement('div');
                saborDiv.className = 'sabor-item';
                saborDiv.innerHTML = `
                    <span>${sabor.nome} - R$${sabor.preco.toFixed(2)}</span>
                    <input type="number" id="quantidade-${sabor.nome}" value="1" min="1" max="99" />
                    <button onclick="adicionarAoCarrinho('${sabor.nome}', ${sabor.preco})">Adicionar</button>
                `;
                saboresDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar sabores:', error));
}
