// scriptAcesso.js

// Função para mostrar a tela de acesso do cliente
function mostrarAcessoCliente() {
    document.getElementById('paginaInicial').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'block';
    document.getElementById('clienteNome').value = ''; // Limpa o campo de nome do cliente
}

// Função para mostrar a tela de acesso do funcionário e limpar os campos
function mostrarAcessoFuncionario() {
    document.getElementById('paginaInicial').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'block';
    document.getElementById('usuarioNome').value = '';
    document.getElementById('usuarioSenha').value = '';
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
                document.getElementById('acessoFuncionario').style.display = 'none';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        })
        .catch(error => console.error('Erro ao acessar:', error));
}

// Função para acessar como cliente
function acessarCliente() {
    const nome = document.getElementById('clienteNome').value;
    if (nome.trim() === '') {
        alert('Por favor, insira seu nome.');
        return;
    }
    localStorage.setItem('clienteNome', nome);
    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'block';
}

// Função para voltar à tela inicial de acesso
function voltarInicio() {
    document.getElementById('paginaInicial').style.display = 'block';
    document.getElementById('acessoFuncionario').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'none';
    document.getElementById('painelAdmin').style.display = 'none';
    document.getElementById('painelUsuario').style.display = 'none';
}

// Função para revogar o acesso do usuário
function revogarAcesso() {
    localStorage.removeItem('usuarioLogado');
    voltarInicio();
}

// Função para revogar o acesso do cliente
function revogarAcessoCliente() {
    localStorage.removeItem('clienteNome');
    voltarInicio();
}
