# CSS Modules Profile Page 

The **same profile page** as the Tailwind example — rebuilt using
**CSS Modules** with Vite. Compare the two projects side by side
to see how differently each tool approaches the same problem.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
cssmodules-profile/
  index.html               ← Minimal shell — content built by main.js
  src/
    main.js                ← Imports CSS modules + builds the page HTML
    styles/
      global.css           ← Regular CSS — fonts, variables, animations
      hero.module.css      ← Scoped styles for the hero section
      buttons.module.css   ← Scoped styles for the buttons
  vite.config.js           ← Empty config — CSS Modules need no plugins
  package.json
```

## The Key Idea

CSS Modules rename your class names to be unique per file:

```css
/* hero.module.css — you write: */
.name { color: white; }

/* Vite generates something like: */
.name_x7k2 { color: white; }
```

In JavaScript you access the generated name through the imported object:

```js
import hero from './styles/hero.module.css'

element.className = hero.name  // → "name_x7k2"
```

Two files can both have `.name` — they will never conflict.

## Tailwind vs CSS Modules — Same Result, Different Approach

| | Tailwind | CSS Modules |
|---|---|---|
| Where styles live | In HTML as classes | In `.module.css` files |
| Class names | Tailwind's utilities | Your own names |
| Scoping | No scoping needed | Auto-scoped per file |
| How much CSS you write | Almost none | Real CSS properties |
| Best for | Fast utility styling | Component-level isolation |

## Things to Try

1. **Open DevTools** (F12 → Console) — see the module objects logged
2. **Inspect an element** (F12 → Elements) — see the generated class names like `name_x7k2`
3. **Add a new class** in `hero.module.css`, import and apply it in `main.js`
4. **Try a naming collision on purpose** — add `.name` to `buttons.module.css` with a different colour. Notice it does NOT affect the heading
5. **Compare with the Tailwind project** — open both side by side and trace how each achieves the same visual result
