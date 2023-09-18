
async function listaValoresConta(conta) {
  const conexao = await fetch(`http://localhost:3000/gastos?idConta=${conta}`);
  const conexaoConvertida = await conexao.json();

  return conexaoConvertida;
}

async function contaEspecifica(id) {
  const conexao = await fetch(`http://localhost:3000/gastos/${id}`);
  const conexaoConvertida = await conexao.json();

  return conexaoConvertida;
}

async function criaValorConta(categoria, data, descricao, valor, idConta) {
  const conexao = await fetch('http://localhost:3000/gastos', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      categoria: categoria,
      data: data,
      descricao: descricao,
      valor: Number(valor),
      idConta: Number(idConta),
    })
  });

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function deletaValorConta(id) {
  const conexao = await fetch(`http://localhost:3000/gastos/${id}`, {
    method: "DELETE"
  });

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function editaValorConta(id, categoria, data, descricao, valor, idConta) {
  const conexao = await fetch(`http://localhost:3000/gastos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      categoria: categoria,
      data: data,
      descricao: descricao,
      idConta: idConta,
      valor: Number(valor),
    })
  });

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

export const conectaApi = {
  listaValoresConta,
  criaValorConta,
  deletaValorConta,
  editaValorConta,
  contaEspecifica,
}