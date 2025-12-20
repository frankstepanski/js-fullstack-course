# Git Exercises — Fixing Remotes, Fetch, and Pull

These exercises are designed to be completed **slowly and deliberately**.
The goal is not speed — the goal is learning how to **inspect, diagnose, and fix** Git issues related to remotes and syncing with GitHub.

You should expect to:
- Stop and read command output
- Run `git remote -v` often
- Make mistakes on purpose and recover

---

## Exercise 1: Inspecting a Remote

### Goal
Learn how to confirm where your local project is pointing before doing anything else.

### Steps
1. Open a Git project on your computer.
2. Run:
   ```bash
   git remote -v
   ```

### Questions to Answer
- What is the repository URL?
- Does the GitHub username match your account?
- Does the repository name match what you expect?

### Expected Learning
You should understand that **Git never guesses** — it only follows the remote URL.

---

## Exercise 2: Removing and Replacing a Remote

### Scenario
You discover your project is connected to the wrong GitHub repository.

### Steps
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

### Expected Learning
- Removing a remote does **not** delete files
- A remote is just a saved address

---

## Exercise 3: Updating a Remote URL

### Scenario
The repository exists, but its URL has changed.

### Steps
1. Run:
   ```bash
   git remote set-url origin <new-github-repo-url>
   ```
2. Verify:
   ```bash
   git remote -v
   ```

### Reflection
Why might removing and re-adding a remote be safer for beginners than updating it directly?

---

## Exercise 4: Understanding `git fetch`

### Goal
Practice checking GitHub for changes **without modifying local files**.

### Steps
1. Run:
   ```bash
   git fetch
   ```
2. Immediately run:
   ```bash
   git status
   ```

### Expected Result
- No local files should change
- GitHub information is updated

### Key Lesson
`git fetch` is always safe.

---

## Exercise 5: Using `git pull` Intentionally

### Goal
Understand how `git pull` affects your files.

### Steps
1. Create or edit a file directly on GitHub using the web interface.
2. Back in your local project, run:
   ```bash
   git pull
   ```

### Observe
- What files changed?
- Did Git modify your working directory?

### Expected Learning
`git pull` fetches **and applies** changes.

---

## Exercise 6: Fixing an Incorrect Pull

### Scenario
You forgot you edited a file on GitHub and now things feel out of sync.

### Steps
1. Run:
   ```bash
   git status
   ```
2. Fetch safely:
   ```bash
   git fetch
   ```
3. Pull intentionally:
   ```bash
   git pull
   ```

If Git pauses:
- Open the files mentioned
- Decide what content to keep
- Save the file

Finish with:
```bash
git add .
git commit -m "Resolve GitHub and local changes"
```

### Expected Learning
GitHub edits count as real changes and must be handled deliberately.

---

## Exercise 7: Diagnosing “Out of Sync” Repositories

### Symptoms
- Files exist on GitHub but not locally
- Files exist locally but not on GitHub
- Push or pull fails repeatedly

### Fix Checklist
Run these in order:
```bash
git remote -v
git fetch
git pull
```

### Reflection
Why is guessing dangerous when Git feels out of sync?

---

## Final Confidence Check

You should now be able to:
- Inspect and explain a Git remote
- Remove, replace, or update a remote
- Explain the difference between `fetch` and `pull`
- Recover from accidental GitHub edits

If you can do these without panic, you are ready to move forward.
