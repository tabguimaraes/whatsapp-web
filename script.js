// Containaer da tela das mensagens

const container = {
  messageBoard: document.querySelector("#messageBoard"),
  receivedMessages: document.querySelectorAll(".receivedMessages div p"),
  sentMessages: document.querySelectorAll(".sentMessages div p"),
  contactList: document.querySelector("#contactListContainer"),
  profile: document.querySelector("#profileContainer"),
};

// Variavel para os elementos do form
const elemento = {
  form: document.querySelector("#formInputMessage"),
  input: document.querySelector("#inputSendMessage"),
  contact_list: document.querySelector("#contactListSection"),
  user_profile: document.querySelector("#userProfile"),

  contact_header: document.querySelector("#contactListHeader"),
};

// console.log(elemento.user_profile);

// Variavel para receber o input do isuário
let message = "";
let contactList = elemento.contact_list.getHTML();

elemento.form.addEventListener("submit", (evento) => {
  //Previne o default para poder capturar o valor do value do input
  evento.preventDefault();
  message = elemento.input.value;

  if (message) {
    createMessage(message);
    // Limpa o valor do value após o enter
    elemento.input.value = "";
  }
});

// Apaga a sessão contactlist para inserir a troca de perfil de usuário (ainda não implementado)
elemento.user_profile.addEventListener("click", () => {
  container.contactList.classList.toggle("hidden");

  elemento.contact_header.classList.toggle("sticky");
  elemento.contact_header.classList.toggle("hidden");

  container.profile.classList.toggle("hidden");
  container.profile.classList.toggle("flex");
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
