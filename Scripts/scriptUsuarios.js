document.addEventListener('DOMContentLoaded', () => {
    const usuariosContainer = document.getElementById('usuariosContainer');
    const formContainer = document.getElementById('formContainer');
    const cadastroUsuarioForm = document.getElementById('cadastroUsuarioForm');
    const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
    const btnCancelar = document.getElementById('btnCancelar');
    let usuarios = [];
    let editIndex = null;

    // Função para carregar usuários do JSON
    function carregarUsuarios() {
        fetch('../Data/usuarios.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar usuários');
                }
                return response.json();
            })
            .then(data => {
                usuarios = data;
                exibirUsuarios();
            })
            .catch(error => console.error('Erro ao carregar usuários:', error));
    }

    // Função para exibir usuários na tela
    function exibirUsuarios() {
        usuariosContainer.innerHTML = ''; // Limpa o container
        usuarios.forEach((usuario, index) => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.className = 'usuario-item';
            usuarioDiv.innerHTML = `
                <div class="usuario-info">
                    <p><strong>Nome:</strong> ${usuario.nome}</p>
                    <p><strong>Usuário de Acesso:</strong> ${usuario.usuario}</p>
                    <p><strong>Administrador:</strong> ${usuario.admin ? 'Sim' : 'Não'}</p>
                </div>
                <div class="usuario-actions">
                    <button class="btn" onclick="editarUsuario(${index})">Editar</button>
                    <button class="btn" onclick="excluirUsuario(${index})">Excluir</button>
                </div>
            `;
            usuariosContainer.appendChild(usuarioDiv);
        });
    }

    // Função para adicionar ou editar usuário
    cadastroUsuarioForm.addEventListener('submit', event => {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;
        const admin = document.getElementById('admin').checked;

        const novoUsuario = { nome, usuario, senha, admin };

        if (editIndex !== null) {
            // Editar usuário existente
            usuarios[editIndex] = novoUsuario;
            editIndex = null;
        } else {
            // Adicionar novo usuário
            usuarios.push(novoUsuario);
        }

        salvarUsuarios();
        exibirUsuarios();
        formContainer.style.display = 'none';
        cadastroUsuarioForm.reset();
    });

    // Função para editar usuário
    window.editarUsuario = function(index) {
        const usuario = usuarios[index];
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('usuario').value = usuario.usuario;
        document.getElementById('senha').value = usuario.senha;
        document.getElementById('admin').checked = usuario.admin;
        formContainer.style.display = 'block';
        editIndex = index;
    };

    // Função para excluir usuário
    window.excluirUsuario = function(index) {
        usuarios.splice(index, 1);
        salvarUsuarios();
        exibirUsuarios();
    };

    // Função para salvar usuários no JSON
    function salvarUsuarios() {
        fetch('../Data/usuarios.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarios),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar usuários');
            }
        })
        .catch(error => console.error('Erro ao salvar usuários:', error));
    }

    // Exibir formulário para adicionar novo usuário
    btnAdicionarUsuario.addEventListener('click', () => {
        formContainer.style.display = 'block';
        cadastroUsuarioForm.reset();
        editIndex = null;
    });

    // Cancelar adição ou edição de usuário
    btnCancelar.addEventListener('click', () => {
        formContainer.style.display = 'none';
        cadastroUsuarioForm.reset();
        editIndex = null;
    });

    // Carregar usuários ao carregar a página
    carregarUsuarios();
});
