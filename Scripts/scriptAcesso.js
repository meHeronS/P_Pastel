// scriptAcesso.js

// Função para mostrar a tela de acesso do cliente
function mostrarAcessoCliente() {
    document.getElementById('telaPrincipal').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'block';
}

// Função para mostrar a tela de acesso do usuário
function mostrarAcessoUsuario() {
    document.getElementById('telaPrincipal').style.display = 'none';
    document.getElementById('acessoUsuario').style.display = 'block';
}

// Função para validar o acesso de usuários
function acessarUsuario() {
    const nome = document.getElementById('usuarioNome').value;
    const senha = document.getElementById('usuarioSenha').value;
    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            const usuario = data.usuarios.find(u => u.nome === nome && u.senha === senha);
            if (usuario) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                if (usuario.admin) {
                    document.getElementById('painelAdmin').style.display = 'block';
                } else {
                    document.getElementById('painelUsuario').style.display = 'block';
                }
                document.getElementById('acessoUsuario').style.display = 'none';
                document.getElementById('acessoCliente').style.display = 'none';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        })
        .catch(error => console.error('Erro ao acessar:', error));
}

// Função para acessar como cliente
function acessarCliente() {
    const nomeCliente = document.getElementById('clienteNome').value.trim();
    if (nomeCliente === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    localStorage.setItem('nomeCliente', nomeCliente);
    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'block';
}

// Função para voltar à tela principal
function voltarTelaPrincipal() {
    document.getElementById('telaPrincipal').style.display = 'block';
    document.getElementById('acessoUsuario').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('painelAdmin').style.display = 'none';
    document.getElementById('painelUsuario').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'none';
}
