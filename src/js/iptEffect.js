const ipts = document.querySelectorAll('.formulario__ipt');

ipts.forEach(item => {
  item.addEventListener('change', () => {
    verificaVazio(item);
  })

  verificaVazio(item);
})

function verificaVazio(item) {
  const etq = item.parentNode.querySelector('.formulario__etq')
  if(item.value) {
    etq.classList.add('formulario__etq--ativo');
  } else {
    etq.classList.remove('formulario__etq--ativo');
  };
}