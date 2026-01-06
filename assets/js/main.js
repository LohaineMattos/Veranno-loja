document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    atualizarContadorCarrinho();
});

// Carrega produtos do JSON
async function carregarProdutos() {
    try {
        // Usar dados inline para evitar problemas de CORS
        const data = window.produtosData;
        exibirProdutos(data.produtos);
    } catch (error) {
        console.error('Erro:', error);
        // Exibe mensagem de erro para o usuário
        document.getElementById('produtos-container').innerHTML = `
            <div class="alert alert-danger col-12">
                Não foi possível carregar os produtos. Por favor, tente novamente mais tarde.
            </div>
        `;
    }
}

// Exibe os produtos na página
function exibirProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlbSBTZW0gSW1hZ2VtPC90ZXh0Pjwvc3ZnPg=='">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <span class="badge bg-primary">${produto.categoria}</span>
                    <p class="card-text mt-2">${produto.descricao}</p>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fs-4 text-success">R$ ${produto.preco.toFixed(2)}</span>
                        <div>
                            <button class="btn btn-outline-primary btn-sm" onclick="adicionarAoCarrinho(${produto.id})">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                            <a href="detalhes.html?id=${produto.id}" class="btn btn-primary btn-sm ms-2">
                                <i class="bi bi-eye"></i> Detalhes
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Funções do Carrinho
function adicionarAoCarrinho(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.id === idProduto);
    
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: idProduto,
            quantidade: 1
        });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    alert('Produto adicionado ao carrinho!');
}

function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('carrinho-contador').textContent = totalItens;
}

// Função global para ser usada em outras páginas
window.atualizarContadorCarrinho = atualizarContadorCarrinho;