import { contatos } from "./modulo/contatos.js";

// Containaer da tela das mensagens

const container = {
  messageBoard: document.querySelector("#messageBoard"),
  receivedMessages: document.querySelectorAll(".receivedMessages div p"),
  sentMessages: document.querySelectorAll(".sentMessages div p"),
  contactList: document.querySelector("#contactListContainer"),
  profile: document.querySelector("#profileContainer"),
  change_profile: document.querySelector("#changeProfileContainer"),
  main: document.querySelector("main"),
};

// Variavel para os elementos do form
const elemento = {
  form: document.querySelector("#formInputMessage"),
  input: document.querySelector("#inputSendMessage"),
  contact_list: document.querySelector("#contactListSection"),
  user_profile: document.querySelector("#userProfile"),

  contact_header: document.querySelector("#contactListHeader"),
};

// Variavel para receber o input do isuário
let message = "";
// let contactList = elemento.contact_list.getHTML();
// let main = container.main;

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
  // LImpa a main.

  container.main.classList.toggle("bg-[url(./img/whatsapp_bg.png)]");
  container.main.querySelector("header").classList.toggle("hidden");
  container.main.querySelector("section").classList.toggle("hidden");
  container.main.querySelector("form").classList.toggle("hidden");

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

function createProfilesList(name, image) {
  const profileContainer = document.createElement("div");
  profileContainer.className =
    "flex flex-col items-center transition group-hover:opacity-50 hover:scale-125 hover:cursor-pointer hover:!opacity-100";

  const profileIMG = document.createElement("img");
  profileIMG.className = "size-10 rounded-full shadow-md shadow-gray-400";
  profileIMG.src = image;

  const nome = document.createElement("p");
  nome.innerText = name;

  profileContainer.appendChild(profileIMG);
  profileContainer.appendChild(nome);

  container.change_profile.appendChild(profileContainer);
}

contatos["whats-users"].forEach((item) => {
  createProfilesList(item.nickname, item["profile-image"]);
});

function setProfile() {
  let changeProfile = document.querySelector("#changeProfileContainer");

  changeProfile.childNodes.forEach((item, index) => {
    item.addEventListener("click", () => {
      let profile = contatos["whats-users"].filter(
        (contato) => contato.id === index + 1,
      );

      document.querySelector("#nome").innerText = profile[0].account;

      let phone =
        profile[0].number.slice(0, 2) +
        " " +
        profile[0].number.slice(2, 7) +
        " " +
        profile[0].number.slice(7);
      document.querySelector("#telefone").innerText = `+55 ${phone} `;

      document.querySelector("#profileIMG").src = profile[0]["profile-image"];
      document.querySelector("#userIMG").src = profile[0]["profile-image"];
    });
  });
}

setProfile();
