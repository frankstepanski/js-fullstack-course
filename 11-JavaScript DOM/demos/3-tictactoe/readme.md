## Building a Tic-Tac-Toe Game (Step-by-Step)

Learning to code isn’t just about memorizing syntax — it’s about *building things*. One of the best ways to see how far you’ve come as a web developer is by creating something interactive that combines **HTML**, **CSS**, **JavaScript**, and the **DOM API**. Building a simple game like **Tic-Tac-Toe** helps you connect everything you’ve learned so far into a working, visual project.

This project strengthens your understanding of **layout (CSS Grid)**, **logic (JavaScript)**, and **user interaction (DOM events)**. It also challenges your creativity and problem-solving skills as you translate abstract game rules into step-by-step logic that a computer can follow.

By completing this, you’ll have a small but complete web application — something that reacts to user actions, updates dynamically, and represents real-world software development patterns in miniature.

### What the Game Should Do (Functionality)

- Two players: **X** and **O**, taking turns.  
- A **3×3 grid** where players click an empty cell to place their mark.  
- The game checks for a **winner** after each move:
  - A winner is any row, column, or diagonal with the **same mark**.  
- If all 9 cells are filled without a winner, it’s a **draw**.  
- A **status message** shows whose turn it is or who won.  
- A **Reset** button clears the board and starts a new game.

### How We’ll Build the Interface (Board, Cells, Layout)

- **HTML**:  
  Create a container with a status area, a 3×3 board, and a Reset button.

- **CSS**:  
  Use **CSS Grid** to create the 3×3 layout and style the buttons as squares.

- **JavaScript**:  
  Use an array to store cell states, listen for clicks, check for winners, and update the UI.

```
[ Status: X's turn ]
[ 0 ][ 1 ][ 2 ]
[ 3 ][ 4 ][ 5 ]
[ 6 ][ 7 ][ 8 ]
[  Reset  ]
```

Each cell corresponds to an index in the JavaScript array.

### High-Level Flow (How It Works) 

Before wiring up buttons and click handlers, it’s vital to understand **state**. In programming, **state** is the current data that describes “what is true *right now*” in your app. Your UI (what you see on screen) should reflect this state.

For Tic-Tac-Toe, the **state** includes at least:
- `board` — an array of 9 values representing each cell: `null`, `"X"`, or `"O"`  
- `currentPlayer` — whose turn it is: `"X"` or `"O"`  
- `isGameOver` — a boolean that signals when the game has ended  
- `winner` — `null`, `"X"`, or `"O"` (optional but handy)

Think of state as the **single source of truth**. You change the state first, and then update the UI to match it. Avoid using the DOM (button text, etc.) as your main source of truth — that leads to bugs. Instead, *render the UI from state*.

### A. A Simple State Object

```js
const state = {
  board: Array(9).fill(null), // [null, null, ..., null]
  currentPlayer: "X",
  isGameOver: false,
  winner: null
};
```

### B. State Transitions (How State Changes Over Time)

A **state transition** is when your app moves from one state to another because of an action. Example transitions in our game:

1. **Game starts** → `currentPlayer = "X", board all nulls`  
2. **Player clicks a cell** → store `"X"` at that cell’s index  
3. **Check for winner/draw** → update `winner` or `isGameOver` if needed  
4. **No winner yet** → switch turn to `"O"`  
5. **Reset** → return to the initial state

Imagine these as steps in a timeline where each action produces a new version of state.

### C. Rendering UI From State

A helpful mental model is: **state → render UI**.

- On each move, update the `state.board` **first**, then set the cell’s `.textContent` to match.  
- The status text (“X’s turn”, “O wins!”, etc.) should be derived from state (`currentPlayer`, `winner`, `isGameOver`).

```js
function render() {
  cells.forEach((cell, i) => {
    cell.textContent = state.board[i] ?? "";
    cell.disabled = state.board[i] !== null || state.isGameOver;
  });

  if (state.winner) {
    statusEl.textContent = `${state.winner} wins! 🎉`;
  } else if (state.isGameOver) {
    statusEl.textContent = "It's a draw. 🤝";
  } else {
    statusEl.textContent = `${state.currentPlayer}'s turn`;
  }
}
```

> **Why this matters:** When the UI is always derived from state, it’s much easier to reason about your app. You won’t forget to update some label or re-enable a button; the `render()` function updates everything in one place based on the latest state.

### D. Typical High-Level Flow

1. **Initialize state** and run `render()`.  
2. **On cell click:**  
   - If the cell is empty and the game isn’t over:  
     - Update `state.board[index]` with `"X"` or `"O"`.  
     - Check for a winner or draw → update `state.winner` / `state.isGameOver`.  
     - If no winner, switch `state.currentPlayer`.  
   - Call `render()` to reflect the new state on screen.  
3. **On reset:**  
   - Put `state` back to its initial values.  
   - Call `render()` again.

### E. Common State Pitfalls 

| Pitfall | Why it happens | Fix |
|---|---|---|
| Using the DOM as state | You read button text to decide logic | Keep a separate `state` object/variables and render from it |
| Updating UI but not state | Works once, breaks later | Always update `state` *first*, then UI |
| Multiple sources of truth | You track turns in two places | Centralize in one `state` |
| Forgetting to re-render | UI doesn’t match state | Call `render()` after each state change |

> **Pro Tip:** Even without frameworks like React, thinking in terms of **state + render** will make your JavaScript code cleaner, more predictable, and easier to debug.

### Step-by-Step Implementation

### A) HTML

```html
<div class="game">
  <h2 id="status">X's turn</h2>

  <div id="board" class="board">
    <button class="cell" data-index="0"></button>
    <button class="cell" data-index="1"></button>
    <button class="cell" data-index="2"></button>
    <button class="cell" data-index="3"></button>
    <button class="cell" data-index="4"></button>
    <button class="cell" data-index="5"></button>
    <button class="cell" data-index="6"></button>
    <button class="cell" data-index="7"></button>
    <button class="cell" data-index="8"></button>
  </div>

  <button id="reset">Reset</button>
</div>
```

### B) CSS

```css
.game {
  font-family: system-ui, Arial, sans-serif;
  max-width: 320px;
  margin: 24px auto;
  text-align: center;
}

.board {
  margin: 16px auto;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 8px;
}

.cell {
  width: 100px;
  height: 100px;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #333;
  background: #fafafa;
}

.cell:disabled {
  cursor: default;
  background: #eee;
  color: #444;
}

#reset {
  margin-top: 12px;
  padding: 8px 12px;
  font-size: 1rem;
}
```

### C) JavaScript

```html
<script>
  const statusEl = document.getElementById("status");
  const cells = document.querySelectorAll(".cell");
  const resetBtn = document.getElementById("reset");

  const state = {
    board: Array(9).fill(null),
    currentPlayer: "X",
    isGameOver: false,
    winner: null
  };

  const WINNING_LINES = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  cells.forEach(cell => cell.addEventListener("click", onCellClick));
  resetBtn.addEventListener("click", resetGame);

  function onCellClick(event) {
    if (state.isGameOver) return;
    const index = Number(event.currentTarget.dataset.index);
    if (state.board[index] !== null) return;

    state.board[index] = state.currentPlayer;

    const winner = getWinner(state.board);
    if (winner) {
      state.winner = winner;
      state.isGameOver = true;
    } else if (state.board.every(v => v !== null)) {
      state.isGameOver = true;
    } else {
      state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
    }

    render();
  }

  function getWinner(board) {
    for (const [a,b,c] of WINNING_LINES) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function resetGame() {
    state.board = Array(9).fill(null);
    state.currentPlayer = "X";
    state.isGameOver = false;
    state.winner = null;
    render();
  }

  function render() {
    cells.forEach((cell, i) => {
      cell.textContent = state.board[i] ?? "";
      cell.disabled = state.board[i] !== null || state.isGameOver;
    });

    if (state.winner) {
      statusEl.textContent = `${state.winner} wins! 🎉`;
    } else if (state.isGameOver) {
      statusEl.textContent = "It's a draw. 🤝";
    } else {
      statusEl.textContent = `${state.currentPlayer}'s turn`;
    }
  }

  render();
</script>
```

### Key Ideas Explained

- **Winning Combinations**: Predefined sets of 3 cells that make a win.  
- **Mapping Clicks**: Each cell’s `data-index` links to its position in the array.  
- **Checking Winner**: Compare 3 cells in every combination.  
- **Switching Turns**: Toggle between X and O each move.  
- **Draws**: When all cells are filled and no winner is found.


### Common Mistakes & Pro Tips

| Mistake | Fix |
|----------|-----|
| Using the DOM as state | Keep a separate `state` object and render from it |
| Forgetting to check for game over | Add `if (state.isGameOver) return;` early |
| Not disabling used cells | Use `cell.disabled = true` or derive from `state` in `render()` |
| UI not matching logic | Always `render()` after changing state |

**Pro Tips:**  
- Centralize logic around the `state` object.  
- Keep `render()` small and predictable.  
- Log `state` after actions to debug quickly.


### Referencing Cells with `data-*` Attributes (and Alternatives)

When we built Tic‑Tac‑Toe, we used a custom HTML attribute like `data-index="4"` on each cell. Those are called **data attributes**. They’re a standardized way to attach small bits of **custom, page‑specific data** to DOM elements without inventing non‑standard attributes.

---

### A) What are `data-*` attributes? Why use them here?

**Definition:** Any attribute that starts with `data-` (e.g., `data-id`, `data-name`, `data-index`) is a valid, semantic‑safe place to store **custom data** on an element. In JavaScript, you can read them via the **`dataset`** API:

```html
<button class="cell" data-index="4"></button>
```

```js
const cell = document.querySelector('.cell');
console.log(cell.dataset.index); // "4"   (string)
```

**Why they’re helpful in Tic‑Tac‑Toe:**  
- Each visible cell maps to a position in your **game state** (`board[0..8]`).  
- By putting `data-index="0..8"` on each button, you can **quickly resolve** “which cell was clicked?” to the **matching index in state**.  
- It keeps your HTML and JavaScript **loosely coupled**: the HTML declares *what* each cell represents; your JS reads it and updates state accordingly.  
- It’s **framework‑agnostic** and easy to read for beginners.

**Note:** Values read from `dataset` are strings. Convert to numbers when needed:
```js
const index = Number(event.currentTarget.dataset.index);
```

---

### B) The pattern we used (recap)

```html
<div id="board" class="board">
  <button class="cell" data-index="0"></button>
  <button class="cell" data-index="1"></button>
  <button class="cell" data-index="2"></button>
  <!-- ... -->
</div>
```

```js
cells.forEach(cell => cell.addEventListener('click', onCellClick));

function onCellClick(e) {
  const index = Number(e.currentTarget.dataset.index); // ← bridge to state
  // use index to update state.board[index] ...
}
```

This is simple, explicit, and scales well when elements might be **reordered** in the DOM (the mapping lives on the element itself).

### C) Alternatives to `data-*` (pros, cons, examples)

There are several other valid ways to map a DOM element to your **board index**. Use whichever fits your app’s structure and team conventions.

### 1) Derive the index from the NodeList order
If your DOM order **exactly matches** your board order, you can compute the index from the event target’s position in the NodeList.

```js
const cells = document.querySelectorAll('.cell');

function onCellClick(e) {
  const list = Array.from(cells);
  const index = list.indexOf(e.currentTarget); // 0..8
  // update state.board[index] ...
}
```

**Pros:** No extra HTML attributes.  
**Cons:** Breaks if DOM order and board order ever diverge (e.g., reordering, new nodes).

### 2) Use predictable `id`s (e.g., `id="cell-5"`) and parse
Instead of `data-index`, store the index in an `id` and extract it.

```html
<button class="cell" id="cell-5"></button>
```

```js
function onCellClick(e) {
  const id = e.currentTarget.id;     // "cell-5"
  const index = Number(id.split('-')[1]);
}
```

**Pros:** Readable and familiar.  
**Cons:** `id`s must be **unique**, and parsing strings can be brittle if you later change the naming scheme.

### 3) Use a 2D row/col map (then compute to 0..8)
If you think in **rows and columns**, encode those and compute the linear index.

```html
<button class="cell" data-row="1" data-col="2"></button>
```

```js
function onCellClick(e) {
  const r = Number(e.currentTarget.dataset.row);
  const c = Number(e.currentTarget.dataset.col);
  const index = r * 3 + c; // for 3x3 board
}
```

**Pros:** Clear mental model for grid‑based games; scales to bigger boards.  
**Cons:** Slightly more typing; still uses `data-*` (but more descriptive).

### 4) Event delegation + a prebuilt Map
Attach **one** listener to the board, and keep a `Map<Element, index>`.

```js
const boardEl = document.getElementById('board');
const indexByEl = new Map();
document.querySelectorAll('.cell').forEach((el, i) => indexByEl.set(el, i));

boardEl.addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  const index = indexByEl.get(cell);
  // ...
});
```

**Pros:** One listener for many cells; flexible for dynamic content.  
**Cons:** Slightly more advanced; you must keep the Map in sync if cells are recreated.

### 5) Closures when generating cells in JS
If you **create the grid in JavaScript**, you can close over `i` directly (no attributes needed).

```js
for (let i = 0; i < 9; i++) {
  const btn = document.createElement('button');
  btn.className = 'cell';
  btn.addEventListener('click', () => {
    // i is captured by the closure
    handleMove(i);
  });
  boardEl.appendChild(btn);
}
```

**Pros:** Clean; no parsing; no dataset needed.  
**Cons:** Only applies when you **generate elements programmatically**.


### D) Which approach should I choose?

| Approach | Use it when… | Watch out for… |
|---|---|---|
| `data-index` (dataset) | You want explicit, readable mapping on the element | Values are strings; convert when needed |
| NodeList index | DOM order == board order and won’t change | Reordering breaks mapping |
| `id="cell-#"` | You prefer ids and simple string parsing | Ids must be unique; brittle naming |
| row/col attributes | You think in grids or larger boards | Still using `data-*`, but more explicit |
| Delegation + Map | You want one listener; dynamic UIs | Keep Map synced with DOM |
| JS‑generated with closures | You create cells in JS | Not applicable to static HTML grids |

**Beginner recommendation:** Start with **`data-index`**. It’s explicit, easy to read, and resilient to layout changes. As you grow, try event delegation or JS‑generated grids with closures for larger or dynamic apps.

### E) Common mistakes (and how to avoid them)

- **Forgetting that `dataset` values are strings**  
  Convert to numbers: `Number(el.dataset.index)`.

- **Relying on DOM order unintentionally**  
  If your mapping depends on order, document that assumption or switch to a more explicit mapping (`data-index`, ids, Map).

- **Mixing multiple strategies**  
  Pick one approach and use it consistently to avoid drift and bugs.

- **Using non‑standard attributes**  
  Don’t invent `index="3"` — use `data-index="3"` to stay valid and semantic.

### F) Tiny refactor: dataset → NodeList index (no `data-*`)

```js
const cells = document.querySelectorAll('.cell');

function onCellClick(e) {
  const index = Array.from(cells).indexOf(e.currentTarget);
  // handleMove(index);
}
```

And the reverse (NodeList index → dataset) is as simple as adding `data-index` back into HTML and reading `.dataset.index`.

### Visual Overview of How the Game Works

```
 Player Action (click cell)
           │
           ▼
 +-----------------------+
 |  onCellClick(index)   |
 +-----------------------+
           │
           ▼
 Update state.board[index]
           │
           ▼
Check for Winner or Draw?
   │               │
   │ Yes           │ No
   ▼               ▼
Set winner      Switch player
Set gameOver       (X ↔ O)
           │
           ▼
       render()
           │
           ▼
 UI updates based on state
```

### Render Cycle Diagram

```
 State Object
 (board, currentPlayer,
  isGameOver, winner)
           │
           ▼
     render()
           │
           ▼
+-----------------------------+
| 1. Update cell text         |
| 2. Disable used cells       |
| 3. Update status message    |
| 4. Stop board if game over  |
+-----------------------------+
           │
           ▼
      Updated UI
```

### Board Index Mapping

```
UI Grid        State Indexes

[ 0 ][ 1 ][ 2 ]   →   board[0], board[1], board[2]
[ 3 ][ 4 ][ 5 ]   →   board[3], board[4], board[5]
[ 6 ][ 7 ][ 8 ]   →   board[6], board[7], board[8]
```

### Game Logic Flow

```
Start Game
    │
    ▼
currentPlayer = "X"
    │
    ▼
Player clicks a cell
    │
    ▼
Is cell empty?
   │       │
   │ No    │ Yes
   ▼       ▼
Ignore   Place X/O
            │
            ▼
   Check winning lines
            │
            ▼
Winner? ───────────► Yes → End Game
   │
   ▼
Board full?
   │
   ▼
Draw? ─────────────► Yes → End Game
   │
   ▼
Switch Player (X ↔ O)
    │
    ▼
Repeat
```

---

### ✅ Takeaway

- `data-*` attributes give you a clean, semantic way to **label elements with meaning** your JavaScript can read.  
- They make the bridge between **UI** and **state** simple and explicit.  
- Alternatives exist (NodeList index, ids, delegation, closures) — choose based on your app’s structure and how dynamic your DOM is.