
/*
  Card.jsx

  PROPS THIS COMPONENT RECEIVES:

    student    object    — { name, grade }
    isActive   boolean   — is the student enrolled?
    onSelect   function  — called when the button is clicked

  The parent (App) owns the data and owns the function.
  Card just receives them and uses them.
*/


function Card({ student, isActive, onSelect }) {
  return (
    <div>

      <h2>{student.name}</h2>
      <p>Grade: {student.grade}%</p>
      <p>Result: {student.grade >= 50 ? "pass" : "fail"}</p>

      <p>{isActive ? "Currently enrolled" : "No longer enrolled"}</p>

      <button onClick={onSelect}>Select {student.name}</button>

    </div>
  )
}

export default Card;
