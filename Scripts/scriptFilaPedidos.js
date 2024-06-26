// scriptFilaPedidos.js

document.addEventListener('DOMContentLoaded', () => {
    carregarFilaPedidos();
});

function carregarFilaPedidos() {
    if (typeof fetch === "function") {
        // Tenta carregar do servidor
        fetch('/api/pedidos')
            .then(response => response.json())
            .then(data => {
                const pedidosAbertos = data.pedidos.filter(pedido => pedido.status === 'aberto');
                exibirFilaPedidos(pedidosAbertos);
            })
            .catch(error => {
                console.error('Erro ao carregar pedidos do servidor:', error);
                carregarFilaPedidosLocal();
            });
    } else {
        // Carrega do localStorage
        carregarFilaPedidosLocal();
    }
}

function carregarFilaPedidosLocal() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedidosAbertos = pedidos.filter(pedido => pedido.status === 'aberto');
    exibirFilaPedidos(pedidosAbertos);
}

function exibirFilaPedidos(pedidos) {
    const filaPedidosContainer = document.querySelector('#filaPedidosContainer');
    filaPedidosContainer.innerHTML = '';

    pedidos.forEach(pedido => {
        const pedidoElement = document.createElement('div');
        pedidoElement.className = 'pedido-item';
        pedidoElement.innerHTML = `
            <p><strong>Data:</strong> ${new Date(pedido.id).toLocaleDateString()}</p>
            <p><strong>Cliente:</strong> ${pedido.nomeCliente}</p>
            <p><strong>Itens:</strong></p>
            <ul>
                ${pedido.itens.map(item => `<li>${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
            <button class="btn btn-atender-pedido">Atender</button>
        `;
        filaPedidosContainer.appendChild(pedidoElement);
        pedidoElement.querySelector('.btn-atender-pedido').addEventListener('click', () => {
            atenderPedido(pedido.id);
        });
    });
}

function atenderPedido(id) {
    if (typeof fetch === "function") {
        // Tenta atualizar no servidor
        fetch(`/api/pedidos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'fechado' })
        })
        .then(response => {
            if (response.ok) {
                carregarFilaPedidos();
            } else {
                console.error('Erro ao atualizar pedido no servidor:', response.statusText);
            }
        })
        .catch(error => console.error('Erro ao atualizar pedido no servidor:', error));
    } else {
        // Atualiza no localStorage
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        const pedidoIndex = pedidos.findIndex(pedido => pedido.id === id);
        if (pedidoIndex > -1) {
            pedidos[pedidoIndex].status = 'fechado';
            localStorage.setItem('pedidos', JSON.stringify(pedidos));
            carregarFilaPedidos();
        }
    }
}
