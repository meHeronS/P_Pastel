// scriptAcessoFuncionario.js

// Adiciona um listener ao botão de login para verificar as credenciais do funcionário
document.getElementById('btnLogin').addEventListener('click', () => {
    const usuario = document.getElementById('usuario').value.trim(); // Obtém e remove espaços extras do nome de usuário
    const senha = document.getElementById('senha').value.trim(); // Obtém e remove espaços extras da senha

    // Verifica se as credenciais são válidas (exemplo básico, em um sistema real deve-se verificar no servidor)
    if (usuario === 'admin' && senha === 'admin') {
        window.location.href = 'gestaoSistema.html'; // Redireciona para a página de gestão do sistema
    } else {
        alert('Usuário ou senha incorretos.'); // Alerta caso as credenciais estejam incorretas
    }
});

// Adiciona um listener ao botão de voltar para retornar à página inicial
document.getElementById('btnVoltar').addEventListener('click', () => {
    window.location.href = '../index.html'; // Redireciona para a página principal
});
