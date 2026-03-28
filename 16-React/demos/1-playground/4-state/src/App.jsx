import { useState } from 'react'
import Counter    from './Counter'
import LikeButton from './LikeButton'

import './App.css'

/*
  App.jsx

  LIFTING STATE UP

  The LikeButton lives in a child component, but the
  count that needs to change lives here in App.

  Why? Because App needs to show the total likes — and
  the total lives in App, not in LikeButton. If the count
  were inside LikeButton, App would have no way to see it.

  The pattern:
    1. State lives in the parent (App)
    2. Parent passes a function down to the child as a prop
    3. Child calls that function when something happens
    4. Parent's state updates — App re-renders
    5. The new count appears on screen

  This is called LIFTING STATE UP — move state to the
  closest parent that needs to know about it.
*/


function App() {
const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    <>
      <h1>State Examples</h1>

      <h2>Simple state — lives inside one component</h2>
      <Counter />

      <h2>State lifted up — child triggers, parent owns</h2>
      <p>Total likes: {likes}</p>
      <LikeButton onLike={handleLike} />
    </>
  )
}

export default App
