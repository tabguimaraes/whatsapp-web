// Construtor da data para o método POST da msg

const data = new Date();

console.log(
  data.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
);

const container = {
  receivedMessages: document.querySelectorAll(".receivedMessages div p"),
  sentMessages: document.querySelectorAll(".sentMessages div p"),
};

console.log(container.receivedMessages);

let span = document.createElement("span");

span.innerText = " insert hour";

container.sentMessages[2].appendChild(span);
