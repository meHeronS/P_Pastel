document.addEventListener('DOMContentLoaded', () => {
    const historicoPedidosContainer = document.getElementById('historicoPedidosContainer');
    const totalPedidosFechados = document.getElementById('totalPedidosFechados');
    let pedidosFechados = [];

    // Função para carregar pedidos do JSON
    function carregarPedidos() {
        fetch('../Data/historicoPedidos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar pedidos');
                }
                return response.json();
            })
            .then(data => {
                // Filtra apenas os pedidos com status "fechado"
                pedidosFechados = data.filter(pedido => pedido.status === 'fechado');
                exibirPedidosFechados();
                calcularTotalPedidosFechados();
            })
            .catch(error => console.error('Erro ao carregar pedidos:', error));
    }

    // Função para exibir pedidos fechados na tela
    function exibirPedidosFechados() {
        historicoPedidosContainer.innerHTML = ''; // Limpa o container
        pedidosFechados.forEach(pedido => {
            const pedidoDiv = document.createElement('div');
            pedidoDiv.className = 'pedido-item';
            pedidoDiv.innerHTML = `
                <p><strong>Número do Pedido:</strong> ${pedido.numeroPedido}</p>
                <p><strong>Cliente:</strong> ${pedido.nomeCliente}</p>
                <p><strong>Itens:</strong></p>
                <ul>
                    ${pedido.itens.map(item => `<li>${item.quantidade} x ${item.sabor} - R$ ${(item.preco * item.quantidade).toFixed(2)}</li>`).join('')}
                </ul>
                <p><strong>Valor Total:</strong> R$ ${pedido.valorTotal.toFixed(2)}</p>
            `;
            historicoPedidosContainer.appendChild(pedidoDiv);
        });
    }

    // Função para calcular o total dos pedidos fechados
    function calcularTotalPedidosFechados() {
        const total = pedidosFechados.reduce((acc, pedido) => acc + pedido.valorTotal, 0);
        totalPedidosFechados.innerHTML = `<p><strong>Total dos Pedidos Fechados:</strong> R$ ${total.toFixed(2)}</p>`;
    }

    // Carregar pedidos ao carregar a página
    carregarPedidos();
});
