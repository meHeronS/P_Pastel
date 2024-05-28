// scriptPrincipal.js

// Função principal para carregar dados iniciais e configurar a interface
document.addEventListener('DOMContentLoaded', () => {
    carregarSabores();
    atualizarCarrinho();
});

// Função para carregar os sabores disponíveis do JSON e exibir na tela
function carregarSabores() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const saboresDiv = document.getElementById('sabores');
            saboresDiv.innerHTML = '';
            data.sabores.forEach(sabor => {
                const saborDiv = document.createElement('div');
                saborDiv.className = 'sabor-item';
                saborDiv.textContent = `${sabor.nome} - R$${sabor.preco.toFixed(2)}`;
                const adicionarBtn = document.createElement('button');
                adicionarBtn.className = 'btn';
                adicionarBtn.textContent = 'Adicionar';
                adicionarBtn.onclick = () => adicionarAoCarrinho(sabor.nome, sabor.preco);
                saborDiv.appendChild(adicionarBtn);
                saboresDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar sabores:', error));
}

// Funções adicionais podem ser adicionadas aqui conforme necessário
