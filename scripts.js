function mostrarAcessoCliente() {
    document.getElementById('acesso').style.display = 'none';
    document.getElementById('acessoCliente').style.display = 'block';
}

function mostrarAcessoFuncionario() {
    document.getElementById('acesso').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'block';
}

function acessarMenu() {
    let nomeCliente = document.getElementById('nomeCliente').value.trim();
    if (nomeCliente === '') {
        alert('Por favor, insira seu nome.');
        return;
    }

    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('menuCliente').style.display = 'block';

    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            let cardapio = document.getElementById('cardapio');
            cardapio.innerHTML = '';
            data.sabores.forEach((sabor, index) => {
                let div = document.createElement('div');
                div.innerHTML = `
                    <label>
                        <input type="checkbox" value="${sabor}" data-index="${index}">
                        ${sabor}
                    </label>
                `;
                cardapio.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar cardápio:', error));
}

function finalizarPedido() {
    let nomeCliente = document.getElementById('nomeCliente').value.trim();
    let itensCarrinho = document.querySelectorAll('#cardapio input:checked');
    if (itensCarrinho.length === 0) {
        alert('Por favor, selecione pelo menos um item.');
        return;
    }

    let produtosPedidos = [];
    itensCarrinho.forEach(item => {
        let quantidade = parseInt(item.parentNode.querySelector('input[type="number"]').value);
        if (quantidade > 0) {
            produtosPedidos.push({
                sabor: item.value,
                quantidade: quantidade
            });
        }
    });

    if (produtosPedidos.length === 0) {
        alert('Por favor, selecione uma quantidade válida para cada item.');
        return;
    }

    let valorTotal = produtosPedidos.reduce((total, produto) => total + (produto.quantidade * 5), 0); // Exemplo: cada item custa R$5.00

    let pedido = {
        data: new Date().toISOString(),
        cliente: nomeCliente,
        numeroPedido: gerarCodigoPedido(),
        produtosPedidos,
        formaPagamento: null, // Será definido posteriormente
        valor: valorTotal
    };

    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(pedidos => {
            pedidos.push(pedido);
            return fetch('data/pedidos.json', {
                method: 'POST',
                body: JSON.stringify(pedidos),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            exibirResumoPedido(pedido);
            // Atualiza a fila de pedidos
            verFilaPedidos();
        })
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

function exibirResumoPedido(pedido) {
    document.getElementById('menuCliente').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'block';

    document.getElementById('codigoPedido').textContent = `Código do Pedido: ${pedido.numeroPedido}`;
    document.getElementById('valorPedido').textContent = `Valor Total: R$${pedido.valor.toFixed(2)}`;
}

function gerarCodigoPedido() {
    return 'P' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function acessarSistemaFuncionario() {
    let nomeFuncionario = document.getElementById('nomeFuncionario').value.trim();
    let senhaFuncionario = document.getElementById('senhaFuncionario').value.trim();

    if (nomeFuncionario === '' || senhaFuncionario === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(usuarios => {
            let usuario = usuarios.find(user => user.nome === nomeFuncionario && user.senha === senhaFuncionario);
            if (usuario) {
                document.getElementById('acessoFuncionario').style.display = 'none';
                document.getElementById('painelFuncionario').style.display = 'block';
            } else {
                alert('Nome ou senha incorretos.');
            }
        })
        .catch(error => console.error('Erro ao acessar sistema:', error));
}

function verFilaPedidos() {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(pedidos => {
            if (pedidos.length === 0) {
                // Adiciona um pedido de teste se não houver pedidos
                let pedidoTeste = {
                    data: new Date().toISOString(),
                    cliente: 'Teste',
                    numeroPedido: gerarCodigoPedido(),
                    produtosPedidos: [{ sabor: 'Carne', quantidade: 1 }],
                    formaPagamento: 'Dinheiro',
                    valor: 5.00
                };
                pedidos.push(pedidoTeste);
                return fetch('data/pedidos.json', {
                    method: 'POST',
                    body: JSON.stringify(pedidos),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => pedidos);
            }
            return pedidos;
        })
        .then(pedidos => {
            let listaPedidos = document.getElementById('listaPedidos');
            listaPedidos.innerHTML = '';
            pedidos.forEach(pedido => {
                let div = document.createElement('div');
                div.innerHTML = `
                    <p>Pedido ${pedido.numeroPedido} - Cliente: ${pedido.cliente} - Valor: R$${pedido.valor.toFixed(2)}</p>
                    <button onclick="marcarPedidoComoFinalizado('${pedido.numeroPedido}')">Marcar como finalizado</button>
                `;
                listaPedidos.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar fila de pedidos:', error));
}

function marcarPedidoComoFinalizado(numeroPedido) {
    fetch('data/pedidos.json')
        .then(response => response.json())
        .then(pedidos => {
            let pedido = pedidos.find(p => p.numeroPedido === numeroPedido);
            if (pedido) {
                pedidos = pedidos.filter(p => p.numeroPedido !== numeroPedido);
                return fetch('data/pedidos.json', {
                    method: 'POST',
                    body: JSON.stringify(pedidos),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        })
        .then(() => {
            alert(`Pedido ${numeroPedido} finalizado.`);
            verFilaPedidos(); // Atualiza a lista de pedidos
        })
        .catch(error => console.error('Erro ao finalizar pedido:', error));
}

function verAvaliacoes() {
    fetch('data/avaliacoes.json')
        .then(response => response.json())
        .then(avaliacoes => {
            let listaAvaliacoes = document.getElementById('listaAvaliacoes');
            listaAvaliacoes.innerHTML = '';
            avaliacoes.forEach(avaliacao => {
                let div = document.createElement('div');
                div.innerHTML = `
                    <p>Cliente: ${avaliacao.nomeCliente} - Avaliação: ${avaliacao.avaliacaoEstrelas} estrelas</p>
                    <p>Comentário: ${avaliacao.comentario}</p>
                `;
                listaAvaliacoes.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar avaliações:', error));
}

function gerenciarSabores() {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            let listaSabores = document.getElementById('listaSabores');
            listaSabores.innerHTML = '';
            data.sabores.forEach((sabor, index) => {
                let div = document.createElement('div');
                div.innerHTML = `
                    <input type="text" value="${sabor}" data-index="${index}" onchange="editarSabor(${index}, this.value)">
                    <button onclick="removerSabor(${index})">Remover</button>
                `;
                listaSabores.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar sabores:', error));
}

function adicionarSabor() {
    let novoSabor = document.getElementById('novoSabor').value.trim();
    if (novoSabor === '') {
        alert('Por favor, insira um sabor.');
        return;
    }

    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            data.sabores.push(novoSabor);
            return fetch('data/sabores.json', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            document.getElementById('novoSabor').value = '';
            gerenciarSabores(); // Atualiza a lista de sabores
        })
        .catch(error => console.error('Erro ao adicionar sabor:', error));
}

function editarSabor(index, novoNome) {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            data.sabores[index] = novoNome;
            return fetch('data/sabores.json', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            gerenciarSabores(); // Atualiza a lista de sabores
        })
        .catch(error => console.error('Erro ao editar sabor:', error));
}

function removerSabor(index) {
    fetch('data/sabores.json')
        .then(response => response.json())
        .then(data => {
            data.sabores.splice(index, 1);
            return fetch('data/sabores.json', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            gerenciarSabores(); // Atualiza a lista de sabores
        })
        .catch(error => console.error('Erro ao remover sabor:', error));
}

function gerenciarFuncionarios() {
    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('gerenciarFuncionarios').style.display = 'block';

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(usuarios => {
            let listaFuncionarios = document.getElementById('listaFuncionarios');
            listaFuncionarios.innerHTML = '';
            usuarios.forEach((usuario, index) => {
                let div = document.createElement('div');
                div.innerHTML = `
                    <p>Nome: ${usuario.nome} - Administrador: ${usuario.admin ? 'Sim' : 'Não'}</p>
                    <button onclick="removerFuncionario(${index})">Remover</button>
                `;
                listaFuncionarios.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar funcionários:', error));
}

function adicionarFuncionario() {
    let nome = document.getElementById('nomeNovoFuncionario').value.trim();
    let senha = document.getElementById('senhaNovoFuncionario').value.trim();
    let admin = document.getElementById('adminNovoFuncionario').checked;

    if (nome === '' || senha === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(usuarios => {
            usuarios.push({ nome, senha, admin });
            return fetch('data/usuarios.json', {
                method: 'POST',
                body: JSON.stringify(usuarios),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            document.getElementById('nomeNovoFuncionario').value = '';
            document.getElementById('senhaNovoFuncionario').value = '';
            document.getElementById('adminNovoFuncionario').checked = false;
            gerenciarFuncionarios(); // Atualiza a lista de funcionários
        })
        .catch(error => console.error('Erro ao adicionar funcionário:', error));
}

function removerFuncionario(index) {
    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(usuarios => {
            usuarios.splice(index, 1);
            return fetch('data/usuarios.json', {
                method: 'POST',
                body: JSON.stringify(usuarios),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(() => {
            gerenciarFuncionarios(); // Atualiza a lista de funcionários
        })
        .catch(error => console.error('Erro ao remover funcionário:', error));
}

function voltarPainelFuncionario() {
    document.getElementById('filaPedidos').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'none';
    document.getElementById('gerenciarSabores').style.display = 'none';
    document.getElementById('gerenciarFuncionarios').style.display = 'none';
    document.getElementById('painelFuncionario').style.display = 'block';
}

function voltarTelaInicial() {
    document.getElementById('acesso').style.display = 'block';
    document.getElementById('acessoCliente').style.display = 'none';
    document.getElementById('menuCliente').style.display = 'none';
    document.getElementById('acessoFuncionario').style.display = 'none';
    document.getElementById('painelFuncionario').style.display = 'none';
    document.getElementById('filaPedidos').style.display = 'none';
    document.getElementById('avaliacoes').style.display = 'none';
    document.getElementById('gerenciarSabores').style.display = 'none';
    document.getElementById('gerenciarFuncionarios').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'none';
}
