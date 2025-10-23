// Construtor da data para o método POST da msg

const data = new Date();

console.log(
  data.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
);
