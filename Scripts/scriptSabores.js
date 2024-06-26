document.addEventListener('DOMContentLoaded', () => {
    const saboresContainer = document.getElementById('saboresContainer');
    const cadastroSaborForm = document.getElementById('cadastroSaborForm');
    const nomeInput = document.getElementById('nome');
    const precoInput = document.getElementById('preco');
    let sabores = [];
    let editIndex = null;

    // Função para carregar sabores do JSON ou do localStorage
    function carregarSabores() {
        if (typeof fetch === "function") {
            // Tenta carregar do servidor
            fetch('/api/sabores')
                .then(response => response.json())
                .then(data => {
                    sabores = data.sabores;
                    exibirSabores();
                })
                .catch(error => {
                    console.error('Erro ao carregar sabores do servidor:', error);
                    carregarSaboresLocal();
                });
        } else {
            // Carrega do localStorage
            carregarSaboresLocal();
        }
    }

    // Função para exibir sabores na tela
    function exibirSabores() {
        saboresContainer.innerHTML = ''; // Limpa o container
        sabores.forEach((sabor, index) => {
            const saborDiv = document.createElement('div');
            saborDiv.className = 'sabor-item';
            saborDiv.innerHTML = `
                <strong>${sabor.sabor}</strong> - R$ ${sabor.preco.toFixed(2)}
                <button class="btn" onclick="editarSabor(${index})">Editar</button>
                <button class="btn" onclick="excluirSabor(${index})">Excluir</button>
            `;
            saboresContainer.appendChild(saborDiv);
        });
    }

    // Função para salvar os sabores no JSON ou no localStorage
    function salvarSabores() {
        if (typeof fetch === "function") {
            // Tenta salvar no servidor
            fetch('/api/sabores', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sabores })
            })
            .then(response => {
                if (response.ok) {
                    carregarSabores();
                } else {
                    console.error('Erro ao salvar sabores no servidor:', response.statusText);
                    salvarSaboresLocal();
                }
            })
            .catch(error => {
                console.error('Erro ao salvar sabores no servidor:', error);
                salvarSaboresLocal();
            });
        } else {
            // Salva no localStorage
            salvarSaboresLocal();
        }
    }

    // Função para salvar sabores no localStorage
    function salvarSaboresLocal() {
        localStorage.setItem('sabores', JSON.stringify(sabores));
        carregarSaboresLocal();
    }

    // Função para carregar sabores do localStorage
    function carregarSaboresLocal() {
        const data = localStorage.getItem('sabores');
        if (data) {
            sabores = JSON.parse(data);
        }
        exibirSabores();
    }

    // Função para adicionar ou editar um sabor
    cadastroSaborForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const novoSabor = {
            sabor: nomeInput.value,
            preco: parseFloat(precoInput.value)
        };
        if (editIndex !== null) {
            // Editar sabor existente
            sabores[editIndex] = novoSabor;
            editIndex = null;
        } else {
            // Adicionar novo sabor
            sabores.push(novoSabor);
        }
        salvarSabores();
        cadastroSaborForm.reset();
    });

    // Função para editar um sabor
    window.editarSabor = function(index) {
        const sabor = sabores[index];
        nomeInput.value = sabor.sabor;
        precoInput.value = sabor.preco;
        editIndex = index;
    }

    // Função para excluir um sabor
    window.excluirSabor = function(index) {
        if (confirm('Você realmente deseja excluir este sabor?')) {
            sabores.splice(index, 1);
            salvarSabores();
        }
    }

    // Carregar sabores ao carregar a página
    carregarSabores();
});
