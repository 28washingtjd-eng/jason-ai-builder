const choices = ["rock", "paper", "scissors"];

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerChoiceEl = document.getElementById("computerChoice");
const statusEl = document.getElementById("status");
const roundCounterEl = document.getElementById("roundCounter");
const lastResultEl = document.getElementById("lastResult");
const resetBtn = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".choice-btn");

let playerScore = 0;
let computerScore = 0;
let round = 1;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }

  return "computer";
}

function updateScoreboard() {
  playerScoreEl.textContent = String(playerScore);
  computerScoreEl.textContent = String(computerScore);
  roundCounterEl.textContent = String(round);
}

function setStatusColor(winner) {
  if (winner === "player") {
    statusEl.style.color = "#bbf7d0";
    statusEl.style.borderColor = "rgba(34, 197, 94, 0.35)";
    statusEl.style.background = "rgba(34, 197, 94, 0.14)";
  } else if (winner === "computer") {
    statusEl.style.color = "#fecaca";
    statusEl.style.borderColor = "rgba(248, 113, 113, 0.35)";
    statusEl.style.background = "rgba(248, 113, 113, 0.12)";
  } else {
    statusEl.style.color = "#fef3c7";
    statusEl.style.borderColor = "rgba(251, 191, 36, 0.35)";
    statusEl.style.background = "rgba(251, 191, 36, 0.12)";
  }
}

function handleChoice(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  playerChoiceEl.textContent = playerChoice;
  computerChoiceEl.textContent = computerChoice;

  if (winner === "player") {
    playerScore += 1;
    statusEl.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
    lastResultEl.textContent = "Player wins";
  } else if (winner === "computer") {
    computerScore += 1;
    statusEl.textContent = `Computer wins! ${computerChoice} beats ${playerChoice}.`;
    lastResultEl.textContent = "Computer wins";
  } else {
    statusEl.textContent = `It's a draw! Both picked ${playerChoice}.`;
    lastResultEl.textContent = "Draw";
  }

  setStatusColor(winner);
  round += 1;
  updateScoreboard();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    handleChoice(playerChoice);
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  playerChoiceEl.textContent = "Waiting...";
  computerChoiceEl.textContent = "Waiting...";
  statusEl.textContent = "Choose your move to start the round.";
  lastResultEl.textContent = "No results yet";
  statusEl.style.color = "#e9d5ff";
  statusEl.style.borderColor = "rgba(139, 92, 246, 0.28)";
  statusEl.style.background = "rgba(139, 92, 246, 0.12)";
  updateScoreboard();
});

updateScoreboard();
