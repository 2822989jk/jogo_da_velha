// Define qual jogador começa
let jogadorAtual = "X";

// Array que representa o tabuleiro (posição 0 a 8)
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

// Indica se o jogo terminou (vitória ou empate)
let fimDeJogo = false;

// Seleciona todas as células do jogo
const celulas = document.querySelectorAll(".celula");

// Seleciona o parágrafo onde será exibida a mensagem
const mensagem = document.getElementById("mensagem");

// Adiciona evento de clique em cada célula
celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    const index = celula.dataset.index; // Pega o índice da célula clicada

    // Só permite jogar se a célula estiver vazia e o jogo não tiver acabado
    if (tabuleiro[index] === "" && !fimDeJogo) {
      tabuleiro[index] = jogadorAtual; // Marca o tabuleiro
      celula.textContent = jogadorAtual; // Exibe na tela

      // Verifica se alguém venceu
      if (verificarVencedor()) {
        mensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
        fimDeJogo = true;
      }
      // Verifica se todas as casas foram preenchidas (empate)
      else if (tabuleiro.every(c => c !== "")) {
        mensagem.textContent = "Empate!";
        fimDeJogo = true;
      }
      // Alterna para o próximo jogador
      else {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
      }
    }
  });
});

// Função que verifica todas as combinações vencedoras
function verificarVencedor() {
  const combinacoes = [
    [0,1,2], [3,4,5], [6,7,8], // Linhas
    [0,3,6], [1,4,7], [2,5,8], // Colunas
    [0,4,8], [2,4,6]           // Diagonais
  ];

  // Verifica cada combinação
  for (let combinacao of combinacoes) {
    const [a, b, c] = combinacao;

    // Se as três posições têm o mesmo valor (e não estão vazias)
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]) {
      // Aplica destaque visual nas células vencedoras
      combinacao.forEach(i => celulas[i].classList.add("vencedor"));
      return true;
    }
  }

  return false;
}

// Função chamada ao clicar no botão "Reiniciar"
function reiniciar() {
  // Reseta o array do tabuleiro para vazio
  tabuleiro = ["", "", "", "", "", "", "", "", ""];

  // Reseta a variável de controle do jogo
  fimDeJogo = false;

  // Reseta o jogador atual para "X" (quem começa)
  jogadorAtual = "X";

  // Limpa o conteúdo de cada célula e remove a classe "vencedor"
  celulas.forEach(celula => {
    celula.textContent = "";
    celula.classList.remove("vencedor");
  });

  // Limpa a mensagem de status
  mensagem.textContent = "";
}
