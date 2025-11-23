# Git & GitHub — Understanding Version Control

Whether you're building your very first website or working on a team of developers, **Git** and **GitHub** are two of the most important tools you’ll learn. They help you **track your work**, **fix mistakes**, **collaborate safely**, and **store your projects online**.

## 1. What Is Version Control?

Before we talk about Git, let’s zoom out.

**Version control** is a system that keeps a history of changes to your files over time.

Think of it like:

- Google Docs “Version History”
- Undo/Redo for your whole project
- A timeline of everything you’ve done

With version control, you can:

- See exactly what changed  
- Go back to a previous version  
- Try new ideas without fear  
- Collaborate without overwriting each other  

Without version control, most people end up with:

```
project.html  
project-final.html  
project-final-final.html  
project-really-final-this-time.html
```

Version control fixes all of it by keeping *every version* safely in one place.


## 2. What Is Git?

**Git** is a **version control system** — a tool on your computer that tracks changes in your project.

Every time you save changes using Git, you create a **commit**.  
A commit is like taking a snapshot of your project at that moment.

You decide when to “save” snapshots, and you can go back to **any snapshot** if something breaks.

### Why Git is powerful:

- It's fast  
- It works offline  
- Every developer has a full copy of the project history  
- You never lose work  
- You can experiment and undo safely  

### Simple analogy:

> Git is like a personal notebook for your code.  
> Every commit is a page in the notebook.  
> You can flip back to any page at any time.

If you break something?  
Just go back to a previous commit.

If you want to try something new?  
You can create a **branch** — a separate pathway that won’t affect the main project.

## 3. What Is GitHub?

**GitHub** is *not* Git.  
It’s the website where your Git projects are stored and shared online.

Git = the tool on your computer  
GitHub = the website where you host your Git repositories

GitHub acts like:

- A backup system  
- A collaboration platform  
- A portfolio platform  
- A job-hunting tool  
- A way to share code with others  

### Why GitHub matters:

- You won’t lose your work if your computer breaks  
- You can push your code online to show others  
- You can collaborate with teams  
- You can contribute to open source  
- You can submit homework/projects during the course  

>Git handles the *history* and *saving* of your project.  
GitHub handles the *sharing* and *collaboration*.

A typical workflow looks like:

```
Make changes → Save using Git (commit) → Upload to GitHub (push)
```

When working with teammates:

```
Pull latest code → Make changes → Commit → Push back → Everyone sees new updates
```

This cycle repeats continuously.

## Installing Git and Connecting to GitHub 

Now that you understand what Git and GitHub are, this guide walks you through **exactly how to set them up** so you can start using them in your projects.

You will:

1. Install Git  
2. Configure Git (your name and email)  
3. Create or log in to a GitHub account  
4. Connect Git and GitHub with secure authorization (SSH or HTTPS token)  
5. Test everything by creating and pushing your first repository  

## 1. Install Git

Go to:  
👉 **https://git-scm.com/downloads**

Choose your operating system:

- **Windows** → Download the Windows installer (`.exe`)  
- **macOS** → Download the macOS installer (`.dmg`) or use Homebrew  
- **Linux** → Install via your package manager  

### 1.1 Install on Windows

1. Run the `.exe` installer you downloaded.  
2. Click **Next** through the setup screens.  
3. Accept the default options unless your instructor tells you otherwise.  
4. Make sure **“Git Bash”** is included — this gives you a terminal for Git commands.  
5. Finish the installation.

After installation, you should be able to open **Git Bash** from the Start menu.


### 1.2 Install on macOS

You can either:

#### Option A: Using the installer

1. Download the macOS installer from `git-scm.com`.  
2. Open the `.dmg` file and run the installer.  
3. Follow the prompts and finish the installation.

#### Option B: Using Homebrew (if installed)

Open **Terminal** and run:

```bash
brew install git
```

### 1.3 Verify Git Installed

Open a terminal:

- **Windows:** Git Bash  
- **macOS:** Terminal  
- **Linux:** Terminal  

Run:

```bash
git --version
```

You should see something like:

```bash
git version 2.x.x
```

If you see a version number, Git is installed correctly.

## 2. Configure Git (Your Identity)

Git needs to know **who you are** so it can label your commits. This information shows up in your Git history and on GitHub.

In your terminal, run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

- Use the same **email address** you used (or will use) for **GitHub**.  
- Use your real or professional name — this appears in commit history.

Optional but recommended:

```bash
git config --global init.defaultBranch main
```

This makes all new repositories use `main` as the default branch name.

To confirm your settings:

```bash
git config --list
```

You should see `user.name`, `user.email`, and other configuration values.

## 3. Create or Log In to Your GitHub Account

If you don’t already have a GitHub account:

1. Go to 👉 **https://github.com**
2. Click **Sign up**.
3. Enter:
   - A **professional username** (this becomes part of your public URL)
   - Your **email**
   - A **strong password**
4. Follow the prompts to complete setup.
5. Check your email and click the **verification link** from GitHub.

If you already have an account, simply log in and make sure you can access your dashboard.

## 3.1 Secure Your GitHub Account Using an Authenticator App (Recommended)

GitHub strongly encourages adding **Two-Factor Authentication (2FA)**, and many organizations require it.

The most secure method is using an **authenticator app**.  
This protects your GitHub account when:

- Logging into the GitHub website  
- Approving GitHub actions from VS Code  
- Managing SSH keys and tokens  
- Changing security settings  

### Steps to Enable 2FA Using an Authenticator App

1. Click your profile picture → **Settings**
2. In the left menu choose **Password and authentication**
3. Find **Two-factor authentication**
4. Click **Enable two-factor authentication**
5. Choose **Set up using an app**

GitHub will show a **QR code**.

### Install an Authenticator App (If Needed)

Any of these will work:

- Google Authenticator  
- Authy  
- 1Password Authenticator  
- Microsoft Authenticator  

### Connect the App

1. Open your authenticator app  
2. Tap **Add account** → **Scan QR code**  
3. Scan the GitHub QR code  
4. Your app will begin generating **6‑digit codes** every 30 seconds  

### Verify the Setup

1. Enter the 6‑digit code from your authenticator app  
2. Click **Enable**

### Download Your Recovery Codes

GitHub provides **10 backup codes**.  
Save them somewhere safe—they allow you back into your account if you lose your phone.

## 4. Connect Git to GitHub (Authorization)

GitHub **no longer allows passwords** for Git operations.  
You must authorize using one of these:

- **Option A:** SSH key (recommended)  
- **Option B:** Personal Access Token (HTTPS)  

You only need **one**, not both.

> 💡 Your authenticator app protects your GitHub *account*, but Git operations (push/pull) still require SSH or a token.

## 4.1 Option A — Connect Using SSH (Recommended)

SSH uses a **key pair** to securely connect your computer to GitHub.

### Step 1: Check for Existing SSH Keys

Run:

```bash
ls ~/.ssh
```

If you see files like `id_ed25519` or `id_rsa`, you may already have keys.  
If not, create a new one.

### Step 2: Generate a New SSH Key

Run:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

- Press **Enter** to accept the default file location  
- Optionally add a passphrase  

This creates:

- `id_ed25519` → your **private key**  
- `id_ed25519.pub` → your **public key** (you upload this to GitHub)

### Step 3: Copy Your Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire line.

### Step 4: Add the SSH Key to GitHub

1. Open GitHub  
2. Go to **Settings → SSH and GPG keys**  
3. Click **New SSH Key**  
4. Name it (e.g., “My Laptop”)  
5. Paste your public key  
6. Click **Add SSH key**  

### Step 5: Test the SSH Connection

```bash
ssh -T git@github.com
```

Type **yes** if prompted.

You should see:

> Hi your-username! You’ve successfully authenticated…

You're now authenticated using SSH.

SSH repository URL example:

```bash
git@github.com:your-username/your-repo.git
```

## 4.2 Option B — Connect Using HTTPS + Personal Access Token (PAT)

If you prefer HTTPS, you must use a token instead of a password.

### Step 1: Create a Personal Access Token

1. Log in to GitHub  
2. Go to **Settings → Developer settings → Personal access tokens**  
3. Choose **Tokens (classic)** or **fine-grained tokens**  
4. Click **Generate new token**  
5. Give it a name (e.g., “Laptop Token”)  
6. Set an expiration  
7. Enable permissions (at least **repo**)  
8. Generate and **copy** the token  
   - You won’t see it again after closing the page  

### Step 2: Use Your Token in Place of a Password

When Git asks for your password during a push:

- **Username:** your GitHub username  
- **Password:** your token  

Your HTTPS remote URL looks like:

```bash
https://github.com/your-username/your-repo.git
```

You may allow your system to remember it using Credential Manager.

---

This updated section now includes full GitHub setup, secure authentication with an authenticator app, SSH setup, and HTTPS token setup.


## 5. Test Your Setup: Create and Push a Repository

Now let’s verify that everything works end-to-end.

### 5.1 Create a Local Project

In your terminal:

```bash
mkdir my-first-repo
cd my-first-repo
echo "# My First Repo" > README.md
```

Initialize a new Git repository:

```bash
git init
```

Track the README file and commit it:

```bash
git add README.md
git commit -m "Initial commit"
```
### 5.2 Create a Matching Repository on GitHub

1. Go to GitHub.  
2. Click the **+** icon in the top-right → **New repository**.  
3. Name it: `my-first-repo`.  
4. Choose **Public** or **Private**.  
5. **Do not** add a README, `.gitignore`, or license here (you already created a README locally).  
6. Click **Create repository**.

GitHub will show you the repo page with instructions and both **SSH** and **HTTPS** URLs.

### 5.3 Connect Your Local Repo to GitHub

If you used **SSH**, run:

```bash
git remote add origin git@github.com:your-username/my-first-repo.git
```

If you used **HTTPS**, run:

```bash
git remote add origin https://github.com/your-username/my-first-repo.git
```

You can verify the remote with:

```bash
git remote -v
```

### 5.4 Push Your Code to GitHub

Run:

```bash
git branch -M main
git push -u origin main
```

- `git branch -M main` ensures your branch is named `main`.  
- `-u` sets `origin main` as the default tracking branch, so next time you can just use `git push`.

If you’re using HTTPS and a token, you’ll be prompted for credentials.

### 5.5 Confirm Everything Worked

1. Go back to your GitHub repository page.  
2. Refresh the page.  
3. You should see:
   - Your `README.md` file  
   - Your commit history with your name and message  

## You’ve now:

- Installed Git  
- Configured your identity  
- Created or logged into GitHub  
- Set up secure authentication (SSH or HTTPS token)  
- Created a local repo and pushed it to GitHub  

>You’re ready to start using Git and GitHub for real projects, assignments, and portfolio work.

## What's next:

Now that Git and GitHub are set up, the next step is learning the core skills you’ll use every day as a developer. 

Here are the rest of the resources for this topic.

1. [Essential Git Workflow](1-workflow.md)
2. [Team Workflow](2-team-workflow.md)  
3. [Basic Exercises](3-exercises.md)
