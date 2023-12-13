/**
 * Criar um formulário com os atributos
 * Nome
 * E-mail
 * Data de Nascimento
 * Sexo
 * Profissão
 */

let indexSelecionado = -1;

function validarFormulario() {
  // Verificar se o formulário é válido
  if (
    document.getElementById("nome").checkValidity() &&
    document.getElementById("email").checkValidity() &&
    document.getElementById("dataNascimento").checkValidity() &&
    document.getElementById("sexo").checkValidity() &&
    document.getElementById("profissao").checkValidity()
  ) {
    // Se todos os campos são válidos, continuar com a lógica de salvar
    salvarDados();
  } else {
    // Se algum campo é inválido, exibir uma mensagem de erro
    alert("Por favor, preencha todos os campos corretamente.");
  }
}

function salvarDados() {
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var dataNascimento = document.getElementById("dataNascimento").value;
  var sexo = document.getElementById("sexo").value;
  var profissao = document.getElementById("profissao").value;

  // Criar um objeto com os dados do formulário
  var novoRegistro = {
    nome: nome,
    email: email,
    dataNascimento: dataNascimento,
    sexo: sexo,
    profissao: profissao,
  };

  // Obter a lista de registros existente do localStorage (se houver)
  var registrosSalvos =
    JSON.parse(localStorage.getItem("listaRegistros")) || [];

  // Adicionar o novo registro à lista
  if (indexSelecionado >= 0) {
    registrosSalvos[indexSelecionado] = novoRegistro;
  } else {
    registrosSalvos.push(novoRegistro);
  }

  // Salvar a lista atualizada no localStorage
  localStorage.setItem("listaRegistros", JSON.stringify(registrosSalvos));

  // Limpar o formulário após salvar
  document.getElementById("cadastroForm").reset();

  // Atualizar a tabela com os dados salvos
  atualizarTabela();
}

function atualizarTabela() {
  // Obter a tabela e o corpo da tabela
  var table = document.getElementById("dadosTable");
  var tbody = table.getElementsByTagName("tbody")[0];

  // Limpar o corpo da tabela
  tbody.innerHTML = "";

  // Obter a lista de registros do localStorage
  var registrosSalvos =
    JSON.parse(localStorage.getItem("listaRegistros")) || [];

  // Preencher a tabela com os dados salvos
  registrosSalvos.forEach(function (registro, index) {
    var row = tbody.insertRow();
    var cellNome = row.insertCell(0);
    var cellEmail = row.insertCell(1);
    var cellDataNascimento = row.insertCell(2);
    var cellSexo = row.insertCell(3);
    var cellProfissao = row.insertCell(4);
    var cellAcoes = row.insertCell(5);

    cellNome.innerHTML = registro.nome;
    cellEmail.innerHTML = registro.email;
    cellDataNascimento.innerHTML = registro.dataNascimento;
    cellSexo.innerHTML = registro.sexo;
    cellProfissao.innerHTML = registro.profissao;

    // Adicionando botões de ação
    var editarBtn = document.createElement("button");
    editarBtn.innerHTML = "Editar";
    editarBtn.className = "acao-btn editar-btn";
    editarBtn.onclick = function () {
      editarRegistro(index);
    };

    var excluirBtn = document.createElement("button");
    excluirBtn.innerHTML = "Excluir";
    excluirBtn.className = "acao-btn excluir-btn";
    excluirBtn.onclick = function () {
      excluirRegistro(index);
    };

    cellAcoes.appendChild(editarBtn);
    cellAcoes.appendChild(excluirBtn);
  });
}

function editarRegistro(index) {
  var registrosSalvos =
    JSON.parse(localStorage.getItem("listaRegistros")) || [];
  var registroParaEditar = registrosSalvos[index];
  indexSelecionado = index;

  // Preencher o formulário com os dados do registro selecionado
  document.getElementById("nome").value = registroParaEditar.nome;
  document.getElementById("email").value = registroParaEditar.email;
  document.getElementById("dataNascimento").value =
    registroParaEditar.dataNascimento;
  document.getElementById("sexo").value = registroParaEditar.sexo;
  document.getElementById("profissao").value = registroParaEditar.profissao;
}

function cancelarEdicao() {
  // Limpar o formulário
  document.getElementById("cadastroForm").reset();
  // Limpar o index selecionado
  indexSelecionado = -1;
}

function excluirRegistro(index) {
  var registrosSalvos =
    JSON.parse(localStorage.getItem("listaRegistros")) || [];

  // Remover o registro com base no índice
  registrosSalvos.splice(index, 1);

  // Salvar a lista atualizada no localStorage
  localStorage.setItem("listaRegistros", JSON.stringify(registrosSalvos));

  // Atualizar a tabela após a exclusão
  atualizarTabela();
}

// Chamar a função de atualização quando a página carrega
atualizarTabela();

document
  .getElementById("btnSalvar")
  .addEventListener("click", validarFormulario);
