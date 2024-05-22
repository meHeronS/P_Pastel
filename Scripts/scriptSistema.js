// Inicializa os dados dos arquivos JSON quando o sistema é carregado
window.onload = function() {
    inicializarDados();
}

// Função para inicializar dados JSON
function inicializarDados() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            if (!data.sabores) {
                data.sabores = [];
                salvarDados('sabores', data);
            }
        });

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            if (!data.usuarios) {
                data.usuarios = [{ nome: 'admin', senha: 'admin', admin: true }];
                salvarDados('usuarios', data);
            }
        });

    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            if (!data.pedidos) {
                data.pedidos = [];
                salvarDados('pedidos', data);
            }
        });

    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            if (!data.avaliacoes) {
                data.avaliacoes = [];
                salvarDados('avaliacoes', data);
            }
        });
}

// Função para salvar dados no arquivo JSON
function salvarDados(tipo, dados) {
    fetch(`data/${tipo}.json`, {
        method: 'PUT',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(error => console.error(`Erro ao salvar dados de ${tipo}:`, error));
}

// Função para voltar à tela inicial
function voltarAcesso() {
    document.getElementById('painelUsuario').style.display = 'none';
    document.getElementById('acesso').style.display = 'block';
    document.getElementById('gerenciarSabores').style.display = 'none';
    document.getElementById('gerenciarUsuarios').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'none';
}

// Função para autenticar o usuário
function autenticarUsuario() {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const senhaUsuario = document.getElementById('senhaUsuario').value;

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            const usuario = data.usuarios.find(u => u.nome === nomeUsuario && u.senha === senhaUsuario);
            if (usuario) {
                acessarPainelUsuario(usuario.admin);
            } else {
                alert('Usuário ou senha incorretos!');
            }
        })
        .catch(error => console.error('Erro ao autenticar usuário:', error));
}

// Função para acessar o painel do usuário (admin ou não)
function acessarPainelUsuario(admin) {
    document.getElementById('acesso').style.display = 'none';
    document.getElementById('painelUsuario').style.display = 'block';

    const btnGerenciarSabores = document.getElementById('btnGerenciarSabores');
    const btnGerenciarUsuarios = document.getElementById('btnGerenciarUsuarios');

    if (admin) {
        btnGerenciarSabores.style.display = 'inline';
        btnGerenciarUsuarios.style.display = 'inline';
    } else {
        btnGerenciarSabores.style.display = 'none';
        btnGerenciarUsuarios.style.display = 'none';
    }
}

// Função para visualizar a fila de pedidos
function verFilaPedidos() {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            const listaPedidosDiv = document.getElementById('listaPedidos');
            listaPedidosDiv.innerHTML = '';
            data.pedidos.forEach(pedido => {
                if (!pedido.finalizado) {
                    const pedidoDiv = document.createElement('div');
                    pedidoDiv.className = 'pedido-item';
                    pedidoDiv.innerHTML = `
                        <p>Cliente: ${pedido.cliente}</p>
                        <p>Número do Pedido: ${pedido.numeroPedido}</p>
                        <p>Produtos: ${pedido.produtos.map(prod => `${prod.nome} (x${prod.quantidade})`).join(', ')}</p>
                        <p>Valor: R$${pedido.valor.toFixed(2)}</p>
                        <label for="pedidoPago${pedido.numeroPedido}">Pago:</label>
                        <input type="checkbox" id="pedidoPago${pedido.numeroPedido}">
                        <label for="pedidoEntregue${pedido.numeroPedido}">Entregue:</label>
                        <input type="checkbox" id="pedidoEntregue${pedido.numeroPedido}">
                        <button onclick="finalizarPedidoUsuario(${pedido.numeroPedido})">Finalizar</button>
                    `;
                    listaPedidosDiv.appendChild(pedidoDiv);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar fila de pedidos:', error));

    document.getElementById('painelUsuario').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'block';
}

// Função para finalizar um pedido
function finalizarPedidoUsuario(numeroPedido) {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            const pedido = data.pedidos.find(p => p.numeroPedido === numeroPedido);
            if (pedido) {
                const pago = document.getElementById(`pedidoPago${numeroPedido}`).checked;
                const entregue = document.getElementById(`pedidoEntregue${numeroPedido}`).checked;
                pedido.pagamento = pago ? 'Pago' : 'Pendente';
                pedido.entrega = entregue ? 'Entregue' : 'Pendente';
                pedido.finalizado = pago && entregue;

                return fetch('data/pedidos.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        })
        .then(() => verFilaPedidos())
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

// Função para visualizar avaliações dos clientes
function verAvaliacoes() {
    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            const listaAvaliacoesDiv = document.getElementById('listaAvaliacoes');
            listaAvaliacoesDiv.innerHTML = '';
            data.avaliacoes.forEach(avaliacao => {
                const avaliacaoDiv = document.createElement('div');
                avaliacaoDiv.className = 'avaliacao-item';
                avaliacaoDiv.innerHTML = `
                    <p>Cliente: ${avaliacao.cliente}</p>
                    <p>Nota: ${avaliacao.nota}</p>
                    <p>Comentário: ${avaliacao.comentario || 'Nenhum comentário'}</p>
                `;
                listaAvaliacoesDiv.appendChild(avaliacaoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar avaliações:', error));

    document.getElementById('painelUsuario').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'block';
}

// Função para gerenciar sabores (somente admin)
function gerenciarSabores() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const listaSaboresDiv = document.getElementById('listaSabores');
            listaSaboresDiv.innerHTML = '';
            data.sabores.forEach((sabor, index) => {
                const saborDiv = document.createElement('div');
                saborDiv.className = 'sabor-item';
                saborDiv.innerHTML = `
                    <p>${sabor.nome} - R$${sabor.preco.toFixed(2)}</p>
                    <button onclick="editarSabor(${index})">Editar</button>
                    <button onclick="removerSabor(${index})">Remover</button>
                `;
                listaSaboresDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar sabores:', error));

    document.getElementById('painelUsuario').style.display = 'none';
    document.getElementById('gerenciarSabores').style.display = 'block';
}

// Função para editar um sabor existente
function editarSabor(index) {
    const novoNome = prompt('Novo nome do sabor:');
    const novoPreco = parseFloat(prompt('Novo preço do sabor:'));
    if (novoNome && novoPreco) {
        fetch('data/sabores.json')
            .then(response => response.json())
            .then(data => {
                data.sabores[index] = { nome: novoNome, preco: novoPreco };
                return fetch('data/sabores.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => gerenciarSabores())
            .catch(error => console.error('Erro ao editar sabor:', error));
    }
}

// Função para remover um sabor existente
function removerSabor(index) {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            data.sabores.splice(index, 1);
            return fetch('data/sabores.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => gerenciarSabores())
        .catch(error => console.error('Erro ao remover sabor:', error));
}

// Função para adicionar um novo sabor
function adicionarSabor() {
    const nome = document.getElementById('novoSaborNome').value;
    const preco = parseFloat(document.getElementById('novoSaborPreco').value);
    if (nome && preco) {
        fetch('data/sabores.json')
            .then(response => response.json())
            .then(data => {
                data.sabores.push({ nome, preco });
                return fetch('data/sabores.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => {
                document.getElementById('novoSaborNome').value = '';
                document.getElementById('novoSaborPreco').value = '';
                gerenciarSabores();
            })
            .catch(error => console.error('Erro ao adicionar sabor:', error));
    }
}

// Função para gerenciar usuários (somente admin)
function gerenciarUsuarios() {
    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            const listaUsuariosDiv = document.getElementById('listaUsuarios');
            listaUsuariosDiv.innerHTML = '';
            data.usuarios.forEach((usuario, index) => {
                const usuarioDiv = document.createElement('div');
                usuarioDiv.className = 'usuario-item';
                usuarioDiv.innerHTML = `
                    <p>${usuario.nome} - ${usuario.admin ? 'Admin' : 'Usuário'}</p>
                    <button onclick="editarUsuario(${index})">Editar</button>
                    ${usuario.nome !== 'admin' ? `<button onclick="removerUsuario(${index})">Remover</button>` : ''}
                `;
                listaUsuariosDiv.appendChild(usuarioDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar usuários:', error));

    document.getElementById('painelUsuario').style.display = 'none';
    document.getElementById('gerenciarUsuarios').style.display = 'block';
}

// Função para editar um usuário existente
function editarUsuario(index) {
    const novoNome = prompt('Novo nome do usuário:');
    const novaSenha = prompt('Nova senha do usuário:');
    const novoAdmin = confirm('O usuário é administrador?');
    if (novoNome && novaSenha) {
        fetch('data/usuarios.json')
            .then(response => response.json())
            .then(data => {
                data.usuarios[index] = { nome: novoNome, senha: novaSenha, admin: novoAdmin };
                return fetch('data/usuarios.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => gerenciarUsuarios())
            .catch(error => console.error('Erro ao editar usuário:', error));
    }
}

// Função para remover um usuário existente
function removerUsuario(index) {
    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            data.usuarios.splice(index, 1);
            return fetch('data/usuarios.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => gerenciarUsuarios())
        .catch(error => console.error('Erro ao remover usuário:', error));
}

// Função para adicionar um novo usuário
function adicionarUsuario() {
    const nome = document.getElementById('novoUsuarioNome').value;
    const senha = document.getElementById('novoUsuarioSenha').value;
    const admin = document.getElementById('novoUsuarioAdmin').checked;
    if (nome && senha) {
        fetch('data/usuarios.json')
            .then(response => response.json())
            .then(data => {
                data.usuarios.push({ nome, senha, admin });
                return fetch('data/usuarios.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => {
                document.getElementById('novoUsuarioNome').value = '';
                document.getElementById('novoUsuarioSenha').value = '';
                document.getElementById('novoUsuarioAdmin').checked = false;
                gerenciarUsuarios();
            })
            .catch(error => console.error('Erro ao adicionar usuário:', error));
    }
}

// Função para adicionar um item ao carrinho de compras do cliente
function adicionarAoCarrinho(nome, preco) {
    const quantidade = parseInt(prompt('Quantidade:'));
    if (quantidade > 0) {
        const item = { nome, preco, quantidade };
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(item);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }
}

// Função para atualizar a exibição do carrinho de compras
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.innerHTML = `
            <p>${item.nome} - ${item.quantidade} x R$${item.preco.toFixed(2)} = R$${(item.preco * item.quantidade).toFixed(2)}</p>
        `;
        carrinhoDiv.appendChild(itemDiv);
    });
    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrinho-total';
    totalDiv.innerHTML = `
        <p>Total: R$${total.toFixed(2)}</p>
        <button onclick="finalizarPedido()">Finalizar Pedido</button>
        <button onclick="voltarAcesso()">Voltar</button>
    `;
    carrinhoDiv.appendChild(totalDiv);
}

// Função para finalizar o pedido
function finalizarPedido() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }
    const cliente = prompt('Nome do Cliente:');
    const numeroPedido = Date.now();
    const valor = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    const pedido = {
        data: new Date().toLocaleDateString(),
        cliente,
        numeroPedido,
        produtos: carrinho,
        formaPagamento: 'Pendente',
        valor,
        finalizado: false
    };
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            data.pedidos.push(pedido);
            return fetch('data/pedidos.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            localStorage.removeItem('carrinho');
            mostrarResumoPedido(numeroPedido, valor);
        })
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

// Função para mostrar o resumo do pedido após a finalização
function mostrarResumoPedido(numeroPedido, valor) {
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'block';
    document.getElementById('resumoPedidoNumero').textContent = `Número do Pedido: ${numeroPedido}`;
    document.getElementById('resumoPedidoValor').textContent = `Valor Total: R$${valor.toFixed(2)}`;
}

// Função para avaliar o pedido
function avaliarPedido() {
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'block';
}

// Função para salvar a avaliação do pedido
function salvarAvaliacao() {
    const nota = document.querySelector('input[name="notaAvaliacao"]:checked').value;
    const comentario = document.getElementById('comentarioAvaliacao').value;
    const cliente = document.getElementById('nomeCliente').value;

    const avaliacao = { cliente, nota: parseInt(nota), comentario };

    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(data => {
            data.avaliacoes.push(avaliacao);
            return fetch('data/avaliacoes.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            alert('Avaliação salva com sucesso!');
            setTimeout(() => {
                voltarAcesso();
            }, 2000);
        })
        .catch(error => console.error('Erro ao salvar avaliação:', error));
}

// Função para confirmar se o cliente deseja deixar uma avaliação
function confirmarAvaliacao(desejaAvaliar) {
    if (desejaAvaliar) {
        avaliarPedido();
    } else {
        alert('Obrigado pelo pedido!');
        setTimeout(() => {
            voltarAcesso();
        }, 2000);
    }
}
// Função para acessar o sistema como usuário
function acessoUsuario() {
    const nome = document.getElementById('usuarioNome').value;
    const senha = document.getElementById('usuarioSenha').value;

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            const usuario = data.usuarios.find(user => user.nome === nome && user.senha === senha);
            if (usuario) {
                localStorage.setItem('usuario', JSON.stringify(usuario));
                if (usuario.admin) {
                    mostrarPainelAdmin();
                } else {
                    mostrarFilaPedidos();
                }
            } else {
                alert('Nome de usuário ou senha incorretos.');
            }
        })
        .catch(error => console.error('Erro ao acessar usuário:', error));
}

// Função para acessar o sistema como cliente
function acessoCliente() {
    document.getElementById('painelInicial').style.display = 'none';
    document.getElementById('pedidoCliente').style.display = 'block';
    carregarSabores();
}

// Função para carregar sabores na tela de pedidos
function carregarSabores() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const saboresDiv = document.getElementById('sabores');
            saboresDiv.innerHTML = '';
            data.sabores.forEach((sabor, index) => {
                const saborDiv = document.createElement('div');
                saborDiv.className = 'sabor-item';
                saborDiv.innerHTML = `
                    <p>${sabor.nome} - R$${sabor.preco.toFixed(2)}</p>
                    <button onclick="adicionarAoCarrinho('${sabor.nome}', ${sabor.preco})">Adicionar</button>
                `;
                saboresDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar sabores:', error));
}

// Função para mostrar o painel do administrador
function mostrarPainelAdmin() {
    document.getElementById('painelInicial').style.display = 'none';
    document.getElementById('painelAdmin').style.display = 'block';
}

// Função para mostrar a fila de pedidos
function mostrarFilaPedidos() {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            const filaPedidosDiv = document.getElementById('filaPedidos');
            filaPedidosDiv.innerHTML = '';
            data.pedidos.forEach((pedido, index) => {
                if (!pedido.finalizado) {
                    const pedidoDiv = document.createElement('div');
                    pedidoDiv.className = 'pedido-item';
                    pedidoDiv.innerHTML = `
                        <p>Pedido ${pedido.numeroPedido} - ${pedido.cliente}</p>
                        <p>Valor: R$${pedido.valor.toFixed(2)}</p>
                        <p>Forma de Pagamento: ${pedido.formaPagamento}</p>
                        <button onclick="marcarPedidoFinalizado(${index})">Finalizar Pedido</button>
                    `;
                    filaPedidosDiv.appendChild(pedidoDiv);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar fila de pedidos:', error));

    document.getElementById('painelInicial').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'block';
}

// Função para marcar um pedido como finalizado
function marcarPedidoFinalizado(index) {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            data.pedidos[index].finalizado = true;
            return fetch('data/pedidos.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => mostrarFilaPedidos())
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

// Função para voltar ao painel inicial
function voltarAcesso() {
    document.getElementById('pedidoCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('avaliarPedido').style.display = 'none';
    document.getElementById('painelAdmin').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'none';
    document.getElementById('painelInicial').style.display = 'block';
}
