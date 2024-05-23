// scriptAcesso.js

// Função para exibir a tela de acesso do cliente
function exibirTelaCliente() {
    document.getElementById('escolherAcesso').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'block';
}

// Função para exibir a tela de acesso do funcionário
function exibirTelaFuncionario() {
    document.getElementById('escolherAcesso').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'block';
}

// Evento do botão para escolher o acesso como cliente
document.getElementById('escolherClienteBtn').addEventListener('click', exibirTelaCliente);

// Evento do botão para escolher o acesso como funcionário
document.getElementById('escolherFuncionarioBtn').addEventListener('click', exibirTelaFuncionario);

// Função para acessar como cliente
function acessarComoCliente() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    if (!nomeCliente) {
        alert('Por favor, digite seu nome.');
        return;
    }
    document.getElementById('clienteNome').textContent = `Bem-vindo, ${nomeCliente}`;
    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'block';
}

// Função para acessar como funcionário
function acessarComoFuncionario() {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const senhaUsuario = document.getElementById('senhaUsuario').value;
    if (nomeUsuario === 'admin' && senhaUsuario === 'admin') {
        document.getElementById('acessoFuncionario').style.display = 'none';
        document.getElementById('painelFuncionario').style.display = 'block';
        document.getElementById('gerenciarSaboresBtn').style.display = 'inline-block';
        document.getElementById('gerenciarUsuariosBtn').style.display = 'inline-block';
    } else {
        alert('Usuário ou senha inválidos.');
    }
}

// Evento do botão para acessar como cliente
document.getElementById('clienteBtn').addEventListener('click', acessarComoCliente);

// Evento do botão para acessar como funcionário
document.getElementById('funcionarioBtn').addEventListener('click', acessarComoFuncionario);
