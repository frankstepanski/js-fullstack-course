# Publish Your HTML & CSS Site with GitHub Pages 

When you build a basic website with **HTML and CSS**, you still need a place for it to *live* so other people can access it. This is called **hosting**.

At a high level, hosting means:

- Your files live on a server
- That server is connected to the internet 24/7
- Visitors access your site through a public URL

For simple, static websites (no databases, no login systems, no backend code), hosting can be **very simple and often free**.

## Common Hosting Options for Simple Websites

Here are some popular options you’ll see as a beginner:

### 1. GitHub Pages (What We’re Using)

- Designed for **static sites** (HTML, CSS, JavaScript)
- Files come directly from a GitHub repository
- Automatically rebuilds your site when you push code
- Great for portfolios, class projects, demos, and documentation
- **Cost:** Free

### 2. Netlify / Vercel

- Modern hosting platforms focused on frontend projects
- Drag-and-drop or Git-based deployments
- Support more advanced workflows later (build tools, frameworks)
- **Cost:** Free tier for simple projects

### 3. Traditional Web Hosting (Not Needed Yet)

- Examples: Bluehost, GoDaddy, shared hosting
- Usually requires payment
- More complex setup (FTP, control panels)
- Overkill for beginner HTML/CSS projects

## How GitHub Pages Works (Conceptually)

GitHub Pages takes:

- A GitHub repository
- Looks for an `index.html` file
- Serves those files directly to the browser

Every time you push to the selected branch:

1. GitHub detects changes
2. Rebuilds the site automatically
3. Updates the live URL

This makes GitHub Pages perfect for learning:

- Git
- GitHub
- Version control
- Publishing real websites

## Quick Recap: Steps 1–5 (The Setup Stuff)

Before you can publish, you need to have already done **all of the following**:

- ✅ Created a GitHub account
- ✅ Installed Git on your computer
- ✅ A project folder with an `index.html` file at the root
- ✅ Initialized Git, committed your files, and pushed them to GitHub
- ✅ Your code is visible in a **GitHub repository** on the `main` branch

If you can open your repo on GitHub and see your files, you’re ready.

**Now let’s skip straight to the part that matters: putting it live.**

## Step 6: Turn Your Repo Into a Live Website (GitHub Pages)

This step publishes your site to a public URL.

### 1. Open Your Repository on GitHub
Go to your repo’s main page where you see your files.

### 2. Open Settings
Click the **Settings** tab near the top of the repository.

### 3. Go to Pages
In the left sidebar, click **Pages** (usually under **Code and automation**).

### 4. Configure GitHub Pages
Under **Build and deployment**:

- **Source** → `Deploy from a branch`
- **Branch** → `main`
- **Folder** → `/ (root)`

Click **Save**.

### 5. View Your Live Site
After a short moment, GitHub will show a message like:

```
Your site is live at:
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Open that link in your browser.

🎉 **Your website is now live on the internet.**

## Updating Your Site Later

Any time you make changes to your files:

```bash
git add .
git commit -m "Update site"
git push
```

>GitHub Pages will automatically redeploy your site. Refresh the page after a minute to see updates.

## Common Gotchas (Quick Checks)

### Site not showing?
- Make sure `index.html` is at the root of the repo
- Confirm GitHub Pages is set to `main / (root)`

### CSS or images not loading?
- Check file paths (they are case-sensitive)
- Make sure files exist in the GitHub repo

## Key Takeaways

- Static HTML and CSS sites need hosting, and GitHub Pages provides a simple, free way to publish them online

- GitHub Pages serves files directly from a GitHub repository and automatically updates the live site when you push changes

- Publishing a site with GitHub Pages reinforces core Git skills like committing, pushing, and managing a repository

- The result is a real, public website URL suitable for portfolios, class projects, and sharing your work.

## What's Next: Team Workflows

We’ll shift from working alone to working with others by learning how teams use Git and GitHub safely. You'll be introduced to branches, pull requests, and code reviews, and learn how these tools help multiple people work on the same project without overwriting each other’s changes.