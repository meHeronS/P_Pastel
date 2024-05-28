// scriptPedidos.js

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
}

// Função para finalizar o pedido
function finalizarPedido() {
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
    }
}

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
}
