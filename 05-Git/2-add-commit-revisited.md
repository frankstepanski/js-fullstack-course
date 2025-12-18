# `git add` and `git commit` Revisited

Many beginners learn *how* to run `git add` and `git commit`, but not **when** or **why** to use them. 

As a result, Git can feel confusing or unpredictable: commits are too large, too small, or don’t clearly describe what changed. This confusion is one of the **first major hurdles** new Git users face.

What’s really happening under the hood is that Git separates the act of **choosing changes** (`git add`) from the act of **saving changes** (`git commit`). Once you understand this separation, Git stops feeling magical and starts feeling intentional. You gain control over what gets saved, when it gets saved, and how your project’s history is shaped.

These two commands form the foundation of almost every Git workflow — solo or team-based. Branching, pull requests, merges, and conflict resolution all build on this same idea: carefully selecting changes and turning them into clear, meaningful checkpoints. 

Learning the proper workflow for these two commands early helps you:

- Avoid messy or confusing commit histories
- Recover from mistakes with confidence
- Communicate changes clearly (to yourself and eventually to teammates)
- Build instincts that scale naturally into team environments


## How Git Thinks About Your Files

Git tracks your work in **three main states**:

1. **Working Directory** – files you are actively editing
2. **Staging Area** – files you plan to save next
3. **Repository (History)** – saved snapshots (commits)

Think of Git like a **camera** 📸:

- `git add` → chooses what goes into the photo
- `git commit` → takes the photo

Nothing is permanent until a commit is made.


```
┌──────────────────┐
│ Working Directory│
│ (you edit files) │
└─────────┬────────┘
          │
          │ git add
          ▼
┌──────────────────┐
│  Staging Area    │
│ (choose changes) │
└─────────┬────────┘
          │
          │ git commit
          ▼
┌──────────────────┐
│ Git History      │
│ (saved snapshots)│
└──────────────────┘
```

## What `git add` Really Does

When you run:

```bash
git add file.txt
```

You are telling Git:

> “I want this version of this file to be included in my next snapshot.”

### Important beginner truths

- `git add` does **not** permanently save anything
- You can undo it safely
- You can stage one file, many files, or all files

### Mental model

🧺 **Staging Area = Shopping Cart**

- You put items in the cart (`git add`)
- You can remove items before checkout
- Checkout hasn’t happened yet

## What `git commit` Really Does

When you run:

```bash
git commit -m "message"
```

You are telling Git:

> “Save everything that is currently staged as a permanent checkpoint.”

What happens:

- Git creates a snapshot of the staged files
- The snapshot gets a message
- You can return to this point later

Once committed:

- You cannot edit a commit
- You can only undo or replace it

## How `git add` and `git commit` Work Together

This relationship is key:

- `git add` decides **what** goes into the snapshot
- `git commit` decides **when** the snapshot is taken

You can:

- Run `git add` many times before one commit
- Commit only some files
- Leave unfinished work out of a commit

```
Working changes
   │
   ├─ change A ──┐
   ├─ change B ──┼─ git add → Commit 1
   └─ change C ──┘

   ├─ change D ──┐
   └─ change E ──┘─ git add → Commit 2
```

### Example: Multiple Commits

#### Changes made overall

```
index.html
styles.css
nav.css
form.js
form.css
```

These files were all changed while working on the project, but **they should not all be committed at once**.

---

### How Those Changes Become a Commit History

```
Time →
```

#### Commit 1

```
┌───────────────┐
│ Commit 1      │
│ Add page base │
│───────────────│
│ ✔ index.html  │
└───────●───────┘
```

Purpose:
- Establish the basic page structure
- One clear starting point

#### Commit 2

```
┌─────────────────────┐
│ Commit 2            │
│ Add layout styles   │
│─────────────────────│
│ ✔ styles.css        │
└──────────●──────────┘
```

Purpose:
- Add base layout and styling
- Builds cleanly on Commit 1

#### Commit 3

```
┌────────────────────────────┐
│ Commit 3                   │
│ Add navigation menu        │
│────────────────────────────│
│ ✔ nav.css                  │
│ ✔ navigation HTML tweaks   │
└────────────●───────────────┘
```

Purpose:
- Introduce navigation as a complete feature
- Related files grouped together

#### Commit 4

```
┌───────────────────────────────┐
│ Commit 4                      │
│ Add contact form validation   │
│───────────────────────────────│
│ ✔ form.js                     │
│ ✔ form.css                    │
└───────────────●───────────────┘
```

Purpose:
- Add form behavior and styling
- Self contained and easy to undo

### Timeline View

```
- - - - - - - - - - - ● Commit 1
                          ✔ index.html
```

```
- - - - - - - - - - - - - - - - - - - - ● Commit 2
                                        ✔ styles.css
```

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - ● Commit 3
                                                      ✔ nav.css
                                                      ✔ navigation HTML tweaks
```

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ● Commit 4
                                                                ✔ form.js
                                                                ✔ form.css
```


### Why This Commit History Works

- Each commit has **one clear purpose**
- Files in each commit **belong together**
- Undoing changes is safe and predictable
- The history tells a clean story from start to finish

```
Commit history = a story, not a dump
```

If someone reads only the commit messages, they should still understand how the project was built.

This intuition is the foundation for branching, pull requests, and team workflows later.


## Common Beginner Mistakes

### Mistake 1: Forgetting to Commit

Usually means:
- You were editing continuously
- You never paused to checkpoint

**Fix:** Commit more often.

---

### Mistake 2: Committing Too Much at Once

Usually means:
- Multiple ideas were mixed together
- Commit message is vague

**Fix:** Add fewer files per commit.

---

### Mistake 3: Committing Too Often

Usually means:
- Tiny commits with no meaning
- Messages like "update" or "fix"

**Fix:** Each commit should represent a complete thought.

## How Often Should You Commit?

### Good rule of thumb

> **Commit when one small, complete change is finished.**

Good commit moments:
- A feature works
- A bug is fixed
- A section is complete
- A refactor is done

Not:
- Every single line change
- Everything you did today

## How Much Should You `git add`?

### Tactic 1: One Idea Per Commit

Ask yourself:

> “If I undo this commit later, would I want all of this undone together?”

If yes → stage together  
If no → split it up

---

### Tactic 2: Use `git status` Constantly

Before committing:

```bash
git status
```

This tells you:
- What changed
- What is staged
- What is not staged

Beginners should run this command often.

---

### Tactic 3: Use the Commit Message as a Test

If you can write a clear sentence describing the commit, it’s probably the right size.

Good:
- "Add contact form layout"
- "Fix login validation bug"

Bad:
- "stuff"
- "update"
- "changes"

## Common Use Cases


| Situation | How Much to `git add` | When to `git commit` | Why This Works | Where Beginners Get Stuck |
|---|---|---|---|---|
| Finished a small feature | Only files related to the feature | Commit immediately | Creates a clean, focused snapshot | Mixing the feature with unrelated changes |
| Fixed one bug | Only the files involved in the fix | Right after the fix works | Easy to undo or reference later | Bug fix gets buried in a large commit |
| Multiple tasks in progress | Files for one task only | One commit per task | Each commit tells one clear story | Tasks become tangled and hard to separate |
| Still experimenting | Don’t add anything yet | Don’t commit yet | Avoids saving broken or half finished work | Committing work that is not ready |
| Ran `git add .` by accident | Unstage what’s not ready | Commit only what is ready | Regains control before committing | Accidentally committing everything |
| Small typo or quick fix | Single file | Commit right away | Keeps history accurate | Forgetting to commit small fixes |
| Many tiny edits to one idea | All related files together | Commit when the idea is complete | Prevents noisy commit history | Creating too many tiny commits |
| Large stable change | All related files | Commit once things are stable | Marks a meaningful checkpoint | Waiting too long and creating a massive commit |
| Unsure if something belongs | Don't add it yet | Commit without it | You can always commit it later | Adding files "just in case" |
| Preparing to push to GitHub | Everything you want to share | Always commit before pushing | Push reflects clear intent | Pushing unclear or messy history |


## Key Takeaways

- Git works in three states: **working directory → staging area → commit history**, and understanding this flow removes most beginner confusion
- `git add` and `git commit` solve different problems: **`add` chooses what changes belong together**, while **`commit` decides when to save them permanently**
- A good commit represents **one complete idea**, not too small and not too large
- Using `git add` intentionally lets you control commit size and keep unfinished work out of history
- A clean commit history makes it easier to **undo mistakes, understand past changes, and collaborate later**

## What's Next: Solo Exercises
You'll practice how to work confidently with Git on your own by forking and cloning repositories, undoing staged changes and commits, rewinding to earlier points in history, removing files safely, and using .gitignore to prevent common mistakes. 

The goal is to help you practice recovery and cleanup skills so you can fix problems calmly and understand exactly how Git behaves in real-world situations.