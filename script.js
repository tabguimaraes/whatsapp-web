// Containaer da tela das mensagens

const container = {
  messageBoard: document.querySelector("#messageBoard"),
  receivedMessages: document.querySelectorAll(".receivedMessages div p"),
  sentMessages: document.querySelectorAll(".sentMessages div p"),
};

// Variavel para os elementos do form
const elemento = {
  form: document.querySelector("#formInputMessage"),
  input: document.querySelector("#inputSendMessage"),
};

// Variavel para receber o input do isuário
let message = "";

elemento.form.addEventListener("submit", (evento) => {
  //Previne o default para poder capturar o valor do value do input
  evento.preventDefault();
  message = elemento.input.value;

  createMessage(message);
  // Limpa o valor do value após o enter
  elemento.input.value = "";
});

function createMessage(mensagem) {
  let span = document.createElement("span");
  span.classList.add("pl-16", "text-xs");
  span.innerText = `${insertHour()}`;

  let mensagemPronta = document.createElement("p");
  mensagemPronta.classList.add("flex", "items-end", "justify-between");

  mensagemPronta.innerText = mensagem;

  mensagemPronta.appendChild(span);

  createContainerSendMessages(mensagemPronta);
}

// Função para inserir a hora dentro de todos os elementos. Necessário adaptar ela para incluir apenas na nova mensagem criada.
function insertHour() {
  let hour = getHour();
  return hour;
}

// Construtor da hora para o método POST da msg
function getHour() {
  const data = new Date().toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return data;
}

function createContainerSendMessages(mensagem) {
  let containerPrincipal = document.createElement("div");
  let containerSecundario = document.createElement("div");

  containerPrincipal.classList.add(
    "sentMessages",
    "col-start-2",
    "col-end-5",
    "overflow-hidden",
    "rounded-lg",
    "*:bg-[#d9fdd3]",
  );

  containerSecundario.classList.add("w-fit", "place-self-end", "px-5", "py-1");

  containerSecundario.appendChild(mensagem);
  containerPrincipal.appendChild(containerSecundario);

  insertMessage(containerPrincipal);
}

function insertMessage(mensagem) {
  container.messageBoard.appendChild(mensagem);
}
