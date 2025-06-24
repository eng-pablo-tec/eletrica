let questoes = [];
let perguntaAtual = 0;
let respostaSelecionada = null;

fetch("questoes.json")
  .then((res) => res.json())
  .then((data) => {
    questoes = data;
    mostrarPergunta();
  });

function mostrarPergunta() {
  respostaSelecionada = null;
  const q = questoes[perguntaAtual];
  document.getElementById("comentario").textContent = "";
  document.getElementById("pergunta").textContent = `(${perguntaAtual + 1}) ${
    q.pergunta
  }`;

  const altDiv = document.getElementById("alternativas");
  altDiv.innerHTML = "";

  q.alternativas.forEach((alt, i) => {
    const div = document.createElement("div");
    div.className = "alternativa";
    div.textContent = alt;
    div.addEventListener("click", () => {
      document
        .querySelectorAll(".alternativa")
        .forEach((el) => el.classList.remove("selecionada"));
      div.classList.add("selecionada");
      respostaSelecionada = alt;
    });
    altDiv.appendChild(div);
  });
}

document.getElementById("verificar").addEventListener("click", () => {
  const q = questoes[perguntaAtual];
  if (respostaSelecionada === null) {
    alert("Selecione uma alternativa.");
    return;
  }

  if (respostaSelecionada === q.resposta) {
    document.getElementById("comentario").textContent =
      "✅ Correto! " + q.comentario;
    document.getElementById("comentario").style.color = "green";
  } else {
    document.getElementById("comentario").textContent =
      "❌ Errado. " + q.comentario;
    document.getElementById("comentario").style.color = "red";
  }
});

document.getElementById("proxima").addEventListener("click", () => {
  perguntaAtual++;
  if (perguntaAtual < questoes.length) {
    mostrarPergunta();
  } else {
    document.getElementById("quiz-box").innerHTML = "<h2>Fim do Quiz!</h2>";
  }
});
