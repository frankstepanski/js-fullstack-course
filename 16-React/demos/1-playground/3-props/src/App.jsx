import Card from './Card'
import './App.css'

/*

  WHAT ARE PROPS?

  Props (short for properties) are how you pass data INTO
  a component from outside. They work exactly like arguments
  to a function — you pass them in, the component uses them.

  Without props, every Card would look identical.
  With props, the same Card component can show different
  content every time you use it.

  Think of a component as a template, and props as the
  variables that fill it in.

  HOW PROPS ARRIVE

  React collects everything you write on the component tag
  and bundles them into one object called props.

  Functions as props are how child components communicate
  back up to the parent. Card cannot change App's data —
  but it CAN call a function that App gave it, and App
  can decide what to do when that happens.
               
*/

function App() {
  
  function handleSelectMaya() {
    alert("You selected Maya");
  }

  function handleSelectRavi() {
    alert("You selected Ravi");
  }

  return (
    <>
         <h1>Student Results</h1>

        <Card
        student={{ name: "Maya", grade: 72 }}
        isActive={true}
        onSelect={handleSelectMaya}
      />

      <Card
        student={{ name: "Ravi", grade: 45 }}
        isActive={true}
        onSelect={handleSelectRavi}
      />

      <Card
        student={{ name: "Sofia", grade: 91 }}
        isActive={false}
        onSelect={() => alert("You selected Sofia")} 
      />
    </>
  )
}

/*
  THE MOST IMPORTANT RULE FOR FUNCTION PROPS

    onSelect={handleSelectMaya}    ✅ passes the function — called on click
    onSelect={handleSelectMaya()}  ❌ calls it immediately on render!

  The () means "call this now". Without () you are passing
  the function itself to be called later. This is one of the
  most common beginner mistakes in React.

  THE COMPONENT TREE

  App
  ├── Card  (student, isActive, onSelect)
  ├── Card  (student, isActive, onSelect)
  └── Card  (student, isActive, onSelect)

  Data flows DOWN:   App passes data to Card via props
  Events flow UP:    Card calls a function App gave it,
                     App decides what to do with it
*/

 export default App