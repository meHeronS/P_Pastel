// scriptPedidos.js

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
}

// Função para finalizar o pedido
function finalizarPedido() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    if (!nomeCliente) {
        alert('Por favor, digite seu nome.');
        return;
    }

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
}

// Evento do botão para finalizar pedido
document.getElementById('finalizarBtn').addEventListener('click', finalizarPedido);
