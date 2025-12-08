const statusEl = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset");

const state = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  isGameOver: false,
  winner: null
};

const WINNING_LINES = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", onCellClick));
resetBtn.addEventListener("click", resetGame);

function onCellClick(event) {
  if (state.isGameOver) return;
  const index = Number(event.currentTarget.dataset.index);
  if (state.board[index] !== null) return;

  state.board[index] = state.currentPlayer;

  const winner = getWinner(state.board);
  if (winner) {
    state.winner = winner;
    state.isGameOver = true;
  } else if (state.board.every(v => v !== null)) {
    state.isGameOver = true;
  } else {
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  }

  render();
}

function getWinner(board) {
  for (const [a,b,c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function resetGame() {
  state.board = Array(9).fill(null);
  state.currentPlayer = "X";
  state.isGameOver = false;
  state.winner = null;
  render();
}

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = state.board[i] ?? "";
    cell.disabled = state.board[i] !== null || state.isGameOver;
  });

  if (state.winner) {
    statusEl.textContent = `${state.winner} wins! 🎉`;
  } else if (state.isGameOver) {
    statusEl.textContent = "It's a draw. 🤝";
  } else {
    statusEl.textContent = `${state.currentPlayer}'s turn`;
  }
}

render();
