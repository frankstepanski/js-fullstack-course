# AI Limitations: Hallucinations and Incorrect Answers
AI tools are powerful, but they are not perfect sources of information.

When using AI to learn programming or generate code, it is important to understand one of the most common limitations of large language models: hallucinations.

Because of this, AI can sometimes produce answers that:

-   sound confident
-   look correct
-   but are factually wrong

This behavior is called a **hallucination**.

## What Is an AI Hallucination?

An **AI hallucination** is when a language model produces an answer
that sounds confident and plausible but isn't grounded in reality.

The confident tone is the part that makes hallucinations dangerous.
An obvious mistake is easy to catch. A hallucination reads like a
correct answer — clear sentences, reasonable structure, believable
details — while being wrong.

A hallucinated answer may be:

-   factually incorrect
-   entirely invented
-   not supported by the information you provided
-   based on something that does not exist at all

### Example: Invented HTML or CSS Feature

A common type of hallucination happens when developers ask about HTML
or CSS features. For example, a developer might ask:

```
Explain the HTML tag <flex-container>.
```

An AI system might respond with a detailed explanation like:

> The `<flex-container>` tag is used to create a flexible layout in HTML.
> It works with child elements that automatically adjust their size and
> position.

This answer might **sound reasonable**, but it is incorrect.

There is no `<flex-container>` HTML tag.

Flexible layouts are actually created using CSS Flexbox, not a
special HTML element. In this case, the AI generated an explanation based on patterns it has seen about flexbox layouts, but invented a tag that does not exist.

This is a common type of hallucination where AI systems create
plausible but incorrect HTML, CSS, or JavaScript features.

### Example: Invented Function

Another common hallucination is when the AI invents a function or
method that doesn't exist. For example:

```
How do I remove an item from a JavaScript array using array.remove()?
```

The AI might confidently respond with example code using
`array.remove(item)` — a method that **does not exist in JavaScript**.
JavaScript arrays have `splice()`, `filter()`, `pop()`, and `shift()`,
but no `remove()`. The AI blended patterns from languages that *do*
have a `remove()` method (like Python's lists) and produced
believable-looking JavaScript code that won't run.

Related hallucinations to watch for:

-   **Wrong method signatures** — real function name, invented
    parameters
-   **Mixed-up syntax** — Python conventions used in JavaScript, or
    vice versa
-   **Fabricated packages** — the AI suggests `npm install` for a
    package that was never published. This has become a real security
    issue: attackers sometimes publish malicious packages under names
    they've noticed AI tools invent.

Hallucinations tend to get **worse at the edges of the model's
knowledge** — obscure libraries, very new releases, or niche topics
where the training data was thin. The confident tone stays the same,
but the accuracy drops sharply.

### Why Hallucinations Happen

AI models do not look up answers in a database of verified facts.
Instead, they generate responses based on statistical patterns learned
during training.

> Some AI tools can also search the web (Perplexity, ChatGPT search,
> Claude with web search). This **reduces** hallucinations on factual
> questions but does not eliminate them — the model can still
> misinterpret or misquote what it finds.

Because the model is generating from patterns, it may:

-   combine different pieces of information
-   guess missing details
-   produce outdated knowledge
-   invent APIs or syntax

You can think of one common version of this as **knowledge blending**.

### Knowledge Blending

Knowledge blending happens when an AI combines:

    Information from your prompt
            +
    General knowledge from training
            ↓
    Generated answer

If the correct information is not present in the prompt, the AI may attempt to fill the gap using general knowledge.

This can lead to incorrect answers.

### Example of Knowledge Blending

A developer pastes a product description and asks a question:

```
Product Description:
"The InnovateBook Pro is a high-performance laptop with an M4
processor. It comes in Space Gray and Silver."

Question:
What is the warranty for the InnovateBook Pro?
```

The AI might respond:

> The InnovateBook Pro includes a one-year limited warranty.

This answer **sounds reasonable**, but it is **incorrect**. The
warranty information was never in the provided text. The AI guessed
based on typical electronics warranties — blending your prompt with
general knowledge from training.

## The Principle of Grounding

One of the best ways to prevent hallucinations is called **grounding**.

Grounding means:

-   Instructing the AI to base its answer **only on the information
    provided in the prompt**.

Instead of allowing the AI to use its general knowledge, we limit it to
a **specific source of truth**.

### Example: Grounded Prompt

Here's the same warranty question, rewritten as a grounded prompt:

```
Context:
"The InnovateBook Pro is a high-performance laptop with an M4
processor. It is made from recycled aluminum and comes in Space Gray
and Silver."

Instruction:
Using only the information provided in the context above, answer the
question. If the answer cannot be found in the text, respond with:
"The information is not available in the provided document."

Question:
What is the warranty for the InnovateBook Pro?
```

The AI now responds:

> The information is not available in the provided document.

This response is correct, because the warranty was never mentioned.

### Why Grounding Helps

Grounding prevents the model from:

-   inventing missing details
-   blending unrelated knowledge
-   generating misleading answers

It forces the model to rely on **specific information you provide**.

## How to Spot Possible AI Hallucinations

Even with good prompts and techniques like grounding, AI systems can
still produce incorrect answers. Developers need to recognize the
warning signs that an AI response may be unreliable.

The table below highlights common indicators.


| Warning Sign | What It Looks Like | What You Should Do |
|---|---|---|
| Code that looks correct but fails | The code appears valid but produces errors when run. | Test the code and debug it yourself. |
| Answers that "sound reasonable" | The explanation seems logical but cannot be confirmed anywhere. | Verify the claim using multiple sources. |
| Inconsistent answers | The AI gives different answers to the same question. | Cross-check the topic with documentation. |
| Overly complex answers | The solution is much more complicated than necessary. | Simplify the problem and verify the core concept. |
| No acknowledgement of uncertainty | The AI states everything as fact even when unsure. | Treat the answer as a suggestion and verify it. |

## What to Do When You Catch One

Spotting a likely hallucination is only half the work. When you
suspect an answer is wrong:

-   **Run the code.** For programming answers, testing is the fastest
    way to confirm whether something works.
-   **Check the official documentation.** MDN for web APIs, the
    language's official docs, the library's GitHub repo. If the AI
    invented something, the docs will tell you.
-   **Ask the AI to cite a source.** Not a guarantee — the AI can
    invent sources too — but a useful pressure test. If it can't
    point to real documentation, be suspicious.
-   **Rephrase with grounding.** Paste the real documentation or
    specification into your prompt and ask the question again against
    that source.
-   **Try a different tool.** If two AI tools give contradicting
    answers, at least one is wrong. This is often a fast way to flag
    uncertainty.

### Next Steps: Cognitive Debt

You now know how AI tools work, how to prompt them effectively, and
how to recognize when their answers are wrong. There's one more
thing worth understanding before making AI a daily part of your
workflow — and it has less to do with the AI than it does with you.

Every time you let an AI solve a problem you could have worked
through yourself, you save time — but you may also skip the mental
effort that would have built real skill. Over time, this can add up
to something called **cognitive debt**: a quiet gap between what you
appear to understand and what you can actually produce on your own.