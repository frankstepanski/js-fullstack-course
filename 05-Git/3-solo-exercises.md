# Git Solo Practice — Undo, Reset, Fork & Clone

Before you move on to **team workflows** (branches, pull requests, merges, resolving conflicts), you need to be confident working **solo** in Git.

Real development is messy. You *will*:
- Add the wrong file
- Commit too early
- Write a bad commit message
- Need to undo something you just did

This guide teaches you how to **recover safely without panic**.

> If you can fix your own Git mistakes, you’re ready for team workflows.

## Core Mental Model 

Git works with **three main areas**:

1. **Working Directory** — the files on your computer  
2. **Staging Area** — what will go into the next commit  
3. **Repository History** — saved commits (snapshots in time)

Most Git commands simply move changes **between these areas**.

> Core workflow to remember:  
> **edit → git add → git commit → git push**

Everything in this guide focuses on safely moving *backward* when needed.


## 1. Practice: Fork & Clone

### Goal
Learn how to copy an existing GitHub project and work on it **without affecting the original**.

---

### Step 1: Fork a Repository (GitHub)

1. Open a small practice repository on GitHub.
2. Click **Fork** (top-right).

Forking means:
- You create a brand-new copy under *your* GitHub account
- You own the repository
- You can experiment freely
- The original project is untouched

> Forking = safe experimentation.

---

### Step 2: Clone Your Fork Locally

Cloning downloads the repository to your computer.

```bash
git clone <your-fork-url>
```

What this does:
- Creates a project folder on your machine
- Copies all files and commit history
- Links your local repo to GitHub

Move into the project folder:

```bash
cd <repo-name>
```

Verify everything is working:

```bash
git status
```

You should see:
```text
nothing to commit, working tree clean
```

View commit history:

```bash
git log --oneline
```

Each line represents a saved snapshot of the project.

## 2. Practice: Undoing `git add`

### Scenario
You staged a file too early or staged the wrong file.

Remember:
- `git add` does **not** save your work
- It only prepares changes for the next commit

---

### Unstage a Single File

```bash
git restore --staged <file>
```

What this does:
- Removes the file from the staging area
- Keeps all file changes
- Nothing is deleted

Use this when:
- You added the wrong file
- You want to keep editing before committing

---

### Unstage Everything

```bash
git restore --staged .
```

What this does:
- Clears the entire staging area
- Keeps all file changes
- Lets you re-stage selectively

> This is a safe undo — no work is lost.

 ## 3. Practice: Removing Commits (Local Only)

### Important Rule
These commands are **safe only if you have NOT pushed**.

If a commit exists only on your computer, you can rewrite history safely.

---

### Remove Last Commit, Keep Changes Staged

```bash
git reset --soft HEAD~1
```

What happens:
- The commit is removed
- Files remain staged
- Your work stays intact

Use this when:
- You want to fix a commit message
- You forgot to add a file

---

### Remove Last Commit and Unstage Changes

```bash
git reset HEAD~1
```

What happens:
- The commit is removed
- Files remain changed
- Nothing is staged

Use this when:
- You want to rethink the commit entirely

---

### Remove Last Commit and Delete Changes (⚠️ Dangerous)

```bash
git reset --hard HEAD~1
```

What happens:
- Commit is deleted
- File changes are deleted
- Work is permanently lost

Only use this if you are **100% sure** you do not need the work.

## 4. Practice: Going Back to Previous Commits

### View Commit History

```bash
git log --oneline
```

Each commit is a snapshot in time.

---

### Temporarily View an Old Commit

```bash
git checkout <commit-hash>
```

What this does:
- Puts your project into a past state
- Allows you to inspect files safely
- You should not commit while here

Return to the latest version:

```bash
git checkout main
```

---

### Permanently Reset to an Older Commit

```bash
git reset --hard <commit-hash>
```

What this does:
- Deletes all commits after that point
- Rewinds your project permanently

Only acceptable for:
- Solo projects
- Practice repositories

Never do this on shared repos.

## 5. Practice: Using `.gitignore` (Preventing Mistakes)

### What is `.gitignore`?

A `.gitignore` file tells Git:

> “Never track these files.”

Ignored files:
- Never appear in `git status`
- Cannot be committed
- Are usually secrets or machine-specific files

**Big idea:** preventing mistakes is easier than fixing them later.

---

### Common Files to Ignore

```text
node_modules/
.env
.DS_Store
*.log
```

---

### Exercise A — Create a `.gitignore`

```bash
touch .gitignore
```

Add rules:

```text
.DS_Store
.env
logs/
```

Commit it:

```bash
git add .gitignore
git commit -m "Add basic gitignore"
```

---

### Exercise B — Ignored File Was Already Tracked

```bash
echo "SECRET_KEY=123" > .env
git add .env
git commit -m "Accidentally commit env file"
```

Stop tracking it:

```bash
git rm --cached .env
git commit -m "Remove env file and ignore it"
```

## 6. Practice: Removing Files from a Repository

### Remove a File Completely

```bash
git rm <file>
```

Finish with:

```bash
git commit -m "Remove unused file"
git push
```

---

### Stop Tracking a File (Keep It Locally)

```bash
git rm --cached <file>
```


## 7. Practice:  Fixing Remotes, Fetch, and Pull

Most Git problems at this stage are not code problems.
They happen because:

- Git is pointing to the wrong repository
- GitHub has changes your computer doesn’t
- You pulled or fetched without checking first

### Exercise A: Inspecting a Remote

#### Goal
Learn how to confirm where your local project is pointing before doing anything else. 

1. Open a Git project on your computer.
2. Run:
   ```bash
   git remote -v
   ```

#### Questions to Answer
- What is the repository URL?
- Does the GitHub username match your account?
- Does the repository name match what you expect?

---

### Exercise B: Removing and Replacing a Remote

#### Scenario
You discover your project is connected to the wrong GitHub repository.

1. Inspect the remote:
   ```bash
   git remote -v
   ```
2. Remove the existing remote:
   ```bash
   git remote remove origin
   ```
3. Confirm it is gone:
   ```bash
   git remote -v
   ```
4. Add the correct remote:
   ```bash
   git remote add origin <correct-github-repo-url>
   ```
5. Verify again:
   ```bash
   git remote -v
   ```

### Exercise C: Updating a Remote URL

#### Scenario
The repository exists, but its URL has changed.

1. Run:
   ```bash
   git remote set-url origin <new-github-repo-url>
   ```
2. Verify:
   ```bash
   git remote -v
   ```

---

### Exercise D: Understanding `git fetch`

#### Goal
Practice checking GitHub for changes **without modifying local files**.

1. Run:
   ```bash
   git fetch
   ```
2. Immediately run:
   ```bash
   git status
   ```

#### Expected Result
- No local files should change
- GitHub information is updated

### Exercise E: Using `git pull` Intentionally

#### Goal
Understand how `git pull` affects your files.

1. Create or edit a file directly on GitHub using the web interface.
2. Back in your local project, run:
   ```bash
   git pull
   ```

#### Observe
- What files changed?
- Did Git modify your working directory?


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
- `git remote`
- `git pull`

These commands form your **Git foundation**.

## What's Next: Github Pages

Before diving into **team workflows**, we'll switch gears and learn how to make your web pages live for everyone to see. This lesson introduces GitHub Pages, which lets you publish your projects directly from a GitHub repository.

