// scriptJson.js

// Função para inicializar os dados do JSON
function inicializarDados() {
    // Inicializa os dados dos usuários
    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            if (!data.usuarios) {
                data.usuarios = [];
                return fetch('data/usuarios.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        });

    // Inicializa os dados dos pedidos
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            if (!data.pedidos) {
                data.pedidos = [];
                return fetch('data/pedidos.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        });

    // Inicializa os dados das avaliações
    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            if (!data.avaliacoes) {
                data.avaliacoes = [];
                return fetch('data/avaliacoes.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        });

    // Inicializa os dados dos sabores
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            if (!data.sabores) {
                data.sabores = [];
                return fetch('data/sabores.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        });
}

// Chama a função para inicializar os dados ao carregar o script
inicializarDados();
