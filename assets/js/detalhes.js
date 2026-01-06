document.addEventListener('DOMContentLoaded', function() {
    // Supondo que você pega o ID do produto pela URL, ex: detalhes.html?id=3
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = parseInt(urlParams.get('id'));

    // Carrega os dados do produto
    const data = window.produtosData;
    const produto = data.produtos.find(p => p.id === produtoId);
    if (!produto) return;

    // Preenche os campos da página
    const img = document.getElementById('produto-imagem');
    img.onerror = function() { this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlbSBTZW0gSW1hZ2VtPC90ZXh0Pjwvc3ZnPg=='; };
    img.src = produto.imagem;
    img.alt = produto.nome;
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('produto-categoria').textContent = produto.categoria || '';
    document.getElementById('produto-preco').textContent = 'R$ ' + produto.preco.toFixed(2);
    document.getElementById('produto-descricao').textContent = produto.descricao;

    // Armazena o ID no botão para uso no clique
    const btnAdicionar = document.getElementById('adicionar-carrinho');
    btnAdicionar.setAttribute('data-id', produto.id);

    // Evento do botão "Adicionar ao Carrinho"
    btnAdicionar.addEventListener('click', function() {
        // Pega o ID do produto do atributo data-id
        const id = parseInt(btnAdicionar.getAttribute('data-id'));
        // Pega a quantidade escolhida (ou 1 se não existir)
        const quantidade = parseInt(document.getElementById('produto-quantidade').value) || 1;

        if (window.carrinho && typeof window.carrinho.adicionarAoCarrinho === 'function') {
            window.carrinho.adicionarAoCarrinho(id, quantidade);

            // Mostra alerta de sucesso
            const alerta = document.getElementById('adicionado-sucesso');
            if (alerta) {
                alerta.style.display = 'block';
                setTimeout(() => alerta.style.display = 'none', 1500);
            }
        }
    });
});