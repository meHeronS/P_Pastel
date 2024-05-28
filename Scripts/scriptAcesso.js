// scriptAcesso.js

// Função para mostrar a tela de acesso do cliente
function mostrarAcessoCliente() {
    document.getElementById('paginaInicial').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'block';
}

// Função para mostrar a tela de acesso do funcionário
function mostrarAcessoFuncionario() {
    document.getElementById('paginaInicial').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'block';
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
                window.location.href = 'painelFuncionario.html'; // Redireciona para a nova página do painel do funcionário
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

// Função para voltar à tela inicial de acesso e realizar logoff
function voltarInicio() {
    // Limpa os dados do localStorage
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('clienteNome');
    localStorage.removeItem('carrinho');

    // Redireciona para a página inicial
    window.location.href = 'index.html';
}
