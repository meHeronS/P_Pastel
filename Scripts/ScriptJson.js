// scriptJson.js

// Função para carregar JSON
function carregarJson(arquivo, callback) {
    fetch(arquivo)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Erro ao carregar JSON:', error));
}

// Função para salvar JSON
function salvarJson(arquivo, dados) {
    fetch(arquivo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => console.log('Sucesso ao salvar JSON:', data))
    .catch(error => console.error('Erro ao salvar JSON:', error));
}
