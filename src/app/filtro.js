const filtroCategoria = document.querySelector('[data-filtro-categorias]');
const btnFiltroValor = document.querySelector('[data-btn-filtro-valor]');
const filtroValorMin = document.querySelector('[data-filtro-min]');
const filtroValorMax = document.querySelector('[data-filtro-max]');
const filtroTipo = document.querySelector('[data-filtro-tipo]');
const filtroOrdem = document.querySelector('[data-filtro-ordem]');

let filtrados = {
  categorias: [],
  valores: []
};

let filtradosShow = [];

filtroCategoria.addEventListener('change', (e) => {
  const cards = document.querySelectorAll('[data-card]');
  const categoriaSelecionada = e.target.value;
  filtrarPorCategorias(cards, categoriaSelecionada);
});

function filtrarPorCategorias(cards, categoriaSelecionada) {
  filtrados.categorias = [];
  cards.forEach(item => {
    if (categoriaSelecionada !== 'Todos' && (item.dataset.categoria != categoriaSelecionada)) {
    } else {
      filtrados.categorias.push(item);
    };
  })

  filtrar(cards); // Chama a função de filtragem geral
}

btnFiltroValor.addEventListener('click', () => {
  valorMin = parseFloat(filtroValorMin.value).toFixed(2);
  valorMax = parseFloat(filtroValorMax.value).toFixed(2);
  const cards = document.querySelectorAll('[data-card]');
  filtrarPorValor(cards, valorMin, valorMax)
})

function filtrarPorValor(cards, valorMin, valorMax) {
  filtrados.valores = [];
  cards.forEach(item => {
    let valorCard = parseFloat(item.dataset.valor);

    if (valorCard >= valorMin && valorCard <= valorMax) {
      filtrados.valores.push(item);
    }
  })

  filtrar(cards);
}

function filtrar(cards) {

  if (filtrados.categorias.length > 0 && filtrados.valores.length > 0) {
    // Se ambos os filtros estão ativos, pegar a interseção
    filtradosShow = filtrados.categorias.filter(item => filtrados.valores.includes(item));
  } else if (filtrados.categorias.length > 0) {
    // Se só o filtro de categoria está ativo
    filtradosShow = filtrados.categorias;
  } else if (filtrados.valores.length > 0) {
    // Se só o filtro de valor está ativo
    filtradosShow = filtrados.valores;
  } else {
    // Se nenhum filtro está ativo, mostrar todos os cards
    filtradosShow = [...cards];
  }

  // Atualiza a visualização dos cards
  cards.forEach(item => {
    if (filtradosShow.includes(item)) {
      item.classList.remove('card--esconder');
    } else {
      item.classList.add('card--esconder');
    }
  });
}

filtroTipo.addEventListener('change', (e) => {
  const cards = document.querySelectorAll('[data-card]');
  const tipo = e.target.value;
  const ordem = filtroOrdem.value;
  ordenarPorTipo(cards, tipo, ordem);
})

filtroOrdem.addEventListener('change', (e) => {
  const cards = document.querySelectorAll('[data-card]');
  const tipo = filtroTipo.value;
  const ordem = e.target.value;
  ordenarPorTipo(cards, tipo, ordem);
})

function ordenarPorTipo(cards, tipo, ordem) {
  const arrayCards = Array.from(cards);
  let organizados;

  if (tipo == "Categoria" || tipo == '') {
    organizados = arrayCards.sort((a, b) => {
      return a.dataset.categoria.localeCompare(b.dataset.categoria);
    });
  } else {
    organizados = arrayCards.sort((a, b) => {
      // Comparar os valores de 'data-valor' dos elementos
      return parseFloat(a.dataset.valor) - parseFloat(b.dataset.valor);
    });
  }

  // Verificar se a ordem é decrescente e reverter
  if (ordem === "Decrescente") {
    organizados.reverse();
  }

  // Aplicar a ordem correta nos itens
  organizados.forEach((item, index) => {
    item.style.order = index;
  });
}
