// scriptPrincipal.js

<<<<<<< HEAD
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
=======
// Função para inicializar a aplicação
function inicializarAplicacao() {
    document.getElementById('voltarBtnResumo').addEventListener('click', () => {
        document.getElementById('resumoPedido').style.display = 'none';
        document.getElementById('escolherAcesso').style.display = 'block';
    });

    document.getElementById('voltarBtnPainel').addEventListener('click', () => {
        document.getElementById('painelFuncionario').style.display = 'none';
        document.getElementById('escolherAcesso').style.display = 'block';
    });

    document.getElementById('voltarBtnPedido').addEventListener('click', () => {
        document.getElementById('pedidoCliente').style.display = 'none';
        document.getElementById('escolherAcesso').style.display = 'block';
    });

    carregarJson('data/sabores.json', exibirSabores);
}

// Inicialização da aplicação ao carregar a página
document.addEventListener('DOMContentLoaded', inicializarAplicacao);
>>>>>>> 485bdb3a45493f8cf1cab1d8a8e961f4c970fac5
