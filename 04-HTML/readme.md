#  Introduction to HTML (HyperText Markup Language)

HTML (HyperText Markup Language) is the **foundation of every web page**.  
It’s what gives structure to content on the internet — telling browsers *what each part of the page means* (like text, images, links, and sections).

Think of HTML as the **skeleton** of a website.  
CSS adds the **style** (colors, layout), and JavaScript adds the **interactivity** (buttons, animations, etc.).

##  1. What Is HTML and What Is It Used For?

**HTML = HyperText Markup Language**

- **HyperText** means text that can include links to other documents.  
- **Markup Language** means a way of describing structure using *tags*.

###  Purpose of HTML
HTML’s main job is to **structure content** on a web page:
- Organize headings, paragraphs, and lists  
- Display images, links, and media  
- Create forms and input fields  
- Define the layout using semantic sections  

> 💡 HTML doesn’t make your page pretty — it just defines *what each thing is* so browsers know how to display it.

## 2. Basic HTML Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to my first webpage.</p>
</body>
</html>
```

##  3. The `<head>` Section — What It Does and Why It Matters

The `<head>` section contains **metadata** — information *about* your webpage, not content that appears *on* the page.

| Tag | Purpose |
|-----|----------|
| `<title>` | Title of the page (appears on browser tabs) |
| `<meta charset="UTF-8">` | Supports special characters and emojis |
| `<meta name="viewport">` | Makes your site mobile-friendly |
| `<meta name="description">` | Describes your page for search engines |
| `<link rel="stylesheet">` | Links to CSS file |
| `<script src="">` | Links to JavaScript file |
| `<link rel="icon">` | Adds the tab icon (favicon) |

> 💡 The `<head>` acts like a control room — invisible to users but essential for performance, SEO, and accessibility.

##  4. Tags vs. Elements

A **tag** is the instruction inside `< >`, and an **element** includes the tag + its content.

Example:
```html
<p>This is a paragraph.</p>
```

- `<p>` = opening tag  
- `</p>` = closing tag  
- Together = one **element**

| Concept | Example | Description |
|----------|----------|-------------|
| Tag | `<p>` | Command |
| Element | `<p>Hello</p>` | Full structure (opening, content, closing) |

## 5. Semantic Elements

“Semantic” means **meaningful** — elements that describe *what they are*, not just how they look.

Example:
```html
<header>Header</header>
<nav>Navigation</nav>
<main>Main content</main>
<footer>Footer</footer>
```

### Why Semantic HTML Matters
- Improves **accessibility**
- Boosts **SEO**
- Keeps code organized and readable

> 💡 Using `<div>` for everything is like labeling every box “stuff.” Semantic tags label your content properly.

##  6. Creating Your First HTML Page

1. Open **VS Code**
2. Create a folder (e.g., `my-first-website`)
3. Inside it, create a file named `index.html`
4. Paste this code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first HTML page.</p>
</body>
</html>
```

5. Save the file.

## 7. Using VS Code’s Live Server Extension

Instead of double-clicking an HTML file, use **Live Server** in VS Code.  
It launches a mini web server at `http://127.0.0.1:5500` (localhost).

### Why It’s Better
- Auto-refreshes on save  
- Simulates real web server behavior  
- Helps test file paths and scripts  

> 💡 It’s your “practice environment” before deploying your site online.

##  8. Working with File Folders, Images, and Paths

As projects grow, you’ll organize files into folders (for HTML, CSS, JS, and images).

### Example Project Structure

```
my-website/
├── index.html
├── about.html
├── styles/
│   └── style.css
├── images/
│   └── logo.png
└── scripts/
    └── app.js
```

###  Understanding File Paths

#### Relative Paths (most common)
Used to point to files **relative to the current HTML file**.

```html
<img src="images/logo.png" alt="Logo">
<link rel="stylesheet" href="styles/style.css">
<script src="scripts/app.js"></script>
```

`../` means **go up one folder**.

Example:
```html
<img src="../assets/photo.jpg" alt="Photo">
```

#### Absolute Paths
Used for **full URLs** or when linking from the site’s root or the internet.

```html
<img src="/images/logo.png" alt="Root image">
<img src="https://example.com/banner.jpg" alt="External image">
```

> 💡 Use relative paths while developing. Use absolute URLs for live sites or CDN resources.

---

###  Adding Images

The `<img>` tag displays images and must include `src` and `alt` attributes.

```html
<img src="images/profile.jpg" alt="Profile photo">
```

| Attribute | Purpose |
|------------|----------|
| `src` | Path to the image |
| `alt` | Text shown if the image doesn’t load |

> 💡 Always add `alt` text — it helps accessibility and SEO.

---

### Why Folder Structure Matters

- Keeps projects organized  
- Prevents broken links  
- Mirrors how servers host sites  
- Helps other developers navigate easily

>  Tip: Most “image not showing” errors are caused by wrong paths — double-check your folder and file names!

##  9. Block vs. Inline Elements

| Type | Description | Examples |
|------|--------------|-----------|
| **Block** | Start on new line, take full width | `<div>`, `<p>`, `<section>`, `<ul>` |
| **Inline** | Stay in same line, take needed width | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>` |

Example:
```html
<p>This is a <strong>bold</strong> word.</p>
```

##  Summary

| Concept | Description |
|----------|--------------|
| **HTML** | Structures all web pages |
| **Head Section** | Controls metadata and browser info |
| **Tags & Elements** | Tags = instructions; Elements = full structure |
| **Semantic HTML** | Adds meaning and improves SEO |
| **Live Server** | Simulates real server behavior |
| **Images & Paths** | Organize and link assets properly |
| **Block vs Inline** | Defines layout and inline text elements |

---

>  **In short:**  
> HTML defines structure, CSS defines style, and JavaScript defines behavior.  
> Understanding file organization and paths helps you build reliable, professional websites.

# Additional Materials

Here are the rest of the resources for this topic.

1. [Forms](1-forms.md)
2. [Accessibility](2-accessibility.md)  
3. [Dev Tools](3-devtools.md)  