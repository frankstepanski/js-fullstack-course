/*
  🧩 SMALL, REUSABLE COMPONENT

  CatCardRow shows ONE label/value pair.

  This demonstrates:
  - Component reuse
  - Separation of concerns
*/

const CatCardRow = (props) => {
    const {label, value} = props;

    return (
      <div className="cat-row">
        <span className="cat-label">{label}</span>
        <span className="cat-value">{value}</span>
      </div>
    );
  };

  export default CatCardRow;