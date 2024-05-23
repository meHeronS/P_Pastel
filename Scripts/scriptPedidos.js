// scriptPedidos.js

// Função para adicionar um item ao carrinho de compras do cliente
function adicionarAoCarrinho(nome, preco) {
    const quantidade = parseInt(document.getElementById(`quantidade-${nome}`).value);
    if (quantidade > 0) {
        const item = { nome, preco, quantidade };
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(item);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    } else {
        alert('Quantidade inválida!');
    }
}

// Função para atualizar o carrinho de compras na tela
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.textContent = `${item.quantidade}x ${item.nome} - R$${(item.preco * item.quantidade).toFixed(2)}`;
        carrinhoDiv.appendChild(itemDiv);
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

    const voltarBtn = document.createElement('button');
    voltarBtn.className = 'btn';
    voltarBtn.textContent = 'Voltar';
    voltarBtn.onclick = voltarTelaPrincipal;
    carrinhoDiv.appendChild(voltarBtn);
}

// Função para finalizar o pedido
function finalizarPedido() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const pedidoNumero = gerarNumeroPedido();
    const nomeCliente = localStorage.getItem('nomeCliente');

    const pedido = {
        numero: pedidoNumero,
        total: total,
        itens: carrinho,
        data: new Date().toLocaleString(),
        cliente: nomeCliente,
        pago: false,
        entregue: false
    };

    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            data.pedidos.push(pedido);
            return fetch('data/pedidos.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            localStorage.removeItem('carrinho');
            document.getElementById('pedidoCliente').style.display = 'none';
            document.getElementById('resumoPedido').style.display = 'block';
            document.getElementById('resumoPedidoNome').textContent = `Cliente: ${nomeCliente}`;
            document.getElementById('resumoPedidoNumero').textContent = `Número do Pedido: ${pedidoNumero}`;
            document.getElementById('resumoPedidoValor').textContent = `Valor Total: R$${total.toFixed(2)}`;
        })
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

// Função para gerar um número sequencial de pedido
function gerarNumeroPedido() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    return (pedidos.length + 1).toString().padStart(7, '0');
}

// Função para confirmar a avaliação do pedido
function confirmarAvaliacao(desejaAvaliar) {
    if (desejaAvaliar) {
        document.getElementById('resumoPedido').style.display = 'none';
        document.getElementById('avaliarPedido').style.display = 'block';
    } else {
        alert('Obrigado pelo seu pedido!');
        setTimeout(voltarTelaPrincipal, 2000);
    }
}

// Função para salvar a avaliação do cliente
function salvarAvaliacao() {
    const nota = document.querySelector('input[name="notaAvaliacao"]:checked').value;
    const comentario = document.getElementById('comentarioAvaliacao').value;
    const clienteNome = localStorage.getItem('nomeCliente');

    const avaliacao = {
        nome: clienteNome,
        nota: parseInt(nota),
        comentario: comentario
    };

    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            data.avaliacoes.push(avaliacao);
            return fetch('data/avaliacoes.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            alert('Obrigado pela sua avaliação!');
            setTimeout(voltarTelaPrincipal, 2000);
        })
        .catch(error => console.error('Erro ao salvar avaliação:', error));
}
