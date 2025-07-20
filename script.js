let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let fimDeJogo = false;

const celulas = document.querySelectorAll(".celula");
const mensagem = document.getElementById("mensagem");

celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    const index = celula.dataset.index;

    if (tabuleiro[index] === "" && !fimDeJogo) {
      tabuleiro[index] = jogadorAtual;
      celula.textContent = jogadorAtual;

      if (verificarVencedor()) {
        mensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
        fimDeJogo = true;
      } else if (tabuleiro.every(c => c !== "")) {
        mensagem.textContent = "Empate!";
        fimDeJogo = true;
      } else {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
      }
    }
  });
});

function verificarVencedor() {
  const combinacoes = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // colunas
    [0,4,8], [2,4,6]           // diagonais
  ];

  return combinacoes.some(combinacao => {
    const [a, b, c] = combinacao;
    return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c];
  });
}

function reiniciar() {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  jogadorAtual = "X";
  fimDeJogo = false;
  mensagem.textContent = "";
  celulas.forEach(celula => celula.textContent = "");
}
