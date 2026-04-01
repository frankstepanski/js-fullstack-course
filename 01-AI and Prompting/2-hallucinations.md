# AI Limitations: Hallucinations and Incorrect Answers
AI tools are powerful, but they are not perfect sources of information.

When using AI to learn programming or generate code, it is important to understand one of the most common limitations of large language models: hallucinations.

Because of this, AI can sometimes produce answers that:

-   sound confident
-   look correct
-   but are factually wrong

This behavior is called a **hallucination**.

## What Is an AI Hallucination?

An AI hallucination occurs when a language model generates information
that:

-   is incorrect
-   is invented
-   is not supported by the provided data
-   or does not exist in reality

In simple terms, the AI is **making something up that sounds
believable**.

### Example: Invented HTML or CSS Feature

Hallucinations can also happen when developers ask questions about
HTML or CSS.

For example, a developer might ask:

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

### Why Hallucinations Happen

AI models do not search a database of verified facts when generating
answers.

Instead, they rely on patterns learned during training.

This means the model may:

-   combine different pieces of information
-   guess missing details
-   produce outdated knowledge
-   invent APIs or syntax

This behavior is sometimes called **knowledge blending**.

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

```
**Prompt:**

Product Description:

"The InnovateBook Pro is a high-performance laptop with an M4
processor.
It comes in Space Gray and Silver."

**Question:**

What is the warranty for the InnovateBook Pro?
```

**AI response:**

>The InnovateBook Pro includes a one-year limited warranty.



This answer **sounds reasonable**, but it is **incorrect**.

The warranty information was **not in the provided text**.

The AI simply guessed based on typical electronics warranties.

### Hallucination vs Normal Errors

| Type          | Explanation                                              |
|---------------|----------------------------------------------------------|
| Hallucination | The AI invents information that does not exist           |
| Error         | The AI misunderstands or misinterprets the prompt        |

Both require developers to **verify AI outputs carefully**.

## The Principle of Grounding

One of the best ways to prevent hallucinations is called **grounding**.

Grounding means:

-   Instructing the AI to base its answer **only on the information
    provided in the prompt**.

Instead of allowing the AI to use its general knowledge, we limit it to
a **specific source of truth**.

### Example: Grounded Prompt

**Context:**

"The InnovateBook Pro is a high-performance laptop with an M4
processor.\
It is made from recycled aluminum and comes in Space Gray and Silver."

**Instruction:**

Using only the information provided in the context above, answer the
following question.

If the answer cannot be found in the text, respond with:

> "The information is not available in the provided document."

**Question:**

What is the warranty for the InnovateBook Pro?

**AI response:**

> The information is not available in the provided document.

This response is correct, because the warranty was never mentioned.

### Why Grounding Helps

Grounding prevents the model from:

-   inventing missing details
-   blending unrelated knowledge
-   generating misleading answers

It forces the model to rely on **specific information you provide**.

Even when using techniques like grounding, AI systems can still make mistakes.

## How to Spot Possible AI Hallucinations

Even when using good prompts and techniques like grounding, AI systems can still produce incorrect answers.

Because of this, developers should learn how to recognize warning signs that an AI response may be unreliable.

The table below highlights several common indicators that an AI-generated answer may contain a hallucination.


| Warning Sign | What It Looks Like | What You Should Do |
|---|---|---|
| Code that looks correct but fails | The code appears valid but produces errors when run. | Test the code and debug it yourself. |
| Answers that "sound reasonable" | The explanation seems logical but cannot be confirmed anywhere. | Verify the claim using multiple sources. |
| Inconsistent answers | The AI gives different answers to the same question. | Cross-check the topic with documentation. |
| Overly complex answers | The solution is much more complicated than necessary. | Simplify the problem and verify the core concept. |
| No acknowledgement of uncertainty | The AI states everything as fact even when unsure. | Treat the answer as a suggestion and verify it. |

## Summary

In this guide you learned:

- What prompts are and how they control AI behavior
- How to structure effective prompts using role, instruction, context, and format
- Common prompting mistakes beginners make
- How developers use AI for learning, coding, debugging, and code review
- The major AI chatbot tools available today
- The limitations of AI systems and how hallucinations occur
- How to spot possible hallucinations and verify AI responses

AI tools can significantly improve productivity and learning when used correctly.

The key is to treat AI as a **collaborative assistant** rather than a source of guaranteed truth.