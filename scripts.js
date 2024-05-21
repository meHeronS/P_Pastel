// Função chamada ao carregar a página
function iniciarSistema() {
    carregarCardapio();
}

// Funções de acesso
function AcessoCliente() {
    document.getElementById('acesso').style.display = 'none';
    document.getElementById('menuCliente').style.display = 'block';
}

function AcessoFuncionario() {
    document.getElementById('acesso').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'block';
}

function voltarAcesso() {
    document.getElementById('menuCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'none';
    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'none';
    document.getElementById('gerenciarSabores').style.display = 'none';
    document.getElementById('gerenciarFuncionarios').style.display = 'none';
    document.getElementById('acesso').style.display = 'block';
}

let cardapio = [];

// Carrega o cardápio a partir do arquivo JSON
function carregarCardapio() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const cardapioDiv = document.getElementById('cardapio');
            cardapioDiv.innerHTML = '';
            data.sabores.forEach((sabor, index) => {
                const saborDiv = document.createElement('div');
                saborDiv.className = 'sabor-item';
                saborDiv.innerHTML = `
                    <p>${sabor.nome} - R$${sabor.preco.toFixed(2)}</p>
                    <input type="number" id="quantidade${index}" value="1" min="1">
                    <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
                `;
                cardapioDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar cardápio:', error));
}

let carrinho = [];

// Adiciona um item ao carrinho
function adicionarAoCarrinho(index) {
    const quantidade = document.getElementById(`quantidade${index}`).value;
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            const sabor = data.sabores[index];
            const itemCarrinho = {
                nome: sabor.nome,
                preco: sabor.preco,
                quantidade: parseInt(quantidade)
            };
            carrinho.push(itemCarrinho);
            atualizarCarrinho();
        })
        .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
}

// Atualiza a exibição do carrinho
function atualizarCarrinho() {
    const itensCarrinhoDiv = document.getElementById('itensCarrinho');
    itensCarrinhoDiv.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-carrinho';
        itemDiv.innerHTML = `
            <p>${item.nome} - ${item.quantidade} x R$${item.preco.toFixed(2)} = R$${(item.preco * item.quantidade).toFixed(2)}</p>
        `;
        itensCarrinhoDiv.appendChild(itemDiv);
        total += item.preco * item.quantidade;
    });
    document.getElementById('totalCompra').innerText = `Total: R$${total.toFixed(2)}`;
}

// Finaliza o pedido e gera um código
function finalizarPedido() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    if (nomeCliente === '') {
        alert('Por favor, insira seu nome.');
        return;
    }

    const numeroPedido = Math.floor(Math.random() * 1000000);
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

    const pedido = {
        data: new Date().toISOString(),
        cliente: nomeCliente,
        numeroPedido: numeroPedido,
        produtos: carrinho,
        formaPagamento: null,
        valor: total
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
            document.getElementById('menuCliente').style.display = 'none';
            document.getElementById('resumoPedido').style.display = 'block';
            document.getElementById('codigoPedido').innerText = `Código do Pedido: ${numeroPedido}`;
            document.getElementById('valorPedido').innerText = `Valor Total: R$${total.toFixed(2)}`;
            carrinho = [];
        })
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

// Função de login do funcionário
function acessarSistemaFuncionario() {
    const nome = document.getElementById('nomeFuncionario').value;
    const senha = document.getElementById('senhaFuncionario').value;

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            const funcionario = data.funcionarios.find(func => func.nome === nome && func.senha === senha);
            if (funcionario) {
                document.getElementById('acessoFuncionario').style.display = 'none';
                document.getElementById('painelFuncionario').style.display = 'block';
            } else {
                alert('Nome ou senha incorretos.');
            }
        })
        .catch(error => console.error('Erro ao acessar sistema:', error));
}

// Funções de gerenciamento de sabores, funcionários e pedidos
// (as funções de adicionar, editar, remover, ver pedidos e avaliações serão similares às já fornecidas e devem ser adaptadas conforme necessário)

function verFilaPedidos() {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(data => {
            const listaPedidosDiv = document.getElementById('listaPedidos');
            listaPedidosDiv.innerHTML = '';
            data.pedidos.forEach(pedido => {
                const pedidoDiv = document.createElement('div');
                pedidoDiv.className = 'pedido-item';
                pedidoDiv.innerHTML = `
                    <p>Pedido: ${pedido.numeroPedido}</p>
                    <p>Cliente: ${pedido.cliente}</p>
                    <p>Total: R$${pedido.valor.toFixed(2)}</p>
                    <button onclick="marcarPedidoEntregue(${pedido.numeroPedido})">Marcar como Entregue</button>
                `;
                listaPedidosDiv.appendChild(pedidoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar fila de pedidos:', error));

    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'block';
}

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
                    <p>Cliente: ${avaliacao.nomeCliente}</p>
                    <p>Avaliação: ${avaliacao.estrelas} estrelas</p>
                    <p>Comentário: ${avaliacao.comentario}</p>
                `;
                listaAvaliacoesDiv.appendChild(avaliacaoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar avaliações:', error));

    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'block';
}

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
                    <input type="text" id="editarNome${index}" value="${sabor.nome}">
                    <input type="number" id="editarPreco${index}" value="${sabor.preco}">
                    <button onclick="editarSabor(${index})">Editar</button>
                    <button onclick="removerSabor(${index})">Remover</button>
                `;
                listaSaboresDiv.appendChild(saborDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar sabores:', error));

    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('gerenciarSabores').style.display = 'block';
}

function adicionarSabor() {
    const nomeNovoSabor = document.getElementById('novoSabor').value;
    const precoNovoSabor = parseFloat(document.getElementById('precoNovoSabor').value);

    if (nomeNovoSabor === '' || isNaN(precoNovoSabor)) {
        alert('Preencha todos os campos.');
        return;
    }

    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            data.sabores.push({ nome: nomeNovoSabor, preco: precoNovoSabor });
            return fetch('data/sabores.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => gerenciarSabores())
        .catch(error => console.error('Erro ao adicionar sabor:', error));
}

function editarSabor(index) {
    const nomeEditado = document.getElementById(`editarNome${index}`).value;
    const precoEditado = parseFloat(document.getElementById(`editarPreco${index}`).value);

    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            data.sabores[index] = { nome: nomeEditado, preco: precoEditado };
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

function gerenciarFuncionarios() {
    fetch('data/funcionarios.json')
        .then(response => response.json())
        .then(data => {
            const listaFuncionariosDiv = document.getElementById('listaFuncionarios');
            listaFuncionariosDiv.innerHTML = '';
            data.funcionarios.forEach((funcionario, index) => {
                const funcionarioDiv = document.createElement('div');
                funcionarioDiv.className = 'funcionario-item';
                funcionarioDiv.innerHTML = `
                    <p>${funcionario.nome}</p>
                    <input type="text" id="editarNomeFuncionario${index}" value="${funcionario.nome}">
                    <input type="password" id="editarSenhaFuncionario${index}" value="${funcionario.senha}">
                    <label for="editarAdminFuncionario${index}">Administrador</label>
                    <input type="checkbox" id="editarAdminFuncionario${index}" ${funcionario.admin ? 'checked' : ''}>
                    <button onclick="editarFuncionario(${index})">Editar</button>
                    <button onclick="removerFuncionario(${index})">Remover</button>
                `;
                listaFuncionariosDiv.appendChild(funcionarioDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar funcionários:', error));

    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('gerenciarFuncionarios').style.display = 'block';
}

function adicionarFuncionario() {
    const nomeNovoFuncionario = document.getElementById('nomeNovoFuncionario').value;
    const senhaNovoFuncionario = document.getElementById('senhaNovoFuncionario').value;
    const adminNovoFuncionario = document.getElementById('adminNovoFuncionario').checked;

    if (nomeNovoFuncionario === '' || senhaNovoFuncionario === '') {
        alert('Preencha todos os campos.');
        return;
    }

    fetch('data/funcionarios.json')
        .then(response => response.json())
        .then(data => {
            data.funcionarios.push({
                nome: nomeNovoFuncionario,
                senha: senhaNovoFuncionario,
                admin: adminNovoFuncionario
            });
            return fetch('data/funcionarios.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => gerenciarFuncionarios())
        .catch(error => console.error('Erro ao adicionar funcionário:', error));
}

function editarFuncionario(index) {
    const nomeEditado = document.getElementById(`editarNomeFuncionario${index}`).value;
    const senhaEditada = document.getElementById(`editarSenhaFuncionario${index}`).value;
    const adminEditado = document.getElementById(`editarAdminFuncionario${index}`).checked;

    fetch('data/funcionarios.json')
        .then(response => response.json())
        .then(data => {
            data.funcionarios[index] = {
                nome: nomeEditado,
                senha: senhaEditada,
                admin: adminEditado
            };
            return fetch('data/funcionarios.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => gerenciarFuncionarios())
        .catch(error => console.error('Erro ao editar funcionário:', error));
}

function removerFuncionario(index) {
    fetch('data/funcionarios.json')
        .then(response => response.json())
        .then(data => {
            data.funcionarios.splice(index, 1);
            return fetch('data/funcionarios.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => gerenciarFuncionarios())
        .catch(error => console.error('Erro ao remover funcionário:', error));
}

function voltarPainelFuncionario() {
    document.getElementById('filaPedidos').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'none';
    document.getElementById('gerenciarSabores').style.display = 'none';
    document.getElementById('gerenciarFuncionarios').style.display = 'none';
    document.getElementById('painelFuncionario').style.display = 'block';
}
