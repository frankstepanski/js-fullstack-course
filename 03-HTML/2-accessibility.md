# Introduction to Web Accessibility

If HTML gives structure to the web, **accessibility** makes sure *everyone* can use it — including people with disabilities, different devices, or slow connections.

Think of accessibility as **good design for all users** — not just those with perfect eyesight, hearing, or mobility.

##  1. What Is Accessibility?

**Web accessibility (often called "a11y")** means designing and coding websites so that **everyone** can:
- Navigate
- Read
- Understand
- Interact with your content

That includes people who:
- Use screen readers (for visual impairments)
- Navigate by keyboard instead of a mouse
- Have hearing difficulties (need captions)
- Have cognitive or learning differences
- Use mobile devices or voice assistants

> 💡 Accessibility = removing barriers so everyone can use the web equally.

##  2. Why Accessibility Matters

###  It’s About Inclusion
The web is for **everyone** — accessibility ensures no one is left out.

###  It’s the Law (in many countries)
Many organizations are required to follow accessibility standards.

### It’s Good for Business
Accessible websites reach more users and improve SEO (search engine ranking).

### It’s the Right Thing to Do
If you can make your page easier for others to use, why wouldn’t you?

##  3. Accessibility and HTML

HTML was designed with accessibility in mind.  
When you use **semantic HTML**, browsers and assistive technologies (like screen readers) automatically understand the structure of your page.

| Good Practice | Why It Helps |
|----------------|--------------|
| Use `<header>`, `<nav>`, `<main>`, `<footer>` | Helps screen readers understand page layout |
| Use `<h1>`–`<h6>` for headings | Creates an outline users can navigate |
| Use `<button>` for clickable actions | Automatically keyboard and screen-reader friendly |
| Use `<form>` and `<label>` correctly | Lets assistive tech identify input fields |
| Add `alt` text to images | Describes images for people who can’t see them |

> 💡 Using the *right HTML tag for the right job* makes your site more accessible automatically.

## 4. Images and `alt` Text

The `alt` attribute gives a text description of an image.

Example:
```html
<img src="student-group.jpg" alt="Group of students working together on laptops">
```

If the image can’t load, or a person is using a screen reader, the `alt` text is read aloud.

| Type of Image | Good Alt Text Example |
|----------------|------------------------|
| Informative | `alt="CTD logo"` |
| Decorative | `alt=""` (empty means ignore) |
| Complex (charts, diagrams) | Briefly summarize or provide a caption nearby |

>  **Tip:** Don’t say “image of…” — screen readers already announce it’s an image.

## 5. Keyboard Navigation

Some users **can’t use a mouse**, so they rely on the keyboard to navigate.

Try it yourself:
- Press **Tab** to move through links and buttons.
- Press **Enter** to activate them.

### Developer Checklist
✅ Make sure:
- All links and buttons are reachable with **Tab**  
- The current selection is **visible** (has a focus outline)  
- You don’t remove outlines with CSS (`outline: none;`)

> 💡 If you can’t use your site with only a keyboard, it’s not fully accessible.

## 6. Text and Headings

Headings aren’t just for styling — they create structure.

Example:
```html
<h1>Welcome to My Website</h1>
<h2>About Me</h2>
<h3>My Projects</h3>
```

### Why It Matters:
- Screen readers use headings to **jump around a page**
- Helps **all users** scan content quickly
- Improves **SEO**

> 💡 Use only one `<h1>` per page — it’s like the title of a book.

## 7. Colors and Contrast

Some users have **color blindness** or low vision.  
Always make sure text has **enough contrast** with the background.

| Poor Example | ✅ Better Example |
|---------------|-------------------|
| Light gray text on white background | Black text on white background |
| Red text on green background | Dark blue text on light background |

You can test your colors using tools like:
- [contrast-ratio.com](https://contrast-ratio.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

> 💡 Don’t use color alone to show meaning (e.g., “errors are in red”). Add text or icons too.

## 8. Audio, Video, and Motion

If your website includes **audio or video**, make it usable for everyone:
- Add **captions** for video dialogue
- Provide **transcripts** for podcasts
- Avoid fast, flashing animations that can cause dizziness or seizures

Example:
```html
<video controls>
  <source src="intro.mp4" type="video/mp4">
  <track kind="captions" src="intro-captions.vtt" srclang="en" label="English">
</video>
```

> 💡 Adding captions doesn’t just help people with hearing loss — it helps *everyone* understand better.

##  9. Forms and Labels

Labels tell users (and screen readers) what an input field is for.

```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```

### ✅ Best Practices
- Always connect `<label>` with `<input>` using the `for` attribute.  
- Don’t rely on placeholder text — it disappears when you type.  
- Use helpful error messages (not just “invalid”).

##  10. Testing Accessibility Yourself

You don’t need fancy tools — start simple:

| Tool | How to Use It |
|------|----------------|
| **Tab key** | Test keyboard navigation |
| **Screen reader** | Try VoiceOver (Mac) or NVDA (Windows) |
| **Zoom in** | See if text scales properly |
| **No mouse** | Make sure everything is still usable |

>  Accessibility testing is like “empathy testing” — see the page from someone else’s experience.

##  Summary

| Concept | Why It Matters |
|----------|----------------|
| **Semantic HTML** | Gives meaning to your content |
| **Alt text** | Describes images for screen readers |
| **Keyboard navigation** | Ensures full control without a mouse |
| **Headings** | Help structure content for humans and tools |
| **Contrast & Color** | Improves readability for all users |
| **Captions & Transcripts** | Make multimedia accessible |
| **Forms & Labels** | Guide users through interaction |

---

>  **In short:**  
> Accessibility isn’t about extra work — it’s about better work.  
> You’re not just coding for browsers — you’re coding for people.
