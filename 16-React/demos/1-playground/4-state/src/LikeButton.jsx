
/*
  LikeButton.jsx

  This component receives onLike as a prop — a function
  defined in the parent (App). When the button is clicked,
  it calls that function. The child triggers the event,
  the parent decides what to do with it.

  The child does NOT own the count. It has no state.
  It just has a button and a function to call.
*/

export default function LikeButton({ onLike }) {
  return (
    <button onClick={onLike}>
      Like
    </button>
  );
}