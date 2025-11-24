#  Git Basics Practice 

These exercises focus on the **core Git workflow** you’ll use every day:

> `edit file → git add → git commit → git push`

---

##  1. Set Up Your First Local Repository

**Goal:** Create a project folder and turn it into a Git repository.

1. Create a new folder on your computer (Finder / File Explorer):  
   ```text
   git-basics-practice
   ```
2. Open this folder in VS Code.
3. Open the integrated terminal in VS Code.
4. Initialize Git:
   ```bash
   git init
   ```
5. Create a simple file:
   ```bash
   echo "# Git Basics" > readme.md
   ```
6. Check the status:
   ```bash
   git status
   ```

You should see `readme.md` listed as an **untracked file**.


##  2. Scenario A — Add & Commit a Single File

**Goal:** Practice the smallest possible Git workflow.

1. Stage the file:
   ```bash
   git add readme.md
   ```
2. Confirm it’s staged:
   ```bash
   git status
   ```
   You should see it under **Changes to be committed**.
3. Commit it:
   ```bash
   git commit -m "Add initial readme file"
   ```
4. Check your history:
   ```bash
   git log --oneline
   ```

✅ You’ve just created your **first snapshot** of the project.


##  3. Scenario B — Working With Multiple Files

**Goal:** Learn how `git add` works when you change more than one file.

1. Create two new files:
   ```bash
   echo "<!DOCTYPE html>" > index.html
   echo "body { font-family: sans-serif; }" > styles.css
   ```
2. Check status:
   ```bash
   git status
   ```
   You should see both files as **untracked**.

### 3.1 Stage One File Only

3. Stage only `index.html`:
   ```bash
   git add index.html
   ```
4. Check status:
   ```bash
   git status
   ```
   - `index.html` → staged  
   - `styles.css` → still unstaged

5. Commit just the HTML file:
   ```bash
   git commit -m "Add basic HTML structure"
   ```

### 3.2 Stage All Remaining Files

6. Now stage everything else:
   ```bash
   git add .
   ```
7. Commit:
   ```bash
   git commit -m "Add base styles"
   ```

✅ You just learned that `git add` can stage **all files** or **selected files**. This is important when you want clean, focused commits.

##  4. Scenario C — Edit, Check, Add, Commit (The Daily Loop)

**Goal:** Turn the basic Git steps into a habit.

Repeat this small loop at least **3 times**:

1. **Edit a file**  
   - Add a new section to `index.html`  
   - Or tweak styles in `styles.css`  

2. **See what changed**:
   ```bash
   git status
   ```

3. **Stage changes**:
   ```bash
   git add <file-you-edited>
   ```
   or
   ```bash
   git add .
   ```

4. **Commit with a meaningful message**:
   ```bash
   git commit -m "Describe what you changed here"
   ```

5. **Check history**:
   ```bash
   git log --oneline
   ```

💡 **Big picture:** This is what you’ll do constantly as a developer:  
_Edit → Add → Commit → Repeat._

##  5. Scenario D — Connect to GitHub and Push

**Goal:** Push your local commits to a remote GitHub repository.

### 5.1 Create a GitHub Repository

1. Go to **github.com**.
2. Click **New repository**.
3. Name it:
   ```text
   git-basics-practice
   ```
4. **Do NOT** initialize with a README (you already have one).
5. Click **Create repository**.
6. Copy the **SSH** or **HTTPS** URL.

### 5.2 Connect Local Repo to GitHub

In your terminal:

```bash
git remote add origin <your-github-repo-url>
```

You can verify:

```bash
git remote -v
```

### 5.3 First Push

Push your commits to GitHub:

```bash
git push -u origin main
```

> If your default branch is called `master` instead of `main`, use `master` in the command.

Now refresh GitHub — you should see your files.


## 6. Scenario E — Make Changes and Push Again

**Goal:** Understand the full loop: `edit → add → commit → push`.

1. Edit `index.html` — add a new section, heading, or paragraph.
2. Check what changed:
   ```bash
   git status
   ```
3. Stage the changes:
   ```bash
   git add index.html
   ```
4. Commit:
   ```bash
   git commit -m "Add main content section to homepage"
   ```
5. Push:
   ```bash
   git push
   ```

✅ This is the **core workflow** you’ll repeat over and over on real projects.


## 7. Scenario F — Mixed Changes: Commit Only Part of Your Work

**Goal:** Learn how to commit only what’s “ready,” and leave the rest for later.

1. Edit both files:
   - Update `index.html` with a new section.  
   - Add more rules to `styles.css`.

2. Check status:
   ```bash
   git status
   ```

3. Stage **only** `index.html`:
   ```bash
   git add index.html
   ```

4. Commit:
   ```bash
   git commit -m "Add FAQ section to homepage"
   ```

5. Check status again:
   ```bash
   git status
   ```
   Now you should see **only `styles.css`** with unstaged changes.

6. When ready, stage and commit `styles.css`:
   ```bash
   git add styles.css
   git commit -m "Adjust typography and spacing"
   ```

💡 **Big picture idea:**  
“Git lets you decide *what story each commit tells*.”  
You don’t have to commit everything at once.


##  8. Basic Undo: Fixing Common Mistakes

Beginners often worry:  
> “What if I mess something up?”

These exercises show how to undo safely for **basic scenarios** (no branches or advanced history tricks).


### 8.1 Undo Changes in a File (Before `git add`)

**Situation:**  
You edited a file and don’t like the changes. You haven’t run `git add` yet.

**Command:**
```bash
git restore <file>
```

**Practice:**

1. Edit `index.html` in a messy way on purpose.
2. Run:
   ```bash
   git restore index.html
   ```
3. Confirm it’s back to the last committed version.

### 8.2 Unstage a File (After `git add`, Before `commit`)

**Situation:**  
You ran `git add`, but realize you weren’t ready to stage that file.

**Command:**
```bash
git restore --staged <file>
```

**Practice:**

1. Edit both `index.html` and `styles.css`.
2. Stage both:
   ```bash
   git add .
   ```
3. Now unstage `styles.css`:
   ```bash
   git restore --staged styles.css
   ```
4. Run:
   ```bash
   git status
   ```
   - `index.html` → staged  
   - `styles.css` → unstaged  

### 8.3 Undo the Last Commit (But Keep Your Changes)

**Situation:**  
You committed too early or with the wrong message, but you don’t want to lose your work.

**Command:**
```bash
git reset --soft HEAD~1
```

**What it does:**

- Removes the **last commit** from history  
- Leaves all your file changes **still staged**  

**Practice:**

1. Make a small change to `index.html`.
2. Commit it with a “bad” message:
   ```bash
   git commit -am "bad"
   ```
3. Now undo that commit:
   ```bash
   git reset --soft HEAD~1
   ```
4. Run:
   ```bash
   git status
   ```
   You’ll see your changes staged again — ready for a better commit message.

5. Make a better commit:
   ```bash
   git commit -m "Improve homepage text content"
   ```

##  9. Summary of What You Practiced

In this exercise set, you’ve focused on the **core daily Git skills**:

- Initializing a repo with `git init`  
- Tracking file changes with `git status`  
- Staging work with `git add` (single file vs multiple files)  
- Saving snapshots with `git commit` and good messages  
- Connecting to GitHub with `git remote add origin`  
- Uploading code with `git push`  
- Making additional changes and pushing updates  
- Undoing common mistakes using:
  - `git restore <file>`
  - `git restore --staged <file>`
  - `git reset --soft HEAD~1`

These are the **must-know commands** for any beginner.  

For now, mastering `add → commit → push` (and a bit of undo) will give you a strong foundation to build on.
