import './App.css'

/* ─────────────────────────────────────────────────
   ZONE A — outside the component function

  Runs ONCE when the file is first loaded. Never runs again,
  no matter how many times the component re-renders.

  Put here:
    - fixed data that never changes (arrays, objects, constants)
    - helper functions that don't need anything from inside React

  Do NOT put here:
    - anything that should update or change over time
    - anything that depends on state or props (those don't exist yet)
  ───────────────────────────────────────────────── */

const student = {
  name: "Maya",
  grade: 72,
};

const students = [
  { id: 1, name: "Maya",  grade: 72 },
  { id: 2, name: "Ravi",  grade: 45 },
  { id: 3, name: "Sofia", grade: 91 },
];

// helper — defined once, reused anywhere
function getLabel(grade) {          
  if (grade >= 70) return "distinction";
  if (grade >= 50) return "pass";
  return "fail";
}

function App() {

  /* ───────────────────────────────────────────────
     ZONE B — inside the component, before the return
   
     This code runs EVERY TIME the component renders.
     Use it for anything that needs to be calculated fresh each time.
   
     Full JavaScript is allowed here — if, for, const, anything.
  // Do your logic here, then pass the results into JSX below.
     ─────────────────────────────────────────────── */

  const luckyNumber = Math.floor(Math.random() * 100);
  const label       = getLabel(student.grade);
  const isPass      = student.grade >= 50;

  return (
   
      <div>
   
     {/* ───────────────────────────────────────────────────────────
       ZONE C — inside { } in the JSX

        EXPRESSIONS ONLY.

        The difference between an expression and a statement:

        An EXPRESSION produces a value — something is left over
        when it finishes that JavaScript can use or display.

        A STATEMENT does something (loops, branches, declares)
        but leaves nothing behind. There is no value to render.

        ✅ allowed — these all produce a value:
          {name}                    variable
          {2 + 2}                   maths
          {name.toUpperCase()}      method call
          {isPass ? "y" : "n"}      ternary
          {isPass && ... }          
        ❌ not allowed — these are statements, no value:
          {if (x) { ... }}
          {for (let i...) { ... }}
          {const x = 5}
    ─────────────────────────────────────────────────────────── */}
     
      <h1>{student.name}</h1>                             

      <p>Grade: {student.grade}%</p>
      <p>Result: {label}</p>                             

      <p>As decimal: {(student.grade / 100).toFixed(2)}</p>

      <p>Lucky number: {luckyNumber}</p>                 

      {isPass && <p>Well done — you passed!</p>}        

      {!isPass && <p>See me after class.</p>}            

      <p>{student.grade >= 50 ? "pass" : "fail"}</p>     

      {/* .map() is an expression — returns an array of JSX elements */}
      {students.map((s) => (
        <p key={s.id}>
          {s.name}: {s.grade}% — {getLabel(s.grade)}   
        </p>
      ))}

   </div>

  )
}

export default App

/*
  ZONE D — where to look when things go wrong

  There are THREE places errors can appear. Each one means
  something different. Do not stare at the wrong screen.

  ─── 1. THE TERMINAL ───────────────────────────────────────
  This is where your build tool runs (Vite).
  Errors here mean the file could not even be compiled —
  usually a syntax error so broken that JavaScript could not
  parse the file at all.
  You will see these BEFORE the browser loads anything.

  Example terminal errors:
    SyntaxError: Unexpected token        ← broken JSX syntax
    Cannot find module './App'           ← wrong file path in import

  ─── 2. THE BROWSER CONSOLE (F12 → Console) ────────────────
  This is where almost all React and JSX errors appear.
  Open it with F12, then click the Console tab.
  Errors here happen at RUNTIME — the code compiled fine
  but something went wrong when it actually ran.

  Common browser console errors in React:

    "Each child in a list should have a unique key prop"
    → you forgot to add key={} to each item in a .map()

    "Cannot read properties of undefined (reading 'name')"
    → you tried to access .name on something that doesn't exist

    "X is not a function"
    → you called something as a function but it isn't one

    "Objects are not valid as a React child"
    → you tried to render a whole object {} in JSX instead
      of a specific value from it like {student.name}

  ─── 3. THE RED BROWSER OVERLAY ────────────────────────────
  In development, React sometimes throws a full-screen red
  error overlay on top of your app. This is React being
  helpful — it means something crashed during render.

  Do not panic. It is not permanent.
    - The detail is always in the browser console underneath
    - It disappears the moment you fix the code
    - It only appears in development, never in production

  ─── THE ONE RULE TO REMEMBER ──────────────────────────────
  Terminal  →  build errors  (file could not compile)
  Browser console  →  everything else
*/ 