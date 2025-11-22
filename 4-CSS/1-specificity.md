# CSS Specificity — Who Wins?

When you write CSS, sometimes multiple rules target the same element.  
Which one takes effect? 

That’s where **specificity** comes in.  

Specificity determines **which CSS rule has more weight** when multiple rules could apply to the same HTML element.

## 1. What Is Specificity?

**Specificity** is a system of rules browsers use to decide *which* CSS selector wins when there’s a conflict.

> Think of it like a “priority score.”  
> The higher the specificity, the more powerful the rule.

Example:
```css
p {
  color: blue;
}

#intro {
  color: red;
}
```

If your HTML looks like:
```html
<p id="intro">Hello World</p>
```

✅ The text will be **red**, not blue — because `#intro` (an ID selector) has a **higher specificity** than the element selector `p`.

## 2. The Specificity Formula

Each CSS selector gets a score made of **four levels**, often written like this:

```
(a, b, c, d)
```

| Level | Selector Type | Example | Notes |
|--------|----------------|----------|--------|
| **a** | Inline styles | `<div style="color:red;">` | Most powerful |
| **b** | ID selectors | `#header` | Very strong |
| **c** | Classes, attributes, pseudo-classes | `.btn`, `[type="text"]`, `:hover` | Medium strength |
| **d** | Element and pseudo-elements | `div`, `h1`, `::before` | Lowest strength |

When comparing selectors:
1. Start with **a**, then **b**, then **c**, then **d**.
2. Higher numbers win.
3. If equal, the **later rule in the CSS file** wins.

## 3. How Specificity Is Calculated

Let’s look at examples with their scores:

| Selector | Specificity Score | Explanation |
|-----------|------------------|--------------|
| `p` | (0,0,0,1) | One element selector |
| `.intro` | (0,0,1,0) | One class selector |
| `#main` | (0,1,0,0) | One ID selector |
| `p.intro` | (0,0,1,1) | One class + one element |
| `#main .intro` | (0,1,1,0) | One ID + one class |
| `style="color:red"` | (1,0,0,0) | Inline style (highest) |

So if these all apply to the same element, **inline > ID > class > element**.

## 4. Example: Competing Rules

```css
p {
  color: blue;
}

.intro {
  color: green;
}

#main {
  color: red;
}
```

```html
<p id="main" class="intro">Hello CSS</p>
```

✅ Final color = **red**  
(because the `#main` selector has the highest specificity)

## 5. What Happens When Specificity Is Equal?

If two selectors have **the same specificity**, the **last one** in the CSS file wins.

Example:
```css
p {
  color: blue;
}

p {
  color: red;
}
```
✅ Result: **red**

Because it appears **later** in the stylesheet.

## 🚫 6. The `!important` Rule

`!important` overrides normal specificity rules.

```css
p {
  color: blue !important;
}

#intro {
  color: red;
}
```

✅ Result: **blue**, because `!important` beats higher specificity.

> ⚠️ Use `!important` **sparingly** — it makes CSS harder to maintain and debug.

## 7. Combining Selectors Increases Specificity

Each part of a selector adds to the overall score.

| Selector | Calculation | Result |
|-----------|--------------|--------|
| `div` | (0,0,0,1) | 1 element |
| `.card p` | (0,0,1,1) | 1 class + 1 element |
| `#app .card p` | (0,1,1,1) | 1 ID + 1 class + 1 element |
| `header nav ul li a` | (0,0,0,5) | 5 elements |

> 💡 The more specific you are, the more likely your rule will win — but also the harder it becomes to override later.

## 8. Pseudo-Classes and Pseudo-Elements

| Selector Type | Example | Specificity Level |
|----------------|----------|-------------------|
| **Pseudo-class** | `:hover`, `:focus`, `:nth-child()` | Same as a class |
| **Pseudo-element** | `::before`, `::after` | Same as an element |

So `.btn:hover` = (0,0,2,0)

## 9. Inline Styles and Their Power

Inline styles override everything except `!important`.

Example:
```html
<p id="intro" class="text" style="color: green;">
  Inline styles win!
</p>
```

Even if your CSS says:
```css
#intro {
  color: red;
}
```

✅ The text will be **green**, because inline style = `(1,0,0,0)`.

## 🪄 10. Tips to Manage Specificity

1. **Keep selectors short and simple.**
2. **Use class-based styling** for flexibility.
3. **Avoid chaining too many selectors** — it becomes fragile.
4. **Group styles logically** to mirror HTML hierarchy.
5. **Reserve `!important`** for special overrides.
6. **Use utility-first CSS (like Tailwind)** to reduce specificity issues.

## 11. Quick Specificity Cheat Sheet

| Selector Type | Example | Specificity Value |
|----------------|----------|-------------------|
| Inline style | `style="..."` | (1,0,0,0) |
| ID | `#main` | (0,1,0,0) |
| Class / Attribute / Pseudo-class | `.btn`, `[type="text"]`, `:hover` | (0,0,1,0) |
| Element / Pseudo-element | `h1`, `::before` | (0,0,0,1) |

## 12. Example in Practice

```html
<div id="hero" class="banner main">
  <h1>Welcome</h1>
</div>
```

```css
.banner {
  color: blue;
}
#hero {
  color: red;
}
div.main h1 {
  color: green;
}
```

✅ Final color = **green** — because it’s the only rule that matches `<h1>` directly.

## Summary

| Rule | Meaning |
|------|----------|
| **Specificity** decides which CSS rule wins |
| **Higher scores** beat lower ones |
| **Later rules** win if scores are equal |
| `!important` overrides all (use sparingly) |
| **Classes** are the best balance of flexibility and control |
| **IDs and inline styles** should be avoided for scalable CSS |

---

> **In short:**  
> CSS specificity is how browsers decide “who wins.”  
> Learn the hierarchy, keep your selectors clean, and your CSS will stay predictable and easy to manage.
