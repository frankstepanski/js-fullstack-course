# Git & GitHub — Understanding Version Control

Whether you’re a solo developer or part of a team, **Git** and **GitHub** are essential tools for tracking your code, collaborating with others, and protecting your work from mistakes.  

This guide introduces the basics — what Git and GitHub are, why they matter, and how to use them step by step.

##  1. What Is Git?

**Git** is a **version control system (VCS)** — a tool that tracks changes to files (especially code) over time.

Think of Git as a **time machine for your projects**:
- It lets you go back to an earlier version if something breaks.
- It lets multiple people work on the same project *without overwriting each other’s work.*

Without Git, if you and a teammate edited the same file, one of you might **accidentally erase** the other’s changes.  
With Git, every change is **tracked**, **merged**, and **recoverable**.

> 💡 Real-life example:  
> Imagine you’re writing an essay with friends. Everyone edits their own copy, then Git combines the changes safely without losing anyone’s work.

If you don’t use Git:
- You might have files like `project_final2_reallyfinal.html`
- You can’t undo mistakes easily
- Collaboration becomes chaotic

## 2. A Quick History of Git

Git was created in **2005** by **Linus Torvalds**, the same person who built Linux.  
He needed a fast, reliable way for many developers to work on the **Linux kernel** without breaking each other’s code.

Today, Git is the **most widely used version control system** in the world.

## 3. Online Git Collaboration Tools

Git works **locally** on your computer — but you can also sync your projects online.

Some platforms that host Git repositories include:
- **GitHub** (most popular)
- **GitLab**
- **Bitbucket**
- **Azure Repos**

These are online services that **store your code**, **manage collaboration**, and **help teams review and deploy projects**.

## 4. The Difference Between Git and GitHub

| Feature | Git | GitHub |
|----------|-----|---------|
| Type | Tool | Platform |
| Works | Locally on your computer | Online in the cloud |
| Purpose | Tracks versions of files | Stores Git projects for sharing & collaboration |
| Example | `git commit`, `git push` | `github.com/yourname/project` |

> 💡 Git is the **engine** — GitHub is the **garage** where you store your car.

## 5. What Is Version Control?

**Version control** is the practice of managing and tracking changes to files over time.

It’s important because it allows you to:
- See what changed, when, and by whom
- Revert to earlier versions if something breaks
- Work with others safely on the same files

## 6. Main Areas of Version Control

| Area | Description | Example |
|------|--------------|----------|
| **Repository (Repo)** | A project folder tracked by Git | Your project’s codebase |
| **Commit** | A saved “snapshot” of your changes | Like saving progress in a video game |
| **Branch** | A separate workspace for experiments | Try a new feature without touching main code |
| **Merge** | Combining changes from branches | Add your new feature to the main project |
| **Remote** | The online copy of your repo (GitHub) | Push/pull between local and cloud |

## 7. Installing Git

### 🪟 On Windows
1. Go to [git-scm.com/downloads](https://git-scm.com/downloads)
2. Download **Git for Windows**
3. Run the installer → keep defaults
4. Open **Git Bash** (a terminal for Git)

### 🍎 On macOS
1. Open Terminal
2. Type:
   ```bash
   git --version
   ```
   If Git isn’t installed, it will prompt you to install Xcode Command Line Tools.

## 8. What Is GitHub?

**GitHub** is a web-based platform where you can:
- Store your Git repositories online
- Collaborate with teammates
- Track issues, pull requests, and documentation

It’s free for individuals and open-source projects.

---

### Setting Up GitHub

1. Go to [github.com](https://github.com)
2. Create an account
3. Verify your email
4. (Optional) Add your profile picture and bio

## 9. What Is a Repository?

A **repository** (or *repo*) is like a project folder that Git tracks.

You can have:
- A **local repo** (on your computer)
- A **remote repo** (on GitHub)

### Creating a Repository (on GitHub)
1. Click **New Repository** on GitHub  
2. Give it a name (e.g., `my-first-project`)
3. Choose public/private
4. Add a `README.md`
5. Click **Create Repository**

---

### Cloning a Repository

To get a GitHub repo onto your computer:
```bash
git clone https://github.com/username/repo-name.git
```
This downloads all project files and history.

## 10. What Is a README.md File?

A `README.md` is a text file (written in Markdown) that explains:
- What your project does
- How to install or use it
- Who built it

GitHub automatically displays this file at the bottom of your repo page.

## 11. Creating a Local Git Repo

You can make a new Git repo on your computer:
```bash
mkdir myproject
cd myproject
git init
```

This creates a hidden `.git` folder that tracks all future changes.

## 12. Connecting Local Git to GitHub

1. Create a new repo on GitHub  
2. In your local folder:
   ```bash
   git remote add origin https://github.com/username/repo-name.git
   git branch -M main
   git push -u origin main
   ```

Now your local and online repos are connected.

> 💡 Local repo = your computer  
> GitHub repo = online backup and collaboration space

---

## 13. Basic Snapshotting

Each time you save work in Git, it’s like taking a **snapshot** of your project.

You stage changes with `git add`, and save them with `git commit`.

##  14. Basic Git Commands

| Command | Description |
|----------|--------------|
| `git init` | Start a new Git repository |
| `git add` | Stage files for committing |
| `git commit -m "message"` | Save staged changes |
| `git status` | Show what’s changed |
| `git remote add origin URL` | Connect local repo to GitHub |
| `git push` | Upload changes to GitHub |
| `git pull` | Download latest changes |
| `git log` | View commit history |

##  15. Git Add vs Git Commit

| Step | Description | Example |
|------|--------------|----------|
| `git add` | Moves changes into a staging area | “I’m ready to save these files” |
| `git commit` | Saves the staged snapshot permanently | “I’ve saved a checkpoint” |

> 💡 Always `add` before `commit`.

## 💪 16. Practice in the Terminal (Not GUI Tools)

Many editors (like VS Code) have Git tools built in — but it’s important to **learn Git in the terminal**.  

Typing commands builds **muscle memory** and helps you:
- Understand what’s really happening
- Debug problems confidently
- Work on any computer (no need for GUIs)

##  17. What Are Branches?

A **branch** is like a copy of your project where you can make changes safely.  
The main branch is often called `main` or `master`.

Example:
```bash
git branch feature-login
git checkout feature-login
```

Now you’re working on a separate version.  
When ready, merge it back into `main`:
```bash
git checkout main
git merge feature-login
```

> 💡 Teams use branches for each feature — e.g., `feature/login`, `fix/navbar`, `update-readme`.

## 18. Merging vs Rebasing

| Concept | What It Does | Example |
|----------|----------------|----------|
| **Merge** | Combines histories from two branches | `git merge feature-login` |
| **Rebase** | Rewrites history as if changes happened sequentially | `git rebase main` |

> Merging keeps history.  
> Rebasing makes it cleaner, but can be risky for shared branches.

## 19. Git Pull vs Git Fetch

| Command | Description | Example |
|----------|--------------|----------|
| `git fetch` | Downloads new changes but doesn’t apply them | “Check for updates but don’t touch my work yet.” |
| `git pull` | Downloads *and merges* new changes | “Get updates and combine them into my branch.” |

> 💡 Use `fetch` if you want to review before merging.  
> Use `pull` when you trust the updates.

## 20. Git Log

View commit history:
```bash
git log
```
You can see:
- Who made changes
- Commit messages
- Dates and IDs

To see a shorter version:
```bash
git log --oneline
```

> Useful for tracking progress and debugging issues.

## 21. Pull Requests (PRs)

A **Pull Request** (PR) is a request to merge your branch into another branch (usually `main`).

Example:
- You finish a feature branch
- You push it to GitHub
- You open a **Pull Request** to merge your changes

Team members can:
- Review your code
- Leave comments
- Approve or request fixes

> 💡 PRs are essential for team collaboration and code review.

##  22. Comparing Branches — `git diff`

You can compare what changed:
```bash
git diff main feature-login
```

> Great for reviewing changes before merging or committing.

## 23. Git Stash

Sometimes you need to **pause work** without committing:
```bash
git stash
```

This hides your changes temporarily.  
To bring them back:
```bash
git stash pop
```

> Example: You’re halfway through a bug fix but need to switch branches — stash your progress safely.

## 24. Undoing Changes

### Withdraw staged files:
```bash
git reset HEAD file.txt
```

### Revert a commit:
```bash
git revert <commit-id>
```

> These commands protect you from losing work or breaking code accidentally.

---

##  Summary

| Concept | Description |
|----------|--------------|
| **Git** | Local version control tool |
| **GitHub** | Online collaboration platform |
| **Repository** | Folder tracked by Git |
| **Commit** | Snapshot of code |
| **Branch** | Separate workspace for changes |
| **Merge/Rebase** | Combine work back into main branch |
| **Push/Pull** | Sync changes between local and remote |
| **Pull Request** | Ask to merge your changes (team review) |
| **Stash** | Temporarily save uncommitted work |

---

> 💬 **In short:**  
> Git tracks your progress.  
> GitHub shares your progress.  
> Together, they form the backbone of modern web development — letting you build safely, collaborate globally, and never lose your hard work.

# Scenarios

To get some practice with all of these git comands, let's go through some common [git workflow scenarios](scenarios.md).
