// scriptAcesso.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clienteBtn').addEventListener('click', acessarCliente);
    document.getElementById('funcionarioBtn').addEventListener('click', acessarFuncionario);
});

// Função para acessar como cliente
function acessarCliente() {
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    if (nomeCliente) {
        localStorage.setItem('nomeCliente', nomeCliente);
        document.getElementById('acessoCliente').style.display = 'none';
        document.getElementById('pedidoCliente').style.display = 'block';
        carregarSabores();
    } else {
        alert('Por favor, informe seu nome.');
    }
}

// Função para acessar como funcionário
function acessarFuncionario() {
    const nomeUsuario = document.getElementById('nomeUsuario').value.trim();
    const senhaUsuario = document.getElementById('senhaUsuario').value.trim();

    if (nomeUsuario && senhaUsuario) {
        fetch('data/usuarios.json')
            .then(response => response.json())
            .then(data => {
                const usuario = data.usuarios.find(user => user.nome === nomeUsuario && user.senha === senhaUsuario);
                if (usuario) {
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    document.getElementById('acessoFuncionario').style.display = 'none';
                    document.getElementById('painelFuncionario').style.display = 'block';
                    carregarPainel(usuario.admin);
                } else {
                    alert('Usuário ou senha incorretos.');
                }
            })
            .catch(error => console.error('Erro ao acessar como funcionário:', error));
    } else {
        alert('Por favor, informe seu nome de usuário e senha.');
    }
}

// Função para carregar o painel de controle
function carregarPainel(isAdmin) {
    if (isAdmin) {
        document.getElementById('gerenciarSaboresBtn').style.display = 'block';
        document.getElementById('gerenciarUsuariosBtn').style.display = 'block';
    } else {
        document.getElementById('gerenciarSaboresBtn').style.display = 'none';
        document.getElementById('gerenciarUsuariosBtn').style.display = 'none';
    }
    document.getElementById('visualizarPedidosBtn').style.display = 'block';
    document.getElementById('visualizarAvaliacoesBtn').style.display = 'block';
}

function voltarTelaPrincipal() {
    document.getElementById('acessoCliente').style.display = 'block';
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'none';
}
