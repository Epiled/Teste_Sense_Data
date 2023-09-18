const filtroCategoria = document.querySelector('[data-filtro-categorias]');

filtroCategoria.addEventListener('change', (e) => {

  const cards = document.querySelectorAll('[data-card]');
  const categoriaSelecionada = e.target.value;
  
  filtrarPorCategorias(cards, categoriaSelecionada);
});

function filtrarPorCategorias(cards, categoriaSelecionada) {
  cards.forEach(item => {
    if (item.dataset.categoria != categoriaSelecionada) {
      item.classList.add('card--esconder');
    } else {
      item.classList.remove('card--esconder');
    };
  })
}

