# Computer and Networking Basics

Understanding how computers and networks work under the hood helps you become a better software developer.  
Before writing your first program or building a website, it’s important to understand the **environment your code runs in** — your computer, operating system, terminal, and the internet itself.

## 1. Operating Systems: Managing Files and Folders

An **Operating System (OS)** is the software that controls your computer’s hardware and lets you interact with it.

Common operating systems:
- 🪟 **Windows**
- 🍎 **macOS**
- 🐧 **Linux** (often used by developers and servers)

The operating system:
- Manages **files and folders** (your data)
- Runs **applications** (like browsers and code editors)
- Handles **hardware** (like the keyboard, mouse, and memory)
- Controls **permissions** (who can access what)

When developing software, you’ll constantly **navigate between folders**, **create new files**, and **run programs** — often using a tool called the **terminal**.

## 2. What Is the Terminal?

The **terminal** (also called the **command line**) is a text-based interface that lets you **control your computer directly** — no clicking, just typing commands.

Instead of using your mouse to open files or folders, you **type commands** to tell the computer what to do.

### Why Developers Use It
- It’s **faster** for repetitive tasks.  
- It’s **more powerful** for automating workflows.  
- It’s how you interact with many **developer tools** (like Git, Node.js, or Python).

### Terminals on Different Systems

| System | Terminal Name | Description |
|--------|----------------|--------------|
| **Windows** | Command Prompt (`cmd`) or PowerShell | Used for Windows commands. PowerShell is more modern and powerful. |
| **macOS / Linux** | Terminal | Runs a Unix shell (like **bash** or **zsh**), which uses slightly different syntax. |

Both are used to:
- Navigate folders  
- Create, move, and delete files  
- Run programs  
- Manage development tools  

> 💡 **In short:** The terminal is your “control center” — it talks directly to your computer without a graphical interface.

## 3. Basic Terminal Commands (Windows vs. Mac)

Here are some of the most common commands you’ll use daily.

| Action | Windows Command | macOS / Linux Command | What It Does |
|--------|-----------------|------------------------|--------------|
| Show files and folders | `dir` | `ls` | Lists what’s in your current folder |
| Change folder | `cd foldername` | `cd foldername` | Moves into another folder |
| Go up one folder | `cd ..` | `cd ..` | Moves up to the parent folder |
| Create a folder | `mkdir myFolder` | `mkdir myFolder` | Makes a new folder |
| Delete a folder | `rmdir myFolder` | `rm -r myFolder` | Removes a folder (careful!) |
| Clear screen | `cls` | `clear` | Clears the terminal window |

Example (macOS/Linux):
```bash
cd Documents
mkdir projects
cd projects
ls
```

Example (Windows):
```cmd
cd Documents
mkdir projects
cd projects
dir
```

---

### Why Knowing Your Current Directory Matters

When you type commands, your terminal always works **from the current directory** (also called your **working directory**).

To see where you are:
- On Windows: `cd`
- On macOS/Linux: `pwd` (print working directory)

> 💡 If you’re in the wrong directory, your commands may fail or affect the wrong files — so always double-check where you are before running commands.

## 4. Basics of Computer Networking

Your computer doesn’t live in isolation — it connects to other computers through **networks** like your home Wi-Fi or the internet.

When two computers “talk” to each other, they follow a set of rules called **network protocols**.

### What Are Protocols?

A **protocol** is a rule or standard for how data is sent and received across a network.

Some key protocols:
| Protocol | Purpose |
|-----------|----------|
| **IP (Internet Protocol)** | Assigns addresses to computers so they can find each other. |
| **TCP (Transmission Control Protocol)** | Ensures data is sent reliably and in the correct order. |
| **UDP (User Datagram Protocol)** | Sends data faster but without error-checking (used for streaming and gaming). |
| **DNS (Domain Name System)** | Translates domain names (like `google.com`) into IP addresses. |

## 5. Understanding IP Addresses

Every computer or device connected to a network has a unique **IP address** — like a digital “home address.”

Example:  
```
192.168.1.5
```

When your computer sends data to another device, it uses the IP address to know **where to deliver** it — similar to how the postal system uses home addresses.

There are two main types:
- **IPv4** (e.g., `192.168.0.1`)
- **IPv6** (e.g., `2001:0db8:85a3::8a2e:0370:7334`) — newer and longer, supports more devices.

> 💡 In short: IP addresses make it possible for computers to “find” and communicate with each other across the world.

##  6. What Is HTTP (and HTTPS)?

When you browse a website, your computer (the **client**) sends a **request** to another computer (the **server**) that hosts that website.

This communication uses a protocol called **HTTP** — HyperText Transfer Protocol.

### How It Works

1. You enter a web address like `https://example.com`  
2. Your computer sends a **request** to that server asking for a webpage.  
3. The server **responds** with the HTML, CSS, and images.  
4. Your browser displays the webpage.

This is called the **client-server model**:
```
You (Client) ⇄ Request/Response ⇄ Server (Website)
```

### What About HTTPS?

**HTTPS** (HyperText Transfer Protocol Secure) is the **secure version** of HTTP.

- It uses **encryption (SSL/TLS)** to protect data.  
- Prevents hackers from reading or tampering with your data.  
- It’s now the **default** for all modern websites.

> 💡 Always look for the 🔒 padlock icon in your browser — it means HTTPS is active and your connection is secure.

## 7. Local Servers and `127.0.0.1`

When you build web apps as a developer, you’ll often use a **local server** — a mini server running on your own computer.

By default, most local servers use:
```
http://127.0.0.1
```
or  
```
http://localhost
```

This IP address (`127.0.0.1`) is called the **loopback address** — it refers to *your own computer*.

###  Why It’s Useful
- Lets you test websites **before publishing them** online.  
- Commonly used by tools like **Visual Studio Code**, **Node.js**, or **Python’s Flask**.  
- Example:  
  When you run a React app locally, it might say:  
  `Server running at http://127.0.0.1:3000`

That means your app is running **on your computer**, not yet on the public internet.

## 8. The Big Picture: How It All Works Together

Let’s connect everything you’ve learned — from files on your computer to how they become websites that people can see online.

1. **You create files on your computer** using your **operating system** (like macOS or Windows).  
   These might include HTML, CSS, and JavaScript files for a website.

2. You manage those files using the **terminal** — navigating folders, creating project directories, and running commands like `npm start` or `python app.py` to launch your code.

3. When your project runs locally, your computer acts as a **local server**, using the **loopback IP address** (`127.0.0.1`) to simulate a website environment.

4. Once your project works locally, you can **deploy** it online.  
   This means uploading your files to a **web server** (like AWS, Netlify, or Vercel).  
   The web server assigns your site an **IP address** and links it to a **domain name** (like `myportfolio.com`).

5. When someone visits your website:  
   - Their browser sends an **HTTP or HTTPS request** to your web server.  
   - The server finds your files and **responds** by sending them back.  
   - The user’s browser displays your page.

### In Simple Terms:

| Step | Role | Example |
|------|------|----------|
| You create files | OS + Editor | `index.html`, `style.css` |
| You test locally | Terminal + Localhost | `http://127.0.0.1:3000` |
| You deploy online | Hosting service | `https://mywebsite.com` |
| Others access it | Internet + Protocols | Requests & responses via HTTP/HTTPS |

> 💡 **Everything connects:** Your OS stores files → your terminal manages them → your server delivers them → and the internet protocols (IP, DNS, HTTP/HTTPS) make them reachable to anyone, anywhere.

## Why These Concepts Matter for Developers

Understanding these basics helps you:
- Use tools like Git, Node, or Python confidently in the terminal.  
- Troubleshoot common issues (e.g., “Why can’t my server connect?”).  
- Understand how your code moves from your computer → the internet → to a user’s browser.  
- Build confidence as you move into web development, APIs, and cloud computing.

---

>  **In short:**  
> The computer is your workshop, the terminal is your control panel, and the internet is your delivery route.  
> Mastering these fundamentals gives you the foundation to build and share real-world software with confidence.
