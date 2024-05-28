// scriptPedidos.js

<<<<<<< HEAD
// Função para adicionar item ao carrinho de compras
function adicionarAoCarrinho(nome, preco) {
    const quantidade = parseInt(prompt('Quantas unidades você deseja?'), 10);
    if (quantidade > 0) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.nome === nome);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({ nome, preco, quantidade });
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
=======
// Variáveis globais
let carrinho = [];
let numeroPedido = 1;

// Função para exibir os sabores disponíveis
function exibirSabores(sabores) {
    const saboresDiv = document.getElementById('sabores');
    saboresDiv.innerHTML = '';
    sabores.forEach(sabor => {
        const saborDiv = document.createElement('div');
        saborDiv.classList.add('sabor');

        const saborNome = document.createElement('span');
        saborNome.textContent = sabor.nome;

        const saborPreco = document.createElement('span');
        saborPreco.textContent = `R$${sabor.preco.toFixed(2)}`;

        const quantidadeInput = document.createElement('input');
        quantidadeInput.type = 'number';
        quantidadeInput.value = 1;
        quantidadeInput.min = 1;

        const adicionarBtn = document.createElement('button');
        adicionarBtn.textContent = 'Adicionar';
        adicionarBtn.addEventListener('click', () => adicionarAoCarrinho(sabor, quantidadeInput.value));

        saborDiv.appendChild(saborNome);
        saborDiv.appendChild(saborPreco);
        saborDiv.appendChild(quantidadeInput);
        saborDiv.appendChild(adicionarBtn);
        saboresDiv.appendChild(saborDiv);
    });
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(sabor, quantidade) {
    const itemExistente = carrinho.find(item => item.sabor === sabor.nome);
    if (itemExistente) {
        itemExistente.quantidade += parseInt(quantidade);
>>>>>>> 485bdb3a45493f8cf1cab1d8a8e961f4c970fac5
    } else {
        carrinho.push({ sabor: sabor.nome, quantidade: parseInt(quantidade), preco: sabor.preco });
    }
    atualizarCarrinho();
}

// Função para remover item do carrinho
function removerDoCarrinho(saborNome) {
    carrinho = carrinho.filter(item => item.sabor !== saborNome);
    atualizarCarrinho();
}

// Função para atualizar quantidade no carrinho
function atualizarQuantidade(saborNome, novaQuantidade) {
    const item = carrinho.find(item => item.sabor === saborNome);
    if (item) {
        item.quantidade = parseInt(novaQuantidade);
        atualizarCarrinho();
    }
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    carrinho.forEach(item => {
<<<<<<< HEAD
        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.textContent = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade}`;
        carrinhoDiv.appendChild(div);
        total += item.preco * item.quantidade;
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrinho-total';
    totalDiv.textContent = `Total: R$${total.toFixed(2)}`;
    carrinhoDiv.appendChild(totalDiv);

    const finalizarBtn = document.createElement('button');
    finalizarBtn.className = 'btn';
    finalizarBtn.textContent = 'Finalizar Pedido';
    finalizarBtn.onclick = finalizarPedido;
    carrinhoDiv.appendChild(finalizarBtn);
=======
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');

        const itemNome = document.createElement('span');
        itemNome.textContent = item.sabor;

        const itemQuantidade = document.createElement('input');
        itemQuantidade.type = 'number';
        itemQuantidade.value = item.quantidade;
        itemQuantidade.min = 1;
        itemQuantidade.addEventListener('change', () => atualizarQuantidade(item.sabor, itemQuantidade.value));

        const itemPreco = document.createElement('span');
        itemPreco.textContent = `R$${(item.preco * item.quantidade).toFixed(2)}`;

        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.addEventListener('click', () => removerDoCarrinho(item.sabor));

        itemDiv.appendChild(itemNome);
        itemDiv.appendChild(itemQuantidade);
        itemDiv.appendChild(itemPreco);
        itemDiv.appendChild(removerBtn);
        carrinhoDiv.appendChild(itemDiv);
    });
>>>>>>> 485bdb3a45493f8cf1cab1d8a8e961f4c970fac5
}

// Função para finalizar o pedido
function finalizarPedido() {
<<<<<<< HEAD
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const clienteNome = localStorage.getItem('clienteNome');
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const pedidoCodigo = Math.random().toString(36).substr(2, 9).toUpperCase();

    const pedido = {
        codigo: pedidoCodigo,
        cliente: clienteNome,
        itens: carrinho,
        total,
        finalizado: false,
        pago: false,
        entregue: false
    };

    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            data.pedidos.push(pedido);
            return fetch('data/pedidos.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            localStorage.removeItem('carrinho');
            mostrarResumoPedido(pedidoCodigo, total);
        })
        .catch(error => console.error('Erro ao finalizar o pedido:', error));
}

// Função para mostrar o resumo do pedido
function mostrarResumoPedido(codigo, total) {
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'block';
    document.getElementById('resumoPedidoNumero').textContent = `Código do Pedido: ${codigo}`;
    document.getElementById('resumoPedidoValor').textContent = `Total: R$${total.toFixed(2)}`;
}

// Função para confirmar se o cliente deseja deixar uma avaliação
function confirmarAvaliacao(desejaAvaliar) {
    if (desejaAvaliar) {
        document.getElementById('resumoPedido').style.display = 'none';
        document.getElementById('avaliarPedido').style.display = 'block';
    } else {
        alert('Obrigado pelo pedido!');
        setTimeout(() => {
            voltarInicio();
        }, 2000);
=======
    const nomeCliente = document.getElementById('nomeCliente').value;
    if (!nomeCliente) {
        alert('Por favor, digite seu nome.');
        return;
>>>>>>> 485bdb3a45493f8cf1cab1d8a8e961f4c970fac5
    }

<<<<<<< HEAD
// Função para salvar a avaliação
function salvarAvaliacao() {
    const nota = document.querySelector('input[name="notaAvaliacao"]:checked').value;
    const comentario = document.getElementById('comentarioAvaliacao').value;

    const avaliacao = {
        cliente: localStorage.getItem('clienteNome'),
        nota,
        comentario
    };

    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            data.avaliacoes.push(avaliacao);
            return fetch('data/avaliacoes.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            alert('Obrigado pela avaliação!');
            voltarInicio();
        })
        .catch(error => console.error('Erro ao salvar a avaliação:', error));
=======
    const valorTotal = carrinho.reduce((total, item) => total + item.quantidade * item.preco, 0);
    const pedido = {
        nomeCliente,
        numeroPedido: numeroPedido++,
        valorTotal,
        itens: carrinho
    };

    salvarJson('data/pedidos.json', pedido);

    document.getElementById('resumoNome').textContent = `Nome: ${nomeCliente}`;
    document.getElementById('resumoNumero').textContent = `Número do Pedido: ${pedido.numeroPedido}`;
    document.getElementById('resumoTotal').textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;

    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'block';
>>>>>>> 485bdb3a45493f8cf1cab1d8a8e961f4c970fac5
}

// Evento do botão para finalizar pedido
document.getElementById('finalizarBtn').addEventListener('click', finalizarPedido);
