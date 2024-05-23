// scriptJson.js

// Função para inicializar os arquivos JSON se não existirem
function inicializarJson() {
    fetch('data/usuarios.json')
        .then(response => {
            if (response.status === 404) {
                return fetch('data/usuarios.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuarios: [{ nome: 'admin', senha: 'admin', admin: true }] })
                });
            }
        });

    fetch('data/sabores.json')
        .then(response => {
            if (response.status === 404) {
                const sabores = [
                    { nome: 'Carne', preco: 5.00 },
                    { nome: 'Frango', preco: 5.50 },
                    // Adicione mais 28 sabores aqui
                ];
                return fetch('data/sabores.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sabores })
                });
            }
        });

    fetch('data/pedidos.json')
        .then(response => {
            if (response.status === 404) {
                return fetch('data/pedidos.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ pedidos: [] })
                });
            }
        });

    fetch('data/avaliacoes.json')
        .then(response => {
            if (response.status === 404) {
                return fetch('data/avaliacoes.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ avaliacoes: [] })
                });
            }
        });
}

// Inicializar JSONs ao carregar o sistema
document.addEventListener('DOMContentLoaded', inicializarJson);