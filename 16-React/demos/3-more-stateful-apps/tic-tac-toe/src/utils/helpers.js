/*
  🏆 calculateGameResult
  ---------------------
  Determines the outcome of the game.

  Returns:
  - "X" → Player X wins
  - "O" → Player O wins
  - "TIE" → Board is full, no winner
  - null → Game still in progress
*/

export function calculateWinner(squares) {

 /*
    🧩 All possible winning combinations

    Each array represents 3 positions on the board
    that form a straight line (row, column, or diagonal).

    Board positions:
      0 | 1 | 2
      ---------
      3 | 4 | 5
      ---------
      6 | 7 | 8
  */

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of winningLines) {

    /*
      🧠 Array destructuring

      This pulls out the three positions
      from the current winning line.

      Example:
        line = [0, 1, 2]
        a = 0, b = 1, c = 2
    */

    const [a, b, c] = line;

    /*
      ✅ WINNING CHECK

      1️⃣ squares[a] ensures the square is NOT null
         (we don't want empty squares to count)

      2️⃣ squares[a] === squares[b]
         checks the first and second squares match

      3️⃣ squares[a] === squares[c]
         checks the first and third squares match

      If ALL three are true,
      then either "X" or "O" has won.
    */

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {

      /*
        🏁 Winner found!

        Return "X" or "O"
        and stop checking further lines.
      */

      return squares[a];
    }
  }

  /*
    🤝 TIE CHECK

    If:
    - There is NO winner
    - AND every square is filled (not null)

    Then the game is a tie.
  */
  const isBoardFull = squares.every(square => square !== null);

  if (isBoardFull) {
    return "TIE";
  }

  // ⏳ Game still in progress
  return null;
}
