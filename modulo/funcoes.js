const dataJSON = require("../modulo/contatos.js");

const MESSAGE_ERROR = {
  status: false,
  status_code: 500,
  development: "Tiago Guimarães",
};

const message = { status: true, status_code: 200, development: "Tiago Guimarães", data: [] };

let usuario;

// Função para selecionar o usuário pelo número do telefone e salvar os dados dentro da variável 'usuário'
function selecionarUsuarioPeloTelefone(userNumber) {
  usuario = dataJSON.contatos["whats-users"].find((item) => item.number === userNumber);
  return usuario;
}

function listarTodosUsuarios() {
  try {
    message.data.length = 0;
    dataJSON.contatos["whats-users"].forEach((item) => {
      message.data.push(item);
    });
    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarDadosDaConta(userNumber) {
  try {
    message.data.length = 0;
    selecionarUsuarioPeloTelefone(userNumber);
    message.data.push({
      nome: usuario.account,
      nickname: usuario.nickname,
      "profile-image": usuario["profile-image"],
      number: usuario.number,
      background: usuario.background,
      "created-since-start": usuario["created-since"].start,
      "created-since-end": usuario["created-since"].end,
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarDadosDeContato(userNumber) {
  try {
    message.data.length = 0;
    selecionarUsuarioPeloTelefone(userNumber);

    usuario.contacts.forEach((item) => {
      message.data.push({ name: item.name, description: item.description, image: item.image });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarTodasMensagens(userNumber) {
  try {
    message.data.length = 0;
    selecionarUsuarioPeloTelefone(userNumber);
    usuario.contacts.forEach((item) => {
      message.data.push({ contato: item.name, mensagens: item.messages });
    });

    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function listarConversasComUmContato(userNumber, contactNumber) {
  try {
    message.data.length = 0;
    selecionarUsuarioPeloTelefone(userNumber);
    // Objeto para armazenar os dados de retorno da pesquisa
    let historico = {
        nome: usuario.account,
        numero: usuario.number,
        conversas: "",
      },
      contato,
      resultados = {};

    contato = usuario.contacts.find((item) => item.number === contactNumber);

    resultados = {
      "nome-contato": contato.name,
      "numero-contato": contato.number,
      mensagens: contato.messages,
    };
    historico.conversas = resultados;
    message.data.push(historico);
    console.log(message);
    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

function pesquisarPorPalavraChave(userNumber, query) {
  try {
    message.data.length = 0;
    selecionarUsuarioPeloTelefone(userNumber);

    let historico = {
      nome: usuario.account,
      numero: usuario.number,
      conversas: [],
    };

    historico.conversas.length = 0;
    let resultados = [];

    usuario.contacts.forEach((contato) => {
      let msgsEncontradas = contato.messages.filter((msg) => msg.content.toLowerCase().includes(query.toLowerCase()));

      if (msgsEncontradas.length > 0) {
        resultados.push({
          "nome-contato": contato.name,
          "numero-contato": contato.number,
          mensagens: msgsEncontradas,
        });
      }
    });

    if (resultados.length === 0) {
      MESSAGE_ERROR.mensagem = `A pesquisa por "${query}" não retornou resultados.`;
      return MESSAGE_ERROR;
    }

    historico.conversas = resultados;
    message.data.push(historico);
    return message;
  } catch (error) {
    return MESSAGE_ERROR;
  }
}

module.exports = {
  listarTodosUsuarios,
  listarDadosDaConta,
  listarDadosDeContato,
  listarTodasMensagens,
  listarConversasComUmContato,
  pesquisarPorPalavraChave,
};
