document.addEventListener('DOMContentLoaded', () => {
    const saboresContainer = document.getElementById('saboresContainer');
    const carrinhoElement = document.getElementById('carrinho');
    const totalElement = document.getElementById('total');
    const finalizarPedidoButton = document.getElementById('finalizarPedido');
    
    let carrinho = [];

    // Função para carregar sabores
    function carregarSabores() {
        fetch('../Data/sabores.json')
            .then(response => response.json())
            .then(data => {
                const sabores = data.sabores;
                sabores.forEach(sabor => {
                    const saborItem = document.createElement('div');
                    saborItem.className = 'sabor-item';
                    saborItem.innerHTML = `
                        <span>${sabor.sabor} - R$ ${sabor.preco.toFixed(2)}</span>
                        <input type="number" min="1" value="1" class="quantidade">
                        <button class="btn adicionarCarrinho">Adicionar</button>
                    `;
                    saboresContainer.appendChild(saborItem);

                    saborItem.querySelector('.adicionarCarrinho').addEventListener('click', () => {
                        const quantidade = parseInt(saborItem.querySelector('.quantidade').value);
                        adicionarAoCarrinho(sabor, quantidade);
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os sabores:', error);
            });
    }

    // Função para adicionar item ao carrinho
    function adicionarAoCarrinho(sabor, quantidade) {
        const itemExistente = carrinho.find(item => item.sabor === sabor.sabor);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({ ...sabor, quantidade });
        }
        atualizarCarrinho();
    }

    // Função para atualizar carrinho
    function atualizarCarrinho() {
        carrinhoElement.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <span>${item.quantidade} x ${item.sabor} - R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                <button class="btn removerItem">Remover</button>
            `;
            carrinhoElement.appendChild(itemElement);

            itemElement.querySelector('.removerItem').addEventListener('click', () => {
                removerDoCarrinho(item.sabor);
            });

            total += item.preco * item.quantidade;
        });

        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Função para remover item do carrinho
    function removerDoCarrinho(sabor) {
        carrinho = carrinho.filter(item => item.sabor !== sabor);
        atualizarCarrinho();
    }

    // Função para finalizar o pedido
    finalizarPedidoButton.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('O carrinho está vazio.');
            return;
        }

        const pedido = {
            nomeCliente: localStorage.getItem('nomeCliente'),
            itens: carrinho,
            total: carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0)
        };

        fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return response.json();
        })
        .then(data => {
            alert('Pedido realizado com sucesso!');
            localStorage.removeItem('carrinho');
            window.location.href = '../Pages/confirmacao.html'; // Redireciona para a página de confirmação
        })
        .catch(error => {
            console.error('Erro ao finalizar o pedido:', error);
        });
    });

    // Inicializa a página carregando os sabores
    carregarSabores();
    atualizarCarrinho();
});
