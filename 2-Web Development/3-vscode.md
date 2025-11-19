# Visual Studio Code: How to Use It

Visual Studio Code — often called **VS Code** — is the main app where you’ll *write your code*, *organize your projects*, and *run the websites and apps you build*.  
Think of it as your **home base** as a developer.

Instead of just being a “text editor,” VS Code gives you a clean place to organize your files, tools to help you write code faster, and helpful features that catch mistakes as you type.

## Why Developers Use VS Code

Beginner analogy:  
> Writing code without VS Code is like building furniture without a toolbox.  
> VS Code *is* your toolbox — it keeps everything in one place and gives you extra tools when you need them.

With VS Code, you can:
- See all your project files in one place  
- Edit code with smart suggestions  
- Run small servers for testing  
- Install helpful add-ons (extensions)  
- Use a built-in terminal without switching apps  

VS Code helps beginners because it reduces confusion — everything you need lives in a single window.


## Your Projects Live in Folders (This Is Very Important)

For beginners, the biggest habit to learn is:

> **Every coding project should be inside its own folder.**

Why?  
Because real projects aren’t just one file — they have:
- HTML files  
- CSS files  
- JavaScript files  
- Images  
- Folders for organization  

VS Code shows your whole project structure clearly and helps you keep things organized.

**BIG PICTURE:**  
Think of your project folder as a “box” that holds everything your website needs.

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

## What Is the Terminal?

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