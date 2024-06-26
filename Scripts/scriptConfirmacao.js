document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const numeroPedidoDiv = document.getElementById('numeroPedido');
    const nomeClienteDiv = document.getElementById('nomeCliente');
    const itensPedidoDiv = document.getElementById('itensPedido');
    const totalPedidoDiv = document.getElementById('totalPedido');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnSalvarAvaliacao = document.getElementById('btnSalvarAvaliacao');
    const notaInput = document.getElementById('nota');
    const avaliacaoTextarea = document.getElementById('avaliacao');

    // Variáveis do pedido e carrinho
    let numeroPedido = localStorage.getItem('numeroPedido') || 1;
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const nomeCliente = localStorage.getItem('nomeCliente') || 'Cliente Anônimo';

    // Função para exibir os detalhes do pedido
    function exibirPedido() {
        numeroPedidoDiv.innerHTML = `<strong>Número do Pedido:</strong> ${numeroPedido}`;
        nomeClienteDiv.innerHTML = `<strong>Nome do Cliente:</strong> ${nomeCliente}`;

        let total = 0;
        carrinho.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'carrinho-item';
            itemDiv.innerHTML = `
                <span>${item.quantidade}x ${item.sabor} - R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
            `;
            itensPedidoDiv.appendChild(itemDiv);
            total += item.preco * item.quantidade;
        });

        totalPedidoDiv.innerHTML = `<strong>Total do Pedido: R$ ${total.toFixed(2)}</strong>`;
    }

    // Função para salvar a avaliação no JSON
    function salvarAvaliacao() {
        const nota = parseInt(notaInput.value);
        const avaliacao = avaliacaoTextarea.value.trim();
        const data = new Date().toISOString();

        if (nota >= 1 && nota <= 5 && avaliacao.length <= 100) {
            const avaliacaoObj = {
                data,
                nome: nomeCliente,
                nota,
                avaliacao
            };

            fetch('/api/avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(avaliacaoObj)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar a avaliação');
                }
                return response.json();
            })
            .then(() => {
                alert('Avaliação salva com sucesso!'); // Alerta ao salvar avaliação
                notaInput.value = '';
                avaliacaoTextarea.value = '';
            })
            .catch(error => console.error('Erro ao salvar a avaliação:', error));
        } else {
            alert('Por favor, insira uma nota válida e uma avaliação com até 100 caracteres.');
        }
    }

    // Evento de clique para confirmar o pedido
    btnConfirmar.addEventListener('click', () => {
        localStorage.setItem('numeroPedido', parseInt(numeroPedido) + 1);
        alert('Pedido confirmado com sucesso!');
        window.location.href = '../index.html'; // Redirecionar para a página inicial
    });

    // Evento de clique para cancelar o pedido
    btnCancelar.addEventListener('click', () => {
        const confirmarCancelamento = confirm('Você realmente deseja cancelar o pedido?'); // Confirmação de cancelamento
        if (confirmarCancelamento) {
            alert('Pedido cancelado.');
            window.location.href = '../index.html'; // Redirecionar para a página inicial
        }
    });

    // Evento de clique para salvar a avaliação
    btnSalvarAvaliacao.addEventListener('click', salvarAvaliacao);

    // Exibir os detalhes do pedido na página de confirmação
    exibirPedido();
});