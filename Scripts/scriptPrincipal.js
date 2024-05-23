// scriptPrincipal.js

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
