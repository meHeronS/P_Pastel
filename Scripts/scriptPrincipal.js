// scriptPrincipal.js

// Função para carregar os sabores no painel do cliente
function carregarSabores() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const saboresDiv = document.getElementById('sabores');
            saboresDiv.innerHTML = '';
            data.sabores.forEach(sabor => {
                const saborDiv = document.createElement('div');
                saborDiv.classList.add('sabor-item');
                saborDiv.innerHTML = `
                    <p>${sabor.nome} - R$${sabor.preco.toFixed(2)}</p>
                    <input type="number" id="quantidade-${sabor.id}" class="input" min="1" value="1">
                    <button class="btn" onclick="adicionarAoCarrinho(${sabor.id})">Adicionar</button>
                `;
                saboresDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar os sabores:', error));
}

// Função para inicializar o sistema ao carregar a página
function inicializarSistema() {
    inicializarDados();
    carregarSabores();
}

// Chama a função para inicializar o sistema ao carregar a página
document.addEventListener('DOMContentLoaded', inicializarSistema);
