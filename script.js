import { contatos } from "./modulo/contatos.js";
import {
  aside,
  contactList,
  userProfile,
  messageBoard,
} from "./modulo/elementos.js";

let profile;

// Containaer da tela das mensagens

// const container = {
//   messageBoard: document.querySelector("#messageBoard"),
//   receivedMessages: document.querySelectorAll(".receivedMessages div p"),
//   sentMessages: document.querySelectorAll(".sentMessages div p"),
//   contactList: document.querySelector("#contactListContainer"),
//   profile: document.querySelector("#profileContainer"),
//   change_profile: document.querySelector("#changeProfileContainer"),
//   main: document.querySelector("main"),
// };

// Variavel para os elementos do form
// const elemento = {
//   form: document.querySelector("#formInputMessage"),
//   input: document.querySelector("#inputSendMessage"),
//   contact_list: document.querySelector("#contactListSection"),
//   user_profile: document.querySelector("#userProfile"),
//   contact_header: document.querySelector("#contactListHeader"),
//   mensagens: document.querySelector("#mensagens"),
// };

// Variavel para receber o input do isuário
// let message = "";
// let contactList = elemento.contact_list.getHTML();
// let main = container.main;
// let profile;

messageBoard.form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let userInput = messageBoard.input.value;
  if (userInput) {
    createMessage(userInput);
    // Limpa o valor do value após o enter
    messageBoard.input.value = "";
  }
});

contactList.form.addEventListener("submit", (evento) => {
  evento.preventDefault();
});

// Construtor da hora para o método POST da msg
function getHour() {
  const data = new Date().toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return data;
}

// Cria o paragrafo da mensagem, insere a hora em um span e o adiciona no paragrafo, antes de enviar para a função que cria o container da mensagem
function createMessage(mensagem) {
  let createdMessage = document.createElement("p"),
    span = document.createElement("span");

  createdMessage.className = "flex items-end justify-between";

  createdMessage.innerText = mensagem;

  span.className = "pl-16 text-xs";
  span.innerText = `${getHour()}`;

  createdMessage.appendChild(span);

  createContainerSendMessages(createdMessage);
}

// Cria o container que vai armazenar a mensagem digitada
function createContainerSendMessages(mensagem) {
  let containerPrincipal = document.createElement("div"),
    containerSecundario = document.createElement("div");

  containerPrincipal.className =
    "sentMessages col-start-2 col-end-5 overflow-hidden rounded-lg *:bg-[#d9fdd3]";

  containerSecundario.className = "w-fit place-self-end px-5 py-1";

  containerSecundario.appendChild(mensagem);
  containerPrincipal.appendChild(containerSecundario);

  insertMessage(containerPrincipal);
}

//  Insere o container com a msg no local correto dentro do grid Message Board
function insertMessage(mensagem) {
  messageBoard.container.appendChild(mensagem);
}

// Apaga a sessão contactlist para inserir a troca de perfil de usuário (ainda não implementado)
function setContactList() {
  messageBoard.main.classList.remove("bg-[url(./img/whatsapp_bg.png)]");
  messageBoard.main.querySelector("header").classList.add("hidden");
  messageBoard.main.querySelector("section").classList.add("hidden");
  messageBoard.main.querySelector("form").classList.add("hidden");

  contactList.message_header.classList.toggle("hidden");

  // elemento.contact_header.classList.toggle("sticky");
  userProfile.container.classList.toggle("hidden");

  // container.profile.classList.toggle("hidden");
  // container.profile.classList.toggle("flex");

  setProfile();
}

// setContactList();

function setProfile(standart) {
  let contacts;

  if (standart) {
    profile = contatos["whats-users"].filter((contato) => contato.id === 1);
    contacts = profile[0].contacts;
    userProfile.name.innerText = profile[0].account;

    let phone =
      profile[0].number.slice(0, 2) +
      " " +
      profile[0].number.slice(2, 7) +
      " " +
      profile[0].number.slice(7);
    userProfile.number.innerText = `+55 ${phone} `;

    userProfile.profile_img.src = profile[0]["profile-image"];
    aside.user_avatar_img.src = profile[0]["profile-image"];

    loadContactListMessages(contacts);
    return contacts;
  } else {
    userProfile.profiles_list.childNodes.forEach((item, index) => {
      item.addEventListener("click", () => {
        profile = contatos["whats-users"].filter(
          (contato) => contato.id === index + 1,
        );

        contacts = profile[0].contacts;
        userProfile.name.innerText = profile[0].account;

        let phone =
          profile[0].number.slice(0, 2) +
          " " +
          profile[0].number.slice(2, 7) +
          " " +
          profile[0].number.slice(7);
        userProfile.number.innerText = `+55 ${phone} `;

        userProfile.profile_img.src = profile[0]["profile-image"];
        aside.user_avatar_img.src = profile[0]["profile-image"];
        // console.log(profile[0]);
        loadContactListMessages(contacts);
        return (contacts, profile[0]);
      });
    });
  }
}

setProfile("perfil1");

// Função está trazendo as mensagens dos contatos de cada perfil corretamente.
function loadContactListMessages(contacts) {
  container.contactList.innerHTML = "";
  contacts.forEach((item, index) => {
    let containerPrincipal = document.createElement("div");
    containerPrincipal.className =
      "contactItem grid cursor-pointer grid-cols-[50px_1fr_40px] gap-2 p-4";

    let imgContato = document.createElement("img");
    imgContato.className = "rounded-full size-12";
    imgContato.src = `https://i.pravatar.cc/${Math.floor(Math.random() * 70)}`;

    let containerSecundario = document.createElement("div");
    containerSecundario.className = "flex flex-col overflow-hidden";

    let contato = document.createElement("p");
    contato.className = "contato truncate";

    let content = document.createElement("p");
    content.className = "text-[#00000099] truncate";

    containerSecundario.append(contato, content);

    let containerHoraEMensagens = document.createElement("div");
    containerHoraEMensagens.className = "flex flex-col items-end";

    let horas = document.createElement("p");
    horas.className = "text-[#1DAA61]";

    let mensagens = document.createElement("p");
    mensagens.className =
      "size-8 flex justify-center items-center rounded-full bg-[#1DAA61] text-white";

    containerHoraEMensagens.append(horas, mensagens);

    contato.innerText = item.name;
    content.innerText = item.messages[item.messages.length - 1].content;

    horas.innerText = item.messages[item.messages.length - 1].time;

    mensagens.innerText = item.messages.length;

    containerPrincipal.append(
      imgContato,
      containerSecundario,
      containerHoraEMensagens,
    );
    container.contactList.append(containerPrincipal);

    // Ultima mensagem enviada / recebida
    // console.log(item.messages[item.messages.length - 1]);

    // Busca de todoas as mensagens do contato
    // item.messages.forEach((mensagem) => {
    //   console.log(mensagem);
    //   // console.log(mensagem.content);
    // });
  });
}

/* 

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
function setContactList() {
  container.main.classList.remove("bg-[url(./img/whatsapp_bg.png)]");
  container.main.querySelector("header").classList.add("hidden");
  container.main.querySelector("section").classList.add("hidden");
  container.main.querySelector("form").classList.add("hidden");

  container.contactList.classList.toggle("hidden");

  elemento.contact_header.classList.toggle("sticky");
  elemento.contact_header.classList.toggle("hidden");

  container.profile.classList.toggle("hidden");
  container.profile.classList.toggle("flex");

  setProfile();
}

elemento.mensagens.addEventListener("click", setContactList);
elemento.user_profile.addEventListener("click", setContactList);

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

function setProfile(standart) {
  let changeProfile = document.querySelector("#changeProfileContainer");

  let contacts;

  if (standart) {
    profile = contatos["whats-users"].filter((contato) => contato.id === 1);
    contacts = profile[0].contacts;
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

    loadContactListMessages(contacts);
    return contacts;
  } else {
    changeProfile.childNodes.forEach((item, index) => {
      item.addEventListener("click", () => {
        profile = contatos["whats-users"].filter(
          (contato) => contato.id === index + 1,
        );

        contacts = profile[0].contacts;
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
        // console.log(profile[0]);
        loadContactListMessages(contacts);
        return (contacts, profile[0]);
      });
    });
  }
}

setProfile("perfil1");

// Função está trazendo as mensagens dos contatos de cada perfil corretamente.
function loadContactListMessages(contacts) {
  container.contactList.innerHTML = "";
  contacts.forEach((item, index) => {
    // console.log(item.name);

    // console.log(item.messages.length);

    let containerPrincipal = document.createElement("div");
    containerPrincipal.className =
      "contactItem grid cursor-pointer grid-cols-[50px_1fr_40px] gap-2 p-4";

    let imgContato = document.createElement("img");
    imgContato.className = "rounded-full size-12";
    imgContato.src = `https://i.pravatar.cc/${Math.floor(Math.random() * 70)}`;

    let containerSecundario = document.createElement("div");
    containerSecundario.className = "flex flex-col overflow-hidden";

    let contato = document.createElement("p");
    contato.className = "contato truncate";

    let content = document.createElement("p");
    content.className = "text-[#00000099] truncate";

    containerSecundario.append(contato, content);

    let containerHoraEMensagens = document.createElement("div");
    containerHoraEMensagens.className = "flex flex-col items-end";

    let horas = document.createElement("p");
    horas.className = "text-[#1DAA61]";

    let mensagens = document.createElement("p");
    mensagens.className =
      "size-8 flex justify-center items-center rounded-full bg-[#1DAA61] text-white";

    containerHoraEMensagens.append(horas, mensagens);

    contato.innerText = item.name;
    content.innerText = item.messages[item.messages.length - 1].content;

    horas.innerText = item.messages[item.messages.length - 1].time;

    mensagens.innerText = item.messages.length;

    containerPrincipal.append(
      imgContato,
      containerSecundario,
      containerHoraEMensagens,
    );
    container.contactList.append(containerPrincipal);

    // Ultima mensagem enviada / recebida
    // console.log(item.messages[item.messages.length - 1]);

    // Busca de todoas as mensagens do contato
    // item.messages.forEach((mensagem) => {
    //   console.log(mensagem);
    //   // console.log(mensagem.content);
    // });
  });
}

let id;

container.change_profile.childNodes.forEach((item, index) => {
  item.addEventListener("click", () => {
    id = index + 1;
    // console.log(id);
  });
});

// Função que recebe o id e busca as mensagens. Incluir ela na função que captura o click no perfil desejado
function getMessages(id) {
  let usuario = contatos["whats-users"].find((contato) => contato.id === id);

  console.log(usuario.contacts);

  return usuario.contacts;
}

getMessages(1);


*/
