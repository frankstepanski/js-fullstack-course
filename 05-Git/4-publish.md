# How to Publish Your HTML & CSS Website With GitHub Pages

This guide walks you through how to:

1. Take a **local project folder** (HTML + CSS).
2. Push it to a **GitHub repository**.
3. Turn it into a **live website** using GitHub Pages.

You can re-use this as a template for your own projects.

## 1. What You Need

Before you start, make sure you have:

- A **GitHub account**:  
  - If you don’t have one, sign up at https://github.com
- **Git** installed on your computer:
  - Check in a terminal:  
    ```bash
    git --version
    ```
  - If it says “command not found”, install Git from https://git-scm.com
- A project folder with your website files:
  - At minimum: `index.html`
  - Optional: `css/` folder, `images/` folder, etc.

## 2. Check Your Project Folder

Make sure your project looks something like this:

```text
my-website/
  index.html
  css/
    style.css
  images/
    logo.png
```

- Your main page **must** be called `index.html` for GitHub Pages to load it as the homepage.

## 3. Initialize a Local Git Repository

Open a **terminal** (or Git Bash on Windows) and:

1. Go into your project folder:

   ```bash
   cd path/to/my-website
   ```

2. Turn the folder into a Git repository:

   ```bash
   git init
   ```

3. Tell Git to track your files:

   ```bash
   git add .
   ```

4. Make your first commit:

   ```bash
   git commit -m "Initial commit: HTML & CSS site"
   ```

Now your project folder is a local Git repo with one commit.

## 4. Create a New GitHub Repository

1. Go to https://github.com and log in.
2. Click the **+** icon (top-right) → **New repository**.
3. Choose a **Repository name** (example: `moonlight-pizza-site`).
4. Set **Public** so others can see it.
5. **Do not** initialize with a README, `.gitignore`, or license  
   (you already have a local repo).
6. Click **Create repository**.

GitHub will show you a page with instructions on how to connect your local repo.

## 5. Connect Local Repo to GitHub

On the new repo page, GitHub will show a section like:

> …or push an existing repository from the command line

It will look similar to this:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

Back in your terminal (inside your project folder), run:

1. Add the remote:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```

   - Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual values.

2. Make sure your main branch is called `main`:

   ```bash
   git branch -M main
   ```

3. Push your local code up to GitHub:

   ```bash
   git push -u origin main
   ```

You may be asked to log in or authorize with GitHub the first time.

After this, if you refresh the repo page on GitHub, you should see your files.

## 6. Turn the Repo Into a Live Website (GitHub Pages)

1. Go to your repository on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar, find **Pages** (sometimes under “Code and automation”).
4. Under **Build and deployment**:
   - **Source**: choose `Deploy from a branch`.
   - **Branch**: select `main` and `/ (root)` as the folder.
5. Click **Save**.

GitHub will build your site.  
After a short time, you should see a message like:

> Your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

Open that link in your browser to see your published HTML & CSS website.

## 7. Updating Your Site Later

Whenever you make changes to your files, you can update the live site with these steps:

1. Save your changes in your editor (VS Code, etc.).
2. In the terminal, check your status:

   ```bash
   git status
   ```

3. Stage the changed files:

   ```bash
   git add .
   ```

4. Commit with a message:

   ```bash
   git commit -m "Update styles and content"
   ```

5. Push to GitHub:

   ```bash
   git push
   ```

GitHub Pages will automatically re-deploy your site after the push.  
Refresh your live site URL after a minute or two to see the new version.

## 8. Common Mistakes & Troubleshooting

**1. I don’t see my site on the GitHub Pages URL**

- Check that:
  - You set the **branch** to `main` and folder to `/ (root)` in **Settings → Pages**.
  - Your `index.html` file is at the **root** of the repo (not inside another folder).

**2. I get a 404 error**

- Wait a few minutes. The first deploy can take a short while.
- Double-check the URL format:  
  `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

**3. My CSS or images aren’t loading**

- Check your file paths:
  - Example in `index.html`:
    ```html
    <link rel="stylesheet" href="css/style.css">
    <img src="images/logo.png" alt="Logo">
    ```
  - Make sure `css/style.css` and `images/logo.png` actually exist in the repo.

**4. Git commands not working**

- Make sure you’re inside the correct folder in the terminal:
  ```bash
  pwd   # Mac/Linux
  cd    # Windows (just prints current dir in PowerShell)
  ```
- Check that Git is installed:
  ```bash
  git --version
  ```

## 10. Optional: Good README Basics for Your Repo

It’s helpful to add a `README.md` to your repo so visitors know what your project is.

You can start with:

```markdown
# Project Title

Short description of what your website is and who it’s for.

## Live Demo

View the site here: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/

## Tech Stack

- HTML
- CSS
- GitHub Pages
```

Then commit and push:

```bash
git add README.md
git commit -m "Add README"
git push
```

Your project is now:

- Version-controlled with Git  
- Hosted on GitHub  
- Live on the internet via GitHub Pages 🎉
