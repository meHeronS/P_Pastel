// scriptPrincipal.js

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar eventos de clique
    document.getElementById('voltarBtn').addEventListener('click', voltarTelaPrincipal);
    document.getElementById('finalizarBtn').addEventListener('click', finalizarPedido);
    document.getElementById('clienteBtn').addEventListener('click', acessarCliente);
    document.getElementById('funcionarioBtn').addEventListener('click', acessarFuncionario);
});

// Função para voltar à tela principal
function voltarTelaPrincipal() {
    document.getElementById('acessoCliente').style.display = 'block';
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'none';
}
