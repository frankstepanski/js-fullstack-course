// main.js
//
// This is the entry point for the project.
// Vite starts here when you run `npm run dev`.
//
// ============================================================
// HOW CSS MODULES WORK IN JAVASCRIPT
// ============================================================
//
// When you import a .module.css file, you don't get CSS —
// you get a JavaScript OBJECT where:
//
//   Key   = the class name you wrote in the CSS file
//   Value = the unique scoped name Vite generated
//
// Example:
//   You write:    .name { color: white }
//   Vite makes:   .name_x7k2 { color: white }
//   You import:   import hero from './styles/hero.module.css'
//   hero.name     → "name_x7k2"  (the actual class to apply)
//
// So instead of hardcoding class names as strings in your HTML,
// you reference them through the imported object. This is what
// guarantees they never conflict with other files.
// ============================================================

// ── Imports ─────────────────────────────────────────────────

// 1. Global CSS — fonts, variables, reset, animations
//    This is a regular .css file (NOT a module), so it applies
//    globally to the whole page.
import './styles/global.css'

// 2. CSS Module imports — each returns an object of class names
//    The variable name (hero, buttons) is just a label we choose.
//    Convention is to name it after the section or component.
import hero    from './styles/hero.module.css'
import buttons from './styles/buttons.module.css'

// Let's log the imported objects so you can see what they
// actually look like in the browser console.
// Open DevTools (F12) → Console to see the output.
console.log('hero module classes:',    hero)
console.log('buttons module classes:', buttons)
//
// You'll see something like:
// { section: 'section_a8fK2', container: 'container_b3Lp9', ... }
//
// Those generated names are what get applied to the HTML elements.


// ── Build the page ───────────────────────────────────────────
//
// We build the HTML using JavaScript and apply the scoped
// CSS Module class names through the imported objects.
//
// In a real project you might use a template or framework
// to do this — but doing it manually here makes the
// connection between the module object and the HTML very clear.

document.querySelector('#app').innerHTML = `

  <!-- ======================================================
       HERO SECTION
       Using classes from hero.module.css
  ====================================================== -->
  <header class="${hero.section}">

    <div class="${hero.container}">

      <!-- Avatar -->
      <img
        src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jamie&backgroundColor=b6e3f4"
        alt="Profile photo of Jamie Rivera"
        class="${hero.avatar}"
      />

      <!-- Name and role -->
      <div>
        <h1 class="${hero.name}">Jamie Rivera</h1>
        <p class="${hero.role}">Front-End Developer</p>
      </div>

      <!-- Bio -->
      <p class="${hero.bio}">
        I build clean, accessible interfaces and love turning
        design ideas into code. Currently learning React and
        exploring the world of component-driven development.
      </p>

      <!-- Social links -->
      <!--
        Notice how each button gets TWO classes:
          buttons.base    → shared base styles (padding, border-radius, transition)
          buttons.primary → the filled gold variant
          buttons.outline → the outlined white variant

        This is the same pattern as Tailwind's:
          class="btn btn-primary"
        But instead of utility strings, we use module object keys.

        The two classes combine just like regular CSS classes would.
      -->
      <div class="${hero.links}">

        <a href="#" class="${buttons.base} ${buttons.primary}">
          GitHub
        </a>

        <a href="#" class="${buttons.base} ${buttons.outline}">
          LinkedIn
        </a>

        <a href="#" class="${buttons.base} ${buttons.outline}">
          Portfolio
        </a>

      </div>

    </div>
  </header>

`

// ============================================================
// THE KEY DIFFERENCE FROM TAILWIND
// ============================================================
//
// TAILWIND approach (from the other project):
//   <h1 class="text-5xl font-bold text-white tracking-tight">
//
//   Styling lives IN the HTML as utility classes.
//   Fast to write. No separate CSS file for this element.
//   Class names are Tailwind's — not yours.
//
// CSS MODULES approach (this project):
//   <h1 class="${hero.name}">
//
//   Styling lives in hero.module.css as real CSS properties.
//   You write actual CSS. Class names are yours.
//   Vite scopes them so they never leak outside this file.
//
// Neither is "better" — they solve the same problem differently.
// Tailwind: style in HTML, no CSS files needed.
// CSS Modules: style in CSS files, safely scoped per file.
//
// In React, both are used — often together.
// ============================================================
