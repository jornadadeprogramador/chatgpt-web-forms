/**
 * Criar um formulário com os atributos
 * Nome
 * E-mail
 * Data de Nascimento
 * Sexo
 * Profissão
 */

function validarFormulario() {
  // Verificar se o formulário é válido
  if (document.getElementById('nome').checkValidity() &&
      document.getElementById('email').checkValidity() &&
      document.getElementById('dataNascimento').checkValidity() &&
      document.getElementById('sexo').checkValidity() &&
      document.getElementById('profissao').checkValidity()) {
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

  var mensagem = "Dados Salvos:\n\n";
  mensagem += "Nome: " + nome + "\n";
  mensagem += "Email: " + email + "\n";
  mensagem += "Data de Nascimento: " + dataNascimento + "\n";
  mensagem += "Sexo: " + sexo + "\n";
  mensagem += "Profissão: " + profissao;

  alert(mensagem);
}

document.getElementById("btnSalvar").addEventListener("click", validarFormulario);
