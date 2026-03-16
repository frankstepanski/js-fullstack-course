import { useState } from "react";
import Board from "./Board.jsx";
import { calculateWinner } from "../utils/helpers.js";

/*
  🎮 GAME COMPONENT
  -----------------
  This component controls:
  - Game state (board + turn)
  - Game rules (winner, tie)
  - What message to show the player

  Think of Game as the "brain" of the app.
*/


const Game = () => {

/*
    🧠 STATE
    --------
    board:
      - Array of 9 values (null, "X", or "O")
      - Represents the 3x3 grid

    xIsNext:
      - true  → X's turn
      - false → O's turn
  */

    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

  /*
    🏆 GAME RESULT
    -------------
    calculateWinner returns:
    - "X" if X won
    - "O" if O won
    - null if no winner yet
   */
    const winner = calculateWinner(board)

    /*
    🤝 TIE CHECK
    ------------
    A tie happens when:
    - There is NO winner
    - All squares are filled (no nulls left)
   */

    const isTie = !winner && board.every(square => square !== null);

    /*
    ✋ HANDLE CLICK
    --------------
    Called when a square is clicked.

    We prevent clicking if:
    - The game already has a winner
    - The game is a tie
    - The square is already filled
  */


   const handleClick = (index) => {
    if (winner || isTie || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  /*
    📝 STATUS MESSAGE
        ----------------
        We compute this BEFORE JSX
        to keep rendering clean and readable.
  */
  let statusMessage;

  if (winner) {
    statusMessage = `Winner: ${winner} 🎉`;
  } else if (isTie) {
    statusMessage = "It's a tie 🤝";
  } else {
    statusMessage = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  /*
    🔄 RESET GAME
    -------------
    Clears the board and starts over.
  */

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

      return (
    <>
      {/* GAME BOARD */}
      <Board squares={board} onClick={handleClick} />

      {/* GAME CONTROLS */}
      <div className="game-controls">
        <button onClick={resetGame}>
          Start New Game
        </button>

        <p>{statusMessage}</p>
      </div>
    </>
  );
};

export default Game;