import Square from "./Square.jsx";

/*
  🧩 Board.jsx
  ------------
  Board is a PRESENTATIONAL component.

  It:
  - Receives data via props
  - Renders Squares
  - Does NOT manage state
  - Does NOT know game rules
*/

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
