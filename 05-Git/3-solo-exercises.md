# Git Solo Practice — Undo, Reset, Fork & Clone

Before you move on to **intermediate Git topics** or **team workflows** (branches, pull requests, merges, resolving conflicts), you need to be able to **handle common Git scenarios by yourself**.

That means being confident when:
- You make mistakes
- You commit too early
- You add the wrong files
- You need to undo or rewind safely

If you can recover on your own without panic, you’re ready to advance.

>This guide focuses on building that confidence first.

You will practice the Git skills you actually use when working solo:

- Forking and cloning repositories
- Undoing `git add`
- Removing commits
- Going back to previous commits
- Removing files from a GitHub repository
- Using `.gitignore` to prevent mistakes before they happen

> Core workflow to remember:
> **edit → git add → git commit → git push**



## 1. Practice: Fork & Clone

### Goal
Learn how to copy an existing GitHub project and work on it safely on your own machine.

### Steps

1. Go to a small practice repository on GitHub.
2. Click **Fork** (top-right).
3. This creates a copy under your GitHub account.

Forking means:
- You own the repo
- You can experiment freely
- You won’t affect the original project

### Clone Your Fork Locally

1. Open your forked repository on GitHub.
2. Click **Code** and copy the HTTPS or SSH URL.
3. In your terminal:

```bash
git clone <your-fork-url>
```

4. Move into the project:

```bash
cd <repo-name>
```

5. Verify everything works:

```bash
git status
git log --oneline
```



## 2. Practice: Removing `git add`

### Scenario
You staged a file too early or staged the wrong file.

### Unstage a Single File

```bash
git restore --staged <file>
```

Your changes stay intact, but the file is no longer staged.

### Unstage Everything

```bash
git restore --staged .
```

This clears the staging area without deleting any work.



## 3. Practice: Removing Commits (Local)

### Remove Last Commit, Keep Changes Staged

```bash
git reset --soft HEAD~1
```

Use this when:
- You committed too early
- Your commit message was wrong

Recommit with a better message afterward.



### Remove Last Commit and Unstage Changes

```bash
git reset HEAD~1
```

The commit is removed, but your file changes remain unstaged.



### Remove Last Commit and Delete Changes (Danger)

```bash
git reset --hard HEAD~1
```

This deletes the commit **and** the file changes.

Only use this if you are certain you don’t need the work.



## 4. Practice: Going Back to Previous Commits

### View Commit History

```bash
git log --oneline
```

Example output:

```text
a3f2c91 Add footer
8b129ac Update styles
c72a11e Initial commit
```



### Temporarily View an Old Commit

```bash
git checkout <commit-hash>
```

You are now viewing the project at that point in time.

Return to the latest version:

```bash
git checkout main
```



### Permanently Reset to an Older Commit

```bash
git reset --hard <commit-hash>
```

This rewinds your project and removes all newer commits.

This is acceptable for **solo projects only**.



## 5. Practice: Using `.gitignore` (Preventing Common Mistakes)

### What is `.gitignore`?

A `.gitignore` file tells Git **which files it should completely ignore**.

Ignored files:
- Never show up in `git status`
- Cannot be accidentally committed
- Are usually machine-specific or temporary

**Big picture:** `.gitignore` helps you avoid problems instead of fixing them later.



### Common Files You Should Ignore

Examples:

```text
node_modules/
.env
.DS_Store
*.log
```



### Exercise A — Create a `.gitignore`

1. Create a `.gitignore` file:

```bash
touch .gitignore
```

2. Add the following:

```text
.DS_Store
.env
logs/
```

3. Check status:

```bash
git status
```

Notice that ignored files do **not** appear.

4. Commit `.gitignore`:

```bash
git add .gitignore
git commit -m "Add basic gitignore"
```



### Exercise B — Ignored File Already Tracked

**Scenario:** You committed a file first, then realized it should be ignored.

1. Create a fake secret file:

```bash
echo "SECRET_KEY=123" > .env
```

2. Stage and commit it (on purpose):

```bash
git add .env
git commit -m "Accidentally commit env file"
```

3. Add `.env` to `.gitignore`.

4. Stop tracking it:

```bash
git rm --cached .env
git commit -m "Remove env file and ignore it"
```

The file stays on your computer but is removed from GitHub.



## 6. Practice: Removing Files from a GitHub Repo

### Remove a File Completely

```bash
git rm <file>
```

Then:

```bash
git commit -m "Remove unused file"
git push
```

The file is removed locally and on GitHub.



### Stop Tracking a File (Keep It Locally)

```bash
git rm --cached <file>
```

Then commit and push.

The file remains on your computer but is no longer tracked.



### Accidentally Pushed a File

1. Remove it:

```bash
git rm <file>
```

2. Commit and push:

```bash
git commit -m "Remove accidentally committed file"
git push
```

The file disappears from the repository going forward.

## Key Takeaways

Apart from the normal daily workflow:

> **git add → git commit → git push**

You should be familiar and comfortable with the following skills:

- Forking via GitHub
- `git clone`
- `git add` / `git restore --staged`
- `git commit`
- `git reset --soft` / `git reset --hard`
- `git checkout <commit>`
- `git rm`

These commands form your **Git foundation**.

## What's Next: Github Pages

Before diving into **team workflows**, we'll switch gears and learn how to make your web pages live for everyone to see. This lesson introduces GitHub Pages, which lets you publish your projects directly from a GitHub repository.

