/*
  🧩 WordItem.jsx
  --------------
  A PRESENTATIONAL component.

  Responsibilities:
  - Receive a word via props
  - Display it with styling

  This component:
  ❌ Does NOT use state
  ❌ Does NOT change data
*/

export default function WordItem({ word }) {
  return <div className="word-item">{word}</div>;
}
