// scriptPrincipal.js

// Função que inicializa o sistema e carrega todos os dados necessários
function inicializarSistema() {
    carregarDadosAvaliacoes();
    carregarDadosPedidos();
    carregarDadosUsuarios();

    inicializarPaginaPedidos();
    inicializarPaginaAvaliacoes();
    inicializarPaginaHistoricoPedidos();
    inicializarPaginaUsuarios();

    // Adicionar mais inicializações conforme necessário
}

// Função que é executada quando o documento HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', inicializarSistema);

// Função para carregar dados de avaliações
function carregarDadosAvaliacoes() {
    fetch('../Data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            // Armazenar dados no localStorage
            localStorage.setItem('avaliacoes', JSON.stringify(data));
            // Processa e exibe as avaliações
            const avaliacoesContainer = document.querySelector('#avaliacoesContainer');
            if (avaliacoesContainer) {
                avaliacoesContainer.innerHTML = '';
                data.forEach(avaliacao => {
                    const avaliacaoElement = document.createElement('div');
                    avaliacaoElement.className = 'avaliacao-item';
                    avaliacaoElement.innerHTML = `
                        <p><strong>Nome:</strong> ${avaliacao.nomeCliente}</p>
                        <p><strong>Nota:</strong> ${avaliacao.nota}</p>
                        <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
                        <button class="btn btn-excluir-avaliacao">Excluir</button>
                    `;
                    avaliacoesContainer.appendChild(avaliacaoElement);
                    avaliacaoElement.querySelector('.btn-excluir-avaliacao').addEventListener('click', () => {
                        excluirAvaliacao(avaliacao.nomeCliente);
                    });
                });
            }
        });
}

// Função para carregar dados de pedidos
function carregarDadosPedidos() {
    fetch('../Data/historicoPedidos.json')
        .then(response => response.json())
        .then(data => {
            // Armazenar dados no localStorage
            localStorage.setItem('pedidos', JSON.stringify(data));
            // Processa e exibe os pedidos fechados
            const historicoPedidosContainer = document.querySelector('#historicoPedidosContainer');
            if (historicoPedidosContainer) {
                historicoPedidosContainer.innerHTML = '';
                let totalFechados = 0;
                data.filter(pedido => pedido.status === 'fechado').forEach(pedido => {
                    const pedidoElement = document.createElement('div');
                    pedidoElement.className = 'pedido-item';
                    pedidoElement.innerHTML = `
                        <p><strong>Data:</strong> ${new Date(pedido.id).toLocaleDateString()}</p>
                        <p><strong>Cliente:</strong> ${pedido.nomeCliente}</p>
                        <p><strong>Valor Total:</strong> R$ ${pedido.valorTotal.toFixed(2)}</p>
                    `;
                    historicoPedidosContainer.appendChild(pedidoElement);
                    totalFechados += pedido.valorTotal;
                });
                const totalElement = document.createElement('div');
                totalElement.className = 'carrinho-total';
                totalElement.innerHTML = `<p><strong>Total Fechado:</strong> R$ ${totalFechados.toFixed(2)}</p>`;
                historicoPedidosContainer.appendChild(totalElement);
            }
        });
}

// Função para carregar dados de usuários
function carregarDadosUsuarios() {
    fetch('../Data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            // Armazenar dados no localStorage
            localStorage.setItem('usuarios', JSON.stringify(data));
            // Processa e exibe os usuários
            const usuariosContainer = document.querySelector('#usuariosContainer');
            if (usuariosContainer) {
                usuariosContainer.innerHTML = '';
                data.forEach(usuario => {
                    const usuarioElement = document.createElement('div');
                    usuarioElement.className = 'usuario-item';
                    usuarioElement.innerHTML = `
                        <p><strong>Nome:</strong> ${usuario.nome}</p>
                        <p><strong>Usuário:</strong> ${usuario.usuario}</p>
                        <p><strong>Administrador:</strong> ${usuario.admin ? 'Sim' : 'Não'}</p>
                        <button class="btn btn-editar-usuario">Editar</button>
                        <button class="btn btn-excluir-usuario">Excluir</button>
                    `;
                    usuariosContainer.appendChild(usuarioElement);
                    usuarioElement.querySelector('.btn-excluir-usuario').addEventListener('click', () => {
                        excluirUsuario(usuario.usuario);
                    });
                    usuarioElement.querySelector('.btn-editar-usuario').addEventListener('click', () => {
                        editarUsuario(usuario.usuario);
                    });
                });
            }
        });
}

// Função para inicializar a página de pedidos
function inicializarPaginaPedidos() {
    const nomeClienteInput = document.querySelector('#nomeCliente');
    const iniciarPedidoBtn = document.querySelector('#iniciarPedidoBtn');

    if (iniciarPedidoBtn) {
        iniciarPedidoBtn.addEventListener('click', () => {
            if (nomeClienteInput.value.trim() === '') {
                alert('Por favor, informe seu nome.');
            } else {
                localStorage.setItem('nomeCliente', nomeClienteInput.value.trim());
                window.location.href = 'Pedidos.html';
            }
        });
    }

    const btnFinalizarPedido = document.querySelector('#btnFinalizarPedido');
    if (btnFinalizarPedido) {
        btnFinalizarPedido.addEventListener('click', finalizarPedido);
    }

    function finalizarPedido() {
        const nomeCliente = localStorage.getItem('nomeCliente');
        const carrinho = JSON.parse(localStorage.getItem('carrinho'));

        const pedido = {
            id: Date.now(),
            nomeCliente: nomeCliente,
            itens: carrinho,
            total: carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0),
            status: 'fechado'
        };

        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        alert('Pedido realizado com sucesso!');
        localStorage.removeItem('carrinho');
        window.location.href = 'cliente.html';
    }
}

// Função para inicializar a página de avaliações
function inicializarPaginaAvaliacoes() {
    // Carregar as avaliações já está sendo feito em carregarDadosAvaliacoes()
}

// Função para inicializar a página de histórico de pedidos
function inicializarPaginaHistoricoPedidos() {
    // Carregar os pedidos já está sendo feito em carregarDadosPedidos()
}

// Função para inicializar a página de usuários
function inicializarPaginaUsuarios() {
    // Carregar os usuários já está sendo feito em carregarDadosUsuarios()
}

// Função para excluir uma avaliação
function excluirAvaliacao(nomeCliente) {
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    avaliacoes = avaliacoes.filter(avaliacao => avaliacao.nomeCliente !== nomeCliente);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
    carregarDadosAvaliacoes();
}

// Função para excluir um usuário
function excluirUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(user => user.usuario !== usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarDadosUsuarios();
}

// Função para editar um usuário
function editarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let user = usuarios.find(user => user.usuario === usuario);
    if (user) {
        // Exibe os dados do usuário em um formulário para edição
        const nomeInput = document.querySelector('#nome');
        const usuarioInput = document.querySelector('#usuario');
        const senhaInput = document.querySelector('#senha');
        const adminInput = document.querySelector('#admin');

        nomeInput.value = user.nome;
        usuarioInput.value = user.usuario;
        senhaInput.value = ''; // Senha não é exibida
        adminInput.checked = user.admin;

        document.querySelector('#btnSalvar').addEventListener('click', () => {
            user.nome = nomeInput.value;
            user.usuario = usuarioInput.value;
            user.senha = senhaInput.value; // Atualiza a senha
            user.admin = adminInput.checked;

            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            carregarDadosUsuarios();
        });

        document.querySelector('#btnCancelar').addEventListener('click', () => {
            // Limpa o formulário de edição
            nomeInput.value = '';
            usuarioInput.value = '';
            senhaInput.value = '';
            adminInput.checked = false;
        });
    }
}
