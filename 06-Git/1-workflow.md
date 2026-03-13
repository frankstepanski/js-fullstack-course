# Essential Git Workflow

Git can feel confusing when you first start learning it—but the core workflow is actually simple once you understand the big picture. This will walk you through the **essential Git commands** you’ll use every day: `add`, `commit`, `push`, `pull`, and `fetch`. The foundational workflow that every developer needs to master before moving on to collaboration.


##  What Git Actually Does 

You can think of your project as a notebook:

- Your **working directory** is the messy table where you write and erase ideas.
- The **staging area** is like putting finished pages in a “ready to save” tray.
- The **repository (repo)** is the tidy binder where completed pages (commits) are stored permanently.

Git helps you:

- Save snapshots of your work  
- Track changes over time  
- Undo mistakes without fear  
- Sync your work with GitHub  

Once you learn the basic workflow, Git becomes a powerful *safety net* and *time machine* for your code.

## How Do I Start a Project?

When you start working with Git + GitHub, you have **three different ways** to begin a project—and choosing the right one depends on **what you’re trying to do**.

### Option 1 — `git init`

#### Use when: you’re starting a brand‑new project from scratch on your computer.

```bash
mkdir my-project
cd my-project
git init
```

Creates:
- a folder
- a `.git/` history
- **no remote GitHub repo yet**

### Option 2 — `git clone`
#### Use when: a project already exists on GitHub and you want a **local working copy**.

This downloads:
- all files
- commit history
- branches
- and automatically connects to GitHub

Example:
```bash
git clone https://github.com/someone/cool-project.git
```

Now you have a folder like:
```
cool-project/
  index.js
  package.json
  .git
```

> **Note:** you can commit + push if you own the repo **or have permission**.

### Option 3 — GitHub **Fork**

#### Use when: you want **your own copy** of someone else’s repo
and you **don’t have permission to push to theirs**.

#### Step 1️⃣ Click “Fork” on GitHub
This makes a **new repo in your own GitHub account**.

Example:
```
github.com/yourName/cool-project
```

#### Step 2️⃣ Clone your fork
```bash
git clone https://github.com/yourName/cool-project.git
```

Now you can:
- commit normally
- push normally
- open pull requests

---

### Which should I use in these situations?

#### 🟩 Starting a new project
```text
git init
```

#### 🟦 Working on a class assignment you already own
```text
git clone
```

#### 🟨 Contributing to open source
```text
Fork → Clone your fork → PR
```

#### 🟪 Editing someone else’s repo you don’t own
Fork → clone your fork  

---

| Action      | You Own Repo? | Creates new GitHub repo? | Local copy? | Use Case                |
|-------------|---------------|---------------------------|-------------|--------------------------|
| `git init`  | ✅             | ❌                         | ✅           | new project              |
| `git clone` | ✅ or access   | ❌                         | ✅           | existing repo            |
| Fork        | ❌             | ✅                         | ✅ (after clone) | open-source / PR work |

---

### 👍 TL;DR

- **git init** → brand‑new project
- **git clone** → copy a project that already exists
- **fork** → personal copy of someone else’s repo
- **pull request** → propose your changes back

---

## 1. `git init` — Creating a Local Git Repository  
### “Tell Git to start tracking this project.”

Before you can use Git commands like `add`, `commit`, or `push`, you first need to **turn your folder into a Git repository**. That’s what `git init` does.

A **local Git repository** is:

- A regular folder on your computer  
- Plus a hidden `.git` folder where Git stores history, configuration, and snapshots  

You can think of `git init` as saying:

> “Hey Git, this folder is now a project. Please start tracking changes here.”

### Recommended Steps to Create a New Local Git Repo

1. **Create a project folder**

```bash
mkdir my-first-project
cd my-first-project
```

2. **Initialize Git inside that folder**

```bash
git init
```

After this, Git adds a hidden `.git` folder.  
You won’t see it in most file explorers unless you enable “show hidden files,” but it’s there.

3. **Create some files**

```bash
echo "# My First Project" > README.md
```

4. **Check the status**

```bash
git status
```

You’ll see something like:

```text
Untracked files:
  (use "git add <file>..." to include in what will be committed)
    README.md
```

This means Git is aware of `README.md`, but it’s not being tracked yet.

### When to use `git init`

Use `git init` when:

- You’re starting a brand-new project on your computer  
- You’ve downloaded files or starter code and want Git to track the folder  

> ⚠️ Don’t run `git init` inside a folder that is already a Git repo (or inside another repo).  
> This can create nested repos and confusion. Typically you run it **once per project**.

## 2. `git status` — Seeing What’s Going On  
### “Show me what Git sees right now.”

`git status` is your **check-in command**. It tells you:

- Which files are untracked  
- Which files have changes  
- Which files are staged and ready to commit  
- Which branch you’re on  

You should get used to running `git status` often—it’s like a dashboard for your project.

### Example

```bash
git status
```

Typical output might look like:

```text
On branch main

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    README.md
```

Or after adding files:

```text
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
    new file:   README.md
```

Use `git status` whenever you’re unsure what’s going on. It’s your best friend.

## 3. `git add` — Preparing Your Work  
### “I’m ready to save these changes.”

The `git add` command tells Git which files you want to include in your next snapshot (commit).

### What the staging area is
Imagine taking individual pages from your desk and placing them into a tray labeled **“Ready to Save.”**

Those pages represent **modified files**, and the tray is your **staging area**.

### Example

```bash
git add index.html
git add styles.css
```

Or add everything:

```bash
git add .
```

### When to use it
Use `git add` when:

- You modified existing files  
- You created new files  
- You deleted files  
- You want to pick and choose what goes into the next commit  

### 👍 Tip  
You can add just one file, some files, or all files.  
*You are always in control.*

## 4. `git commit` — Saving a Snapshot  
### “Save this version permanently with a message.”

A **commit** is a permanent snapshot of your project at a specific moment in time—like clicking “Save As” on an entire folder.

### Example

```bash
git commit -m "Add homepage layout and styles"
```

### What a commit message should do
Think of commit messages like diary entries:

- What did you do?
- Why did you do it?

Examples:

- `"Fix broken navigation link"`
- `"Add user login form"`
- `"Update README with setup instructions"`

### Why commits matter
Commits allow you to:

- Undo mistakes  
- See what changed  
- Understand your project’s history  
- Collaborate later on  

### 👍 Tip  
Small, frequent commits are better than giant ones.  
It’s easier to fix problems and track progress.

## 5. `git push` — Uploading Your Work to GitHub  
### “Send my saved work to the cloud.”

Once you have commits saved locally, you need to **upload** (push) them to GitHub.

GitHub is your **online backup**, your **portfolio**, and your future collaboration space.

### Example

```bash
git push
```

If it’s your first push:

```bash
git push -u origin main
```

### What push actually does
Think of GitHub as a remote copy of your project.  
Pushing sends the snapshots from your local repo to the remote repo.

### When to push
- After finishing a feature  
- At the end of a work session  
- Before switching computers  
- Before starting a new assignment  

### 👍 Tip  
If it's not on GitHub, it doesn't exist.  
Always push your work!

## 6. `git pull` — Getting the Latest Changes  
### “Download updates from GitHub and combine them with my work.”

`git pull` is how you keep your local project **up to date** with GitHub.

### Example

```bash
git pull
```

### What it does
Git pull performs two actions:

1. **Fetch** — downloads new data from GitHub  
2. **Merge** — integrates those changes into your local project  

### When to pull
- Before you start working  
- If you switch devices  
- After making changes on GitHub  
- If you see “Your branch is behind…”  

### 👍 Tip  
Always pull *before* you start typing code—it prevents conflicts later.

## 7. `git fetch` — Checking for Updates (Without Applying Them)  
### “Ask GitHub if anything changed, but don’t update my files yet.”

`git fetch` downloads the latest information from GitHub but **does not** merge or update your working files.

### Example

```bash
git fetch
```

### Why fetch is useful
Think of fetch as checking your mailbox:

- You see new mail arrived  
- But you haven’t opened it yet  
- Nothing in your house changes  

This is great for:

- Seeing if teammates pushed updates  
- Inspecting changes before merging  
- Avoiding surprise merges  

### 👍 Tip  
Beginners mostly use `git pull`, but understanding fetch helps later when working on teams.


## 8. Putting It All Together — The Core Git Workflow

Here is the “standard loop” you’ll repeat constantly in real projects:

```
✔ Make changes in your files  
✔ git add (choose what to save)
✔ git commit (save snapshot)
✔ git push (upload to GitHub)
```

And when returning to your project:

```
✔ git pull (download updates from GitHub)
```

Add → Commit → Push → Pull  
This is the **heartbeat** of your future development workflow.

## 9. Real-World Example Workflow

Let’s imagine you’re building a personal website.

### Step 1 — You edit `index.html`  
You add content and a new `<nav>` menu.

### Step 2 — Stage the changes  
```bash
git add index.html
```

### Step 3 — Save a snapshot  
```bash
git commit -m "Add navigation menu to homepage"
```

### Step 4 — Upload it  
```bash
git push
```

### Step 5 — Then, you sit down to work  
```bash
git pull
```

GitHub sends you any changes (even if you worked on your laptop instead of your desktop).

Once these basics feel natural, learning advanced Git becomes *much* easier.

## Key Takeaways


- Git works in three stages: **working directory → staging area → commit history**
- The core daily workflow is **add → commit → push → pull**
- `git add` lets you choose *what* changes go into the next snapshot
- `git commit` saves those changes as a permanent, undoable checkpoint
- `git push` and `git pull` keep your local work in sync with GitHub
- Understanding these basics makes advanced Git workflows much easier to learn later

## What's Next: Revisting Add and Commit

We'll revisit `git add` and `git commit` in more depth, focusing on *when* you should add changes and *when* you should commit them.

We’ll look at real examples of work in progress, decide what belongs together in a single commit, and practice building a clean commit history that makes undoing mistakes and collaborating later much easier.
