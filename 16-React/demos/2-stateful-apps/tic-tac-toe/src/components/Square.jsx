
/*
  🔲 Square.jsx
  -------------
  The smallest and simplest component.

  - Displays ONE square
  - Receives value ("X", "O", or null)
  - Not aware of the game
*/
  

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;