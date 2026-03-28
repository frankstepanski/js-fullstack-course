/*
  Counter.jsx

  WHAT IS STATE?

  Props are data passed IN from a parent. They never change.
  State is data that lives INSIDE a component and CAN change.

  When state changes, React automatically re-renders the
  component — the screen updates to show the new value.
  You never have to touch the DOM yourself.

  HOW useState WORKS:

    const [count, setCount] = useState(0)
           ↑         ↑                ↑
       the value   the function    starting value
                   to update it

  count    — the current value. Use it in your JSX.
  setCount — the function to change it. Never change
             count directly — always use setCount.
  0        — the initial value when the component first loads.
*/

import { useState } from 'react'

export default function Counter() {

  const [count, setCount] = useState(0);

  /*
    SIMPLE FORM — setCount(count + 1)

    Reads the current value of count and adds 1.
    Fine when you are only calling setCount ONCE
    and not relying on a previous update.
  */

  function handleAdd() {
    setCount(count + 1);
  }

  /*
    CALLBACK FORM — setCount(prev => prev + 1)

    Instead of reading count directly, you pass a function.
    React calls that function with the GUARANTEED latest value
    of state as the argument — called prev by convention.

    Use this when:
      - you call setCount more than once in the same function
      - you need to be sure you're working from the latest value

    prev is just a name — you could call it anything,
    but prev (short for "previous value") is the convention.
  */

  function handleDoubleAdd() {
    setCount(prev => prev + 1);  // runs first  — prev is 0, sets to 1
    setCount(prev => prev + 1);  // runs second — prev is 1, sets to 2
    /*
      If we had used the simple form instead:
        setCount(count + 1)  — count is still 0 here
        setCount(count + 1)  — count is STILL 0 — both set to 1!
      Result: only adds 1, not 2.

      With the callback form, each call receives the result
      of the previous one — so both updates stack correctly.
    */
  }

  function handleReset() {
    setCount(0);  // set state back to the starting value
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleAdd}>Add 1</button>
      <button onClick={handleDoubleAdd}>Add 2</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}


/*
  
  SIMPLE FORM vs CALLBACK FORM — when to use which

  Simple form:    setCount(count + 1)
    Use when you call setCount once and the new value
    does not depend on a previous queued update.

  Callback form:  setCount(prev => prev + 1)
    Use when you call setCount more than once in the
    same function, or when you must guarantee you are
    working from the very latest value of state.

  When in doubt — use the callback form. It is always
  safe. The simple form is just a convenient shorthand.

  THE GOLDEN RULE OF STATE

  Never do this:
    count = count + 1   ❌ directly changing the variable

  Always do this:
   setCount(count + 1)       ✅ simple form — fine for single updates
   setCount(prev => prev + 1) ✅ callback form — safe for all cases

  If you change count directly, React does not know
  anything changed — the screen will not update.
  The setter function is what tells React to re-render.
*/