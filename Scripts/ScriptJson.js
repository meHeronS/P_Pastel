// scriptJson.js

// Função que é executada quando o documento HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se os dados dos usuários já foram carregados no localStorage
    if (!localStorage.getItem('usuarios')) {
        fetch('/Data/usuarios.json') // Faz uma requisição para obter o arquivo JSON dos usuários
            .then(response => response.json()) // Converte a resposta para JSON
            .then(usuarios => {
                localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Armazena os dados dos usuários no localStorage
            });
    }

    // Verifica se os dados dos sabores já foram carregados no localStorage
    if (!localStorage.getItem('sabores')) {
        fetch('/Data/sabores.json') // Faz uma requisição para obter o arquivo JSON dos sabores
            .then(response => response.json()) // Converte a resposta para JSON
            .then(sabores => {
                localStorage.setItem('sabores', JSON.stringify(sabores)); // Armazena os dados dos sabores no localStorage
            });
    }

    // Verifica se os dados dos pedidos já foram carregados no localStorage
    if (!localStorage.getItem('pedidos')) {
        fetch('/Data/pedidos.json') // Faz uma requisição para obter o arquivo JSON dos pedidos
            .then(response => response.json()) // Converte a resposta para JSON
            .then(pedidos => {
                localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Armazena os dados dos pedidos no localStorage
            });
    }
});
