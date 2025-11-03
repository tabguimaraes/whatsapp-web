import { contatos } from "./modulo/contatos.js";
import {
  aside,
  contactList,
  userProfile,
  messageBoard,
} from "./modulo/elementos.js";

let profile, contacts;

messageBoard.form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let userInput = messageBoard.input.value;
  if (userInput) {
    createMessage(userInput, "me");
    // Limpa o valor do value após o enter
    messageBoard.input.value = "";
  }
});

contactList.form.addEventListener("submit", (evento) => {
  evento.preventDefault();
});

aside.user_profile_button.addEventListener("click", setContactList);

aside.message_button.addEventListener("click", setContactList);

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
function createMessage(mensagem, sender, hour) {
  let createdMessage = document.createElement("p"),
    span = document.createElement("span");

  createdMessage.className = "flex items-end justify-between";

  createdMessage.innerText = mensagem;

  span.className = "pl-16 text-xs";

  if (hour) {
    span.innerText = `${hour}`;
  } else {
    span.innerText = `${getHour()}`;
  }

  createdMessage.appendChild(span);

  createContainerSendMessages(createdMessage, sender);
}

// Cria o container que vai armazenar a mensagem digitada
function createContainerSendMessages(mensagem, sender) {
  let mainContainer = document.createElement("div"),
    subContainer = document.createElement("div");

  if (sender !== "me") {
    mainContainer.className =
      "received-message-container col-start-1 col-end-4 w-fit rounded-lg bg-white";
    subContainer.className = "place-self-start px-5 py-1";
  } else {
    mainContainer.className =
      "sent-message-container col-start-2 col-end-5 overflow-hidden";

    subContainer.className =
      "w-fit place-self-end px-5 py-1 bg-[#d9fdd3] rounded-lg";
  }

  subContainer.appendChild(mensagem);
  mainContainer.appendChild(subContainer);

  insertMessage(mainContainer);
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
  contactList.message_header.classList.toggle("sticky");
  contactList.container.classList.toggle("hidden");

  userProfile.container.classList.toggle("hidden");
  userProfile.container.classList.toggle("flex");

  setProfile();
}

// setContactList();

// Função para inserir os dados do perfil selecionado
function setProfile(standart) {
  if (standart) {
    profile = contatos["whats-users"].filter((contato) => contato.id === 1);
    contacts = profile[0].contacts;
    userProfile.name.innerText = profile[0].account;
    getContacts(profile[0].id);
    let phone =
      profile[0].number.slice(0, 2) +
      " " +
      profile[0].number.slice(2, 7) +
      " " +
      profile[0].number.slice(7);
    userProfile.number.innerText = `+55 ${phone} `;

    userProfile.profile_img.src = profile[0]["profile-image"];
    aside.user_avatar_img.src = profile[0]["profile-image"];

    reloadContacts();

    return contacts;
  } else {
    userProfile.profiles_list.childNodes.forEach((item, index) => {
      item.addEventListener("click", () => {
        profile = contatos["whats-users"].filter(
          (contato) => contato.id === index + 1,
        );

        getContacts(profile[0].id);
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

        reloadContacts();
        return (contacts, profile[0]);
      });
    });
  }
}

setProfile("perfil1");

// Função para inserir os perfis na seção "Trocar Perfil"
function insertProfiles(nickname, img, id) {
  const container = document.createElement("div"),
    avatar = document.createElement("img"),
    name = document.createElement("p");

  container.className =
    "flex flex-col items-center transition group-hover:opacity-50 hover:scale-125 hover:cursor-pointer hover:!opacity-100";

  container.id = id;

  avatar.className = "size-10 rounded-full shadow-md shadow-gray-400";

  name.innerText = nickname;

  avatar.src = img;

  container.append(avatar, name);

  userProfile.profiles_list.append(container);
}

// Função para carregar todos os perfis
function loadProfiles() {
  let dados = {
    avatar: "",
    nickname: "",
    id: "",
  };

  contatos["whats-users"].forEach((perfil) => {
    dados.nickname = perfil.nickname;
    dados.avatar = perfil["profile-image"];
    dados.id = `${perfil.id}`;

    insertProfiles(dados.nickname, dados.avatar, dados.id);
  });
}

loadProfiles();

// Função para obter todos os contatos de um perfil
function getContacts(id) {
  contatos["whats-users"].find((user) => {
    if (user.id == id) {
      createContactContainer(user.contacts);
    }
  });
}

// Função que cria o container de mensagens recebidas pelo usuário com base no objeto enviado pela função getContacts()

function createContactContainer(contacts) {
  contactList.container.innerHTML = "";

  contacts.forEach((item, index) => {
    let mainContainer = document.createElement("div"),
      imgContato = document.createElement("img"),
      subContainer = document.createElement("div"),
      contato = document.createElement("p"),
      content = document.createElement("p"),
      containerHoraEMensagens = document.createElement("div"),
      horas = document.createElement("p"),
      mensagens = document.createElement("p");

    mainContainer.className =
      "contactItem grid cursor-pointer grid-cols-[50px_1fr_40px] gap-2 p-4";

    mainContainer.id = `${index}`;
    imgContato.className = "rounded-full size-12";
    imgContato.src = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;

    subContainer.className = "flex flex-col overflow-hidden";

    contato.className = "contato truncate";

    content.className = "text-[#00000099] truncate";

    subContainer.append(contato, content);

    containerHoraEMensagens.className = "flex flex-col items-end";

    horas.className = "text-[#1DAA61]";

    mensagens.className =
      "size-8 flex justify-center items-center rounded-full bg-[#1DAA61] text-white";

    containerHoraEMensagens.append(horas, mensagens);

    contato.innerText = item.name;
    content.innerText = item.messages[item.messages.length - 1].content;

    horas.innerText = item.messages[item.messages.length - 1].time;

    mensagens.innerText = item.messages.length;

    mainContainer.append(imgContato, subContainer, containerHoraEMensagens);
    contactList.container.append(mainContainer);
  });
}

// Faz o reload da lista de contatos e captura o click em cada usuário da lista, individualmente
function reloadContacts() {
  const mensagens = document.querySelectorAll(".contactItem ");

  mensagens.forEach((item, index) => {
    item.addEventListener("click", () => {
      let avatar = item.firstChild.src;

      // com base em contacts[index] é possivel preencher o header da lista de mensagens
      createMessageBoard(contacts[index], avatar);
    });
  });
}

function createMessageBoard(contactMessages, avatar) {
  let messagesList = contactMessages.messages;

  messageBoard.main.classList.add("bg-[url(./img/whatsapp_bg.png)]");
  messageBoard.main.querySelector("header").classList.remove("hidden");
  messageBoard.main.querySelector("section").classList.remove("hidden");
  messageBoard.main.querySelector("form").classList.remove("hidden");

  messageBoard.contact_name.innerText = contactMessages.name;
  messageBoard.contact_avatar.src = avatar;

  insertMessages(messagesList);
}

function insertMessages(messagesList) {
  let mensagens = messagesList;

  messageBoard.container.innerHTML = "";

  mensagens.forEach((item) => {
    createMessage(item.content, item.sender, item.time);
  });
}

// Limpa a messageBoard no carregamento inicial da página
messageBoard.main.classList.remove("bg-[url(./img/whatsapp_bg.png)]");
messageBoard.main.querySelector("header").classList.add("hidden");
messageBoard.main.querySelector("section").classList.add("hidden");
messageBoard.main.querySelector("form").classList.add("hidden");
