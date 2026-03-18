# Using AI in VS Code

Now that you have learned the basics of AI, prompting, and using AI
chatbots, the next step is learning how AI can help you **while you are
actually writing code**.

So far, you have mostly used AI in a browser by asking questions in
tools like ChatGPT or Claude.

That is helpful for:

-   learning concepts
-   asking questions
-   getting explanations
-   planning solutions

But developers do not only use AI in a browser.

They also use AI **directly inside their code editor**.

You can think of VS Code as your **home base** for writing, editing, and
testing code.

When AI is added to VS Code through extensions, it can act like a
**coding assistant inside your editor**.

## How AI Fits Into Your Workflow

Before AI, a beginner workflow often looked like this:

``` text
Write code → Search for help → Try a solution → Repeat
```

With AI, the workflow can become:

``` text
Write code → Get suggestions → Test → Improve
```

AI can make the process faster, but you still need to:

-   read the code
-   understand the idea
-   test the result
-   decide whether the suggestion is correct

👉 AI can speed up your workflow, but it does not replace your thinking.

### AI Developer Workflow

``` text
Chat AI helps you understand
            ↓
Plan what to build
            ↓
VS Code AI helps you write code faster
            ↓
Run your code
            ↓
Test and debug
            ↓
Return to Chat AI if you need more explanation
            ↓
Repeat
```

This means developers often move back and forth between:

- Thinking and understanding
- Building and testing

#### Visual:

              💬 AI Chatbots
            (Think & Understand)
                       ↓
            ┌───────────────────┐
            │   Plan Solution   │
            └───────────────────┘
                       ↓
            💻 VS Code + AI 
                  (Build Code Faster)
                       ↓
            ┌───────────────────┐
            │   Run Your Code   │
            └───────────────────┘
                       ↓
            ┌───────────────────┐
            │   Test & Debug    │
            └───────────────────┘
                       ↓
            💬 Back to Chatbots (if stuck)
                       ↓
                 🔁 Repeat Loop



## Chat AI vs VS Code AI --- What's the Difference?

Now that you have already used AI chatbots, it is important to
understand:

> AI behaves differently depending on where you use it.

### Chat AI (Browser Tools)

Tools like Claude, Gemini, Grok and ChatGPT  are best for:

-   learning new concepts
-   asking beginner questions
-   getting explanations
-   planning a solution
-   understanding an error message
-   comparing different approaches

Think of Chat AI as your:

> **thinking partner**

It helps you understand ideas before or during coding.

#### Example beginner uses:

-   "Explain what HTML does."
-   "What is the difference between a class and an id in CSS?"
-   "Why is my JavaScript giving an error?"
-   "Can you explain this more simply?"

---

### VS Code AI (Editor Tools)

AI inside VS Code works while you are coding.

These tools are best for:

-   suggesting code as you type
-   completing repetitive code
-   generating small functions
-   helping with syntax
-   speeding up common tasks
-   assisting while you build

Think of VS Code AI as your:

> **coding partner**

It helps you write code faster, but it does not automatically know what
your project should do.

| Chat AI | VS Code AI |
|---|---|
| Explains ideas | Suggests code |
| Helps you learn | Helps you build |
| Good for questions | Good for coding speed |
| Usually used before or between coding | Usually used during coding |----------------------------------------

#### Example beginner uses:

-   autocomplete an HTML structure
-   suggest CSS properties
-   help finish a JavaScript function
-   generate a repeated pattern of code


### How They Work Together

The most effective developers often use both tools together.

A simple example might look like this:

#### Example workflow

1.  Ask Claude/Gemini/ChatGPT: "Explain how a button click works in JavaScript."

2.  Read the explanation and example.

3.  Open VS Code and start writing your code.

4.  Use VS Code AI to help autocomplete parts of the function.

5.  Run the code in the browser.

6.  If something breaks, go back to Chat AI and ask: "Why is this code
    not working?"

This creates a learning loop:

``` text
Learn → Build → Test → Ask → Improve
```

## 🚦 Beginner Rules for AI

When you are new to coding, AI can be very helpful — but only if you use it carefully.

These beginner rules will help you use AI as a **learning assistant**, not as something you blindly depend on.

### Rule 1: Don’t Auto-Accept Everything

When an AI suggestion appears in VS Code, do not accept it automatically.

Instead:

1. Read the suggestion  
2. Try to understand it  
3. Accept it only if it makes sense  
4. Test it in your code  
5. Ask questions if you are confused  

A good habit is:

> **Read first, accept second, test third.**

#### 🗣️ Why this rule matters

AI suggestions can look correct even when they are wrong.

If you accept code without reading it, you may:

- introduce bugs 
- copy patterns you do not understand
- make your project harder to debug later 

### Rule 2: Use AI to Support Understanding, Not Replace It

VS Code AI is **not** a replacement for understanding.

It should not be trusted blindly for:

- learning concepts you do not understand at all
- making important logic decisions for you 
- guaranteeing bug-free code 
- teaching you without verification 

If you are confused about *why* something works, go back to Chat AI or documentation and learn the concept.

#### 🗣️ Why this rule matters

AI can help you move faster, but speed is not the same as learning.

If you rely on AI without understanding the code, you may end up with code that works temporarily but that you cannot explain, fix, or improve later.

### Rule 3: Always Test AI-Generated Code

Whenever AI gives you code, run it and test it.

Check that:

- it actually works 
- it solves the problem you meant to solve 
- it does not create new errors 
- you understand what each part is doing

#### 🗣️ Why this rule matters

AI can generate code that:

- has syntax mistakes
- uses the wrong logic
- is outdated
- only partially solves the problem

Testing helps you verify whether the suggestion is actually useful.

---

### Rule 4: Ask Questions When You Do Not Understand Something

If AI gives you code or an explanation that confuses you, stop and ask follow-up questions.

For example:

- “Explain this more simply.”  
- “What does this line do?”  
- “Why are we using this function?”  
- “Can you show a smaller example?”  

#### 🗣️ Why this rule matters

AI should help you **learn**, not just copy code.

Asking follow-up questions turns AI from a code generator into a learning tool.

---

## 📖 Beginner Rule 5: Compare Important Answers with Documentation

Do not assume AI is always correct.

For important topics, compare the AI response with:

- official documentation 
- trusted course material 
- examples you have already learned 
- working code you tested yourself 

### 🗣️ Why this rule matters

AI can hallucinate, invent syntax, or give outdated answers.

Checking documentation helps you build good habits and stronger technical understanding.


## Free AI Tools for VS Code

AI extensions in VS Code can help you write code faster, understand code more clearly, and get assistance without leaving your editor.

However, not all tools work in the same way.

The table below compares several popular AI tools for VS Code so you can better understand what each one does, how it is commonly used, and what makes it useful in different situations.


| Tool | What It Is | Common Uses | Notes |
|---|---|---|---|
| [**Windsurf (Codeium)**](https://marketplace.visualstudio.com/items?itemName=Codeium.codeium) | An AI coding assistant inside VS Code with autocomplete and chat features. | Writing code faster, autocompleting functions, generating simple components, writing repetitive code, learning syntax. | Free to use. Includes both code suggestions and chat-style help inside the editor. |
| [**Claude Code**](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) | An AI assistant inside VS Code focused on explanation, reasoning, and code understanding. | Understanding code, explaining logic, improving code, refactoring. | Useful when you want help understanding *why* code works or how to improve it. |
| [**Codex (OpenAI)**](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) | A chat-based AI tool inside VS Code. | Asking coding questions, generating examples, debugging, getting explanations. | Works more like a chatbot inside the editor rather than only autocomplete. |
| [**GitHub Copilot**](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | An AI tool that provides real-time code suggestions while you type. | Writing code faster, completing functions, generating repeated patterns, speeding up development. | Focused on in-editor code suggestions and completion while coding. |

### Quick Comparison by Use

| If You Want To... | Possible Tool to Explore |
|---|---|
| Ask questions inside VS Code | **Codex (OpenAI)**, **Claude Code** |
| Get code suggestions while typing | **Windsurf (Codeium)**, **GitHub Copilot** |
| Understand code more deeply | **Claude Code** |
| Generate quick starter code | **Windsurf (Codeium)**, **GitHub Copilot** |
| Debug or discuss code in chat form | **Codex (OpenAI)**, **Claude Code** |

## Summary

Using AI in VS Code can make coding feel faster, smoother, and less intimidating for beginners.

Instead of only using AI in a browser, you can also use AI directly inside your editor to help with suggestions, repetitive code, syntax, and small coding tasks while you work.

The most important thing to remember is that these tools should be used as **helpers**, not as replacements for your own understanding.

As a beginner, your goal is not just to get code that works.

Your goal is to:

- understand what the code does
- test AI-generated suggestions
- ask questions when you are confused
- build good habits while learning

A simple way to remember this section is:

```text
Chat AI helps you think
VS Code AI helps you build