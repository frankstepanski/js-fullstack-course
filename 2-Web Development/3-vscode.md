
# Visual Studio Code: How to Use It

Visual Studio Code (VS Code) is the main tool you will use to create, edit, and manage your coding projects.  
This guide walks through how VS Code works, how to organize your projects, what extensions are, how Emmet helps you write HTML faster, and why the terminal is so important.

## VS Code Is Based on Folders — Not Individual Files

One of the most important concepts for beginners:

> **Every project should live inside its own folder.  
VS Code works best when you open *folders*, not individual files.**  

### Why This Matters
- Websites are made up of *multiple files* (HTML, CSS, JS, images, etc.).
- Keeping everything in a project folder keeps files organized.
- Tools like Live Server, Git, Node, and React all expect a **folder-based** project structure.

## Starting a New Project in VS Code (Step-by-Step)

### **1. Create a Folder First**
On your computer (Desktop, Documents, etc.):
- Make a folder named something like `my-first-website`  
- This folder will contain all files for your project

### **2. Open the Folder in VS Code**
- Open VS Code  
- Go to **File → Open Folder…**  
- Select your folder (`my-first-website`)  
- VS Code will now show the folder in the **Explorer** panel on the left

### **3. Create Files Inside VS Code**
In the Explorer panel:
- Click **New File**
- Add:
  - `index.html`
  - `styles/style.css`
  - `images/` (folder)

### **4. Use Live Server to Preview Your Work**
If you have the Live Server extension installed:
- Right-click `index.html`
- Choose **Open with Live Server**

Your browser will open automatically and refresh whenever you save changes.

## What Is a VS Code Extension?

Extensions add new features to VS Code — like apps on your phone.

Examples:
- **Live Server** → automatically refresh your browser  
- **Live Preview** → previews web pages in your IDE 
- **Prettier** → auto-format your code  
- **ESLint** → highlight JavaScript issues  
- **Path Intellisense** → autocomplete file paths  


### How to Install One
1. Click the **Extensions** icon on the left  
2. Search for “Live Server” (or any name)  
3. Click **Install**

> Beginners should start with Live Server + Prettier.  
More extensions can be added later.

## What Is Emmet

Emmet is built into VS Code and lets you write HTML & CSS super fast.

### Examples

Type this:
```
!
```
Press **Tab** → VS Code expands it into a full HTML boilerplate.

Type:
```
ul>li*3
```
Press **Tab** → Creates a list with 3 items.

Type:
```
.card>img+p
```
Press **Tab** → Creates a `<div class="card">` with an image and paragraph.

You don’t need to memorize these — start with simple ones and use them as shortcuts.

## 💻What Is the Terminal?

The **terminal** is a place where you type commands to control your computer.

VS Code includes its own terminal so you don’t need separate apps.

### Open It With:
- **View → Terminal**, or  
- Shortcut: `` Ctrl/⌘ + ` ``

### Why Developers Use the Terminal
You’ll use it for things like:
- Running JavaScript with Node (`node index.js`)
- Using npm (`npm install`)
- Starting React or backend servers
- Running Git commands (`git status`, `git add`, etc.)

Once you learn more backend and full-stack development, the terminal becomes essential.

## Putting It All Together: Beginner Workflow

A simple repeatable workflow:

1. **Create a project folder**  
2. **Open the folder in VS Code**  
3. **Create your files inside VS Code**  
4. **Use Live Server to preview your HTML**  
5. **Use the terminal for Node/npm/Git when needed**  
6. **Install only essential extensions at first**  
7. **Use Emmet to speed up writing HTML**

---

If you want, I can also generate:
- A beginner VS Code *cheat sheet*  
- A printable PDF version  
- Or integrate this section into your full student handbook.
