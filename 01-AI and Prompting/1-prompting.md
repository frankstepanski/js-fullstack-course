# Prompting Guide for Beginners

## Interacting With Generative AI

Unlike traditional software, generative AI systems are usually
controlled using **natural language instructions**.

These instructions are called **prompts**.

A **prompt** is the message you send to an AI system describing the task
you want it to perform.

Prompts tell the AI:

-   what task you want it to perform
-   what context it should consider
-   what format the output should follow

Instead of writing commands or clicking buttons, you can **describe what
you want using normal language**.

For example, a developer might ask an AI tool to:

-   explain a programming concept
-   generate a small code example
-   help debug an error
-   review a piece of code
-   suggest improvements

### Example Prompt

    Explain how HTML links work for a beginner web developer.
    Include a simple example using an anchor tag.

This prompt contains:

-   a **topic**
-   a **learning level**
-   a **request for an example**

Clear prompts help AI generate clearer responses.

## What Makes a Good Prompt

A simple question can work as a prompt, but the most useful prompts are
**structured and intentional**. Instead of leaving the AI to guess what
you want, you give it enough information to respond usefully on the
first try.

The clearest way to see this is by comparing a weak prompt to an
improved one.

### Weak Prompt

    Explain CSS classes.

This prompt is very short, but it leaves many questions unanswered:

-   Who is the explanation for?
-   How detailed should it be?
-   Should it include examples?

Because the prompt is vague, the response may not be very useful.

### Improved Prompt

    Explain how CSS classes work.

    My background: I understand HTML but I am new to CSS.

    Please provide:
    1. A simple explanation
    2. A small code example
    3. A short explanation of how the code works

This version works better because it clearly communicates:

-   the **task** (explain CSS classes)
-   the **context** (HTML knowledge but new to CSS)
-   the **format** (explanation + code example)

## The Key Components of a Prompt

Most strong prompts include three core components, plus an optional
fourth.

| Component | Purpose | Example |
|-----------|---------|---------|
| **Instruction** | The main task the AI should perform | *Explain how CSS classes work.* |
| **Context** | Background information that helps the AI tailor the answer | *I understand HTML but I am new to CSS.* |
| **Output Format** | Tells the AI how the response should be organized | *Provide an explanation, a code example, and an explanation of the code.* |
| **Role** *(optional)* | Sets the perspective or persona the AI should use | *Act as a beginner-friendly web development tutor.* |

**A note on roles.** Telling the AI to "act as a senior engineer" or
"act as a tutor" can sometimes help with tone, but its impact is
smaller than many guides suggest. Modern AI tools are already good at
adjusting to your audience when you describe it in the **context**.
Treat role as an optional tool, not a required ingredient.

The more clearly you explain what task to complete, what background
matters, and what kind of answer you want, the better the result will
usually be.

## Iterative Prompting

**This is the most important prompting habit to build.**

When working with AI tools, you rarely get the perfect answer on the
first try — and you shouldn't expect to. Effective developers treat
prompting as a **conversation**, not a single command.

Instead of writing one perfect prompt, developers typically:

1. Ask an initial question
2. Review the response
3. Clarify or refine the prompt
4. Ask follow-up questions

### Example of Iteration

**Initial Prompt**

```
Explain JavaScript closures.
```

The response is technically correct but too abstract.

**Follow-Up Prompt**

```
Explain JavaScript closures for a beginner and include a simple example.
```

Better — but the example is confusing.

**Refinement Prompt**

```
Rewrite the explanation using a real-world analogy.
```

Now the concept finally clicks.

Each step improves the clarity of the response. Beginners often give up
after the first answer isn't quite right. Instead, keep going — ask the
AI to simplify, expand, use an analogy, give a different example, or
focus on a specific part.

## Verifying the Output

Getting a response is only half the job. The behavior that separates
effective AI users from ineffective ones is **reading the output
critically** instead of trusting it.

AI tools can:

-   invent functions or APIs that do not exist
-   mix up syntax between languages
-   give outdated information
-   sound confident while being completely wrong

Before using anything the AI generates, make a habit of:

-   **reading the response carefully** — don't skim
-   **testing any code** in a real environment
-   **checking claims against official documentation** for anything
    important
-   **asking yourself**: "do I actually understand why this works?"

If you don't understand the answer, ask the AI to explain it — or find
a source that does. Copying code you don't understand is how bugs and
security issues enter a codebase.

## Common Prompting Mistakes Beginners Make

When people first start using AI tools, they often write prompts that
are too vague or missing important information. Because AI systems rely
heavily on the instructions they receive, unclear prompts produce
unclear answers.

| Mistake | Example Prompt | Why This Is a Problem | Better Approach |
|--------|---------------|----------------------|-----------------|
| **Too Vague** | `Explain JavaScript.` | JavaScript is a huge topic. The response may be too broad or not relevant to your needs. | Be specific about the concept and your experience level. *"Explain JavaScript functions for a beginner who understands HTML and CSS."* |
| **No Context** | `Fix this code.` | The AI does not know what the code is supposed to do, what environment it runs in, or what error occurred. | Include the code, the error message, and the expected behavior. |
| **Too Many Questions at Once** | `Explain CSS, React, and debugging.` | Asking multiple unrelated questions produces shallow or incomplete answers. | Break large requests into smaller prompts and ask them one at a time. |
| **No Structure** | `Write about HTML.` | The response may be unorganized or difficult to follow. | Ask for a specific format: *"Explain HTML for beginners and include: 1) a short explanation, 2) a code example, and 3) a summary."* |
| **Trusting the First Answer** | *(any prompt, no follow-up)* | The first response often has inaccuracies, outdated info, or missing pieces. | Verify the output, ask follow-up questions, and refine. |

## Protecting Sensitive Information

AI chatbots often log or train on the conversations you send them.
Before pasting anything into a prompt, make sure it doesn't include:

-   passwords or API keys
-   access tokens or credentials
-   private customer or user data
-   proprietary code your employer hasn't approved for external tools
-   personal information about other people

When in doubt, replace sensitive values with placeholders
(`API_KEY_HERE`, `user@example.com`) before sending.

## Developer Workflow with AI

Modern developers often integrate AI into their **daily workflow**. A
typical development process might look like this:

```
Learn Concept
     ↓
Generate Example Code
     ↓
Write Real Code
     ↓
Debug Errors
     ↓
Review and Improve Code
```

The table below shows common ways developers use AI during everyday
programming tasks, along with an example prompt for each.

| Task | When to Use It | Example Prompt |
|------|----------------|----------------|
| **Learning a concept** | Studying a new technology or concept | `Explain how CSS Flexbox works for a beginner web developer. Include a simple example and explain when developers typically use Flexbox.` |
| **Generating code** | Need a small working example or starter code | `Create a simple HTML and CSS example that centers a div horizontally and vertically. Explain how the CSS works.` |
| **Debugging code** | An error occurs or code does not behave as expected | `Here is my JavaScript code and the error message I am getting. Explain what the error means and suggest possible fixes.` |
| **Code review** | Improving code quality and readability | `Review the following JavaScript code and suggest improvements for readability, best practices, and potential bugs.` |
| **Refactoring** | Simplifying or reorganizing working code | `Refactor this JavaScript function to improve readability while keeping the same functionality.` |
| **Writing documentation** | Explaining code, functions, or APIs | `Write documentation comments for this JavaScript function explaining what it does, its parameters, return value, and how to use it.` |

### Worked Example: Debugging with AI

Debugging is one of the most powerful uses of AI for developers. Here's
what an effective debugging prompt looks like in practice:

    Here is my JavaScript code and the error I'm receiving.

    Code:
    function getUser(id) {
      return users.find(u => u.id = id);
    }

    Error:
    TypeError: Cannot read properties of undefined

    Expected behavior: the function should return the user object
    whose id matches the input.

    Explain what's wrong and suggest a fix.

This prompt works because it includes the **code**, the **error
message**, and the **expected behavior** — the three things the AI
needs to help you. A vague "fix my code" prompt would not.

Whatever the task, remember: AI output is a **starting point**, not a
finished solution. Test it, review it, and make sure you understand it
before using it.

## AI Chatbot Tools for Developers

AI chatbots are chat-based assistants you interact with through a
conversation interface using natural language prompts. The tools below
are widely available and offer **free tiers**.

| Tool | Company | Website | Notes |
|------|---------|---------|-------|
| ChatGPT | OpenAI | https://chat.openai.com | One of the most widely used AI tools |
| Claude | Anthropic | https://claude.ai | Often strong at structured explanations and longer reasoning |
| Gemini | Google | https://gemini.google.com | Integrated with the Google ecosystem |
| Perplexity | Perplexity AI | https://perplexity.ai | Provides sources for its answers; good for research |
| Poe | Poe (by Quora) | https://poe.com | Access to multiple AI models in one interface |
| HuggingChat | Hugging Face | https://huggingface.co/chat | Open-source AI chat models |

Free tiers, model availability, and features change often — check each
tool's site for current details. This guide focuses on chatbot-style
tools, not AI assistants built directly into code editors.

## Key Takeaways

-   A **prompt** is a natural-language instruction to an AI.
-   Strong prompts have an **instruction**, **context**, and **output
    format**. Role is optional.
-   **Iterate.** Refine your prompt based on the response. Don't expect
    a perfect answer on the first try.
-   **Verify.** Read the output carefully, test any code, and check
    claims against documentation.
-   **Never paste sensitive data** — credentials, private info, or
    proprietary code — into an AI tool.
-   AI is a **learning assistant**, not a source of truth.

### Next Steps: Hallucinations

Sometimes AI systems generate answers that **sound correct but are
actually wrong**. This can happen when the model:

-   guesses missing information
-   blends together different pieces of knowledge
-   invents APIs or functions that do not exist
-   provides outdated information
