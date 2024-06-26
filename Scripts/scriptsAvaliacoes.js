document.addEventListener('DOMContentLoaded', () => {
    const avaliacoesContainer = document.getElementById('avaliacoesContainer');
    let avaliacoes = [];

    // Função para carregar avaliações do JSON
    function carregarAvaliacoes() {
        fetch('../Data/avaliacoes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar avaliações');
                }
                return response.json();
            })
            .then(data => {
                avaliacoes = data;
                exibirAvaliacoes();
            })
            .catch(error => console.error('Erro ao carregar avaliações:', error));
    }

    // Função para exibir avaliações na tela
    function exibirAvaliacoes() {
        avaliacoesContainer.innerHTML = ''; // Limpa o container
        avaliacoes.forEach((avaliacao, index) => {
            const avaliacaoDiv = document.createElement('div');
            avaliacaoDiv.className = 'avaliacao-item';
            avaliacaoDiv.innerHTML = `
                <p><strong>Nome:</strong> ${avaliacao.nomeCliente}</p>
                <p><strong>Nota:</strong> ${avaliacao.nota}</p>
                <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
                <button class="btn" onclick="excluirAvaliacao(${index})">Excluir</button>
            `;
            avaliacoesContainer.appendChild(avaliacaoDiv);
        });
    }

    // Função para excluir uma avaliação
    window.excluirAvaliacao = function(index) {
        if (confirm('Você realmente deseja excluir esta avaliação?')) {
            avaliacoes.splice(index, 1);
            salvarAvaliacoes();
        }
    }

    // Função para salvar as avaliações no JSON (esta é uma simulação, pois não podemos realmente salvar no arquivo JSON com fetch)
    function salvarAvaliacoes() {
        // Simula o salvamento no JSON
        console.log('Avaliações salvas:', JSON.stringify(avaliacoes));
        exibirAvaliacoes(); // Recarrega as avaliações após salvar
    }

    // Carregar avaliações ao carregar a página
    carregarAvaliacoes();
});
