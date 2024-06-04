// scriptPedidos.js

let carrinho = [];

// Função para adicionar um sabor ao carrinho
function adicionarAoCarrinho(sabor) {
    const quantidade = document.getElementById(`quantidade-${sabor.id}`).value;
    const preco = sabor.preco;
    carrinho.push({ sabor: sabor.nome, quantidade: quantidade, preco: preco });
    atualizarCarrinho();
}

// Função para atualizar o carrinho de compras
function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carrinho-item');
        itemDiv.innerHTML = `${item.quantidade} x ${item.sabor} - R$${(item.preco * item.quantidade).toFixed(2)}`;
        carrinhoDiv.appendChild(itemDiv);
        total += item.preco * item.quantidade;
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('carrinho-total');
    totalDiv.innerHTML = `Total: R$${total.toFixed(2)}`;
    carrinhoDiv.appendChild(totalDiv);

    const finalizarBtn = document.createElement('button');
    finalizarBtn.classList.add('btn');
    finalizarBtn.innerHTML = 'Finalizar Pedido';
    finalizarBtn.onclick = finalizarPedido;
    carrinhoDiv.appendChild(finalizarBtn);
}

// Função para finalizar o pedido
function finalizarPedido() {
    const clienteNome = localStorage.getItem('clienteNome');
    if (!clienteNome) {
        alert('Nome do cliente não encontrado. Por favor, volte e insira seu nome novamente.');
        voltarInicio();
        return;
    }

    const numeroPedido = new Date().getTime();
    const totalPedido = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);

    const pedido = {
        data: new Date().toISOString(),
        cliente: clienteNome,
        numeroPedido: numeroPedido,
        produtosPedidos: carrinho,
        formaDePagamento: 'pendente', // Será atualizado no pagamento
        valor: totalPedido
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
            localStorage.removeItem('clienteNome');
            mostrarResumoPedido(numeroPedido, totalPedido);
        })
        .catch(error => console.error('Erro ao finalizar o pedido:', error));
}

// Função para mostrar o resumo do pedido
function mostrarResumoPedido(numeroPedido, totalPedido) {
    document.getElementById('pedidoCliente').style.display = 'none';
    const resumoDiv = document.getElementById('resumoPedido');
    resumoDiv.style.display = 'block';
    document.getElementById('resumoPedidoNumero').innerHTML = `Número do Pedido: ${numeroPedido}`;
    document.getElementById('resumoPedidoValor').innerHTML = `Total: R$${totalPedido.toFixed(2)}`;
}

// Função para confirmar se deseja deixar uma avaliação
function confirmarAvaliacao(desejaAvaliar) {
    if (desejaAvaliar) {
        document.getElementById('resumoPedido').style.display = 'none';
        document.getElementById('avaliarPedido').style.display = 'block';
    } else {
        alert('Obrigado pelo pedido!');
        setTimeout(voltarInicio, 2000);
    }
}

// Função para salvar a avaliação do cliente
function salvarAvaliacao() {
    const clienteNome = localStorage.getItem('clienteNome');
    const nota = document.querySelector('input[name="notaAvaliacao"]:checked').value;
    const comentario = document.getElementById('comentarioAvaliacao').value;

    const avaliacao = {
        nomeCliente: clienteNome,
        avaliacaoEmEstrelas: nota,
        comentario: comentario
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
            alert('Avaliação salva com sucesso!');
            voltarInicio();
        })
        .catch(error => console.error('Erro ao salvar a avaliação:', error));
}
