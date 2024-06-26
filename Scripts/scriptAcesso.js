// scriptAcesso.js

// Adiciona um listener ao botão de avançar para verificar se o nome do cliente foi preenchido
document.getElementById('btnAvancar').addEventListener('click', () => {
    const nomeCliente = document.getElementById('nomeCliente').value.trim(); // Obtém e remove espaços extras do nome do cliente
    if (nomeCliente) { // Verifica se o nome do cliente não está vazio
        localStorage.setItem('nomeCliente', nomeCliente); // Armazena o nome do cliente no localStorage
        window.location.href = 'Pedidos.html'; // Redireciona para a página de pedidos
    } else {
        alert('Por favor, insira seu nome.'); // Alerta caso o nome do cliente não tenha sido preenchido
    }
});

// Adiciona um listener ao botão de voltar para retornar à página inicial
document.getElementById('btnVoltar').addEventListener('click', () => {
    window.location.href = '../index.html'; // Redireciona para a página principal
});
