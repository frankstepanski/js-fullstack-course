# Moonlight Pizza Co. — Project Planning 

This document guides students through the **planning phase** of a web project — *before any coding starts*.  
These steps mirror real-world software development and help teams build the right thing, not just write code.

Before writing HTML, CSS, or JavaScript, every successful project starts with a clear understanding of **who the site is for and what they need**. Planning saves time, reduces confusion, and helps teams stay aligned.

Moonlight Pizza Co. is a fictional pizza restaurant site used to learn frontend development. This project imitates what a real business website planning phase looks like.

## 📌 Personas

### **What is a persona?**
A persona is a *fictional user* representing a real type of person who will use the website.  
Teams create personas so they can understand the user's goals, needs, frustrations, and motivations.

### **Why do this before coding?**
Because without understanding *who* you're building for, you risk building the wrong features.  
Personas help the team choose colors, layout, and content that match real-world users.

## 👤 Persona 1: Late-Night College Student ("Alex")
- **Age:** 20  
- **Goals:** Quickly order pizza late at night  
- **Frustrations:** Long menus, unclear ordering steps  
- **Needs:** Fast ordering flow, mobile-friendly layout  

## 👤 Persona 2: Busy Parent ("Jordan")
- **Age:** 38  
- **Goals:** Find hours and family-friendly menu items  
- **Frustrations:** Hard-to-find information, messy navigation  
- **Needs:** Clear hours, accessible menu layout  

## 👤 Persona 3: First-Time Visitor ("Sam")
- **Age:** 27  
- **Goals:** Learn what makes Moonlight Pizza Co. special  
- **Frustrations:** Sites with too much text  
- **Needs:** Clean About page, simple images, quick highlights  

## 📌 User Stories
### **What is a user story?**

A user story describes a feature **from the perspective of the user**, not the developer.  
Format:  
> *As a ____ , I want ____ so that ____.*

### **Why do this before coding?**
User stories help teams build features based on **user needs**, not personal guesses.  
They also help mentors guide teams on MVP decisions.

### 📘 User Story 1 — Learn About the Restaurant
**As a visitor, I want to read about the restaurant so I can decide if I want to eat there.**

### 📘 User Story 2 — View the Menu
**As a hungry customer, I want to browse the pizza menu so I can choose what I want to order.**

### 📘 User Story 3 — Check the Hours
**As a new customer, I want to quickly find the restaurant’s hours so I know when they’re open.**

### 📘 User Story 4 — Place an Online Order
**As a customer, I want to order pizza online so I can pick it up without calling.**

### 📘 User Story 5 — Contact the Restaurant
**As a visitor, I want a clear contact page so I can call or email them easily.**

## 📌 Acceptance Criteria
### **What is acceptance criteria?**
Acceptance criteria define the *requirements that must be met* for a user story to be considered complete.

### **Why do this before coding?**
It prevents ambiguity.  
Everyone knows exactly what “done” looks like.

---

### ✔ User Story 1 — About Page
- Title, short description, and tagline  
- Hours displayed cleanly  
- Mobile & desktop friendly  

### ✔ User Story 2 — Menu Page
- Cards or grid layout  
- Items include names/descriptions/images  
- Mobile friendly  

### ✔ User Story 3 — Hours
- Accessible list of hours  
- Clear formatting  
- Appears on About or Footer  

### ✔ User Story 4 — Order Page
- Form with name/phone/size/toppings/notes  
- Accessible labels  
- Mobile friendly  
- Submit button  

### ✔ User Story 5 — Contact Page
- Phone/email/address visible  
- Buttons or links  
- Simple clean layout  

## 📌 Wireframes
### **What is a wireframe?**
A wireframe is a **simple visual sketch** showing where content goes on the page.  
It is not styled — only structure.

### **Why do this before coding?**
Wireframes:
- help teams agree on layout  
- prevent wasted time rewriting CSS  
- give beginners a mental model  

---

### 🖼 Home / About Page

```
 -----------------------------------------------------
|                      HEADER                        |
|      Moonlight Pizza Co.        [About][Menu][...] |
 -----------------------------------------------------
|                     ABOUT PAGE                     |
|  ------------------------------------------------  |
| |  TAGLINE                                      |  |
| |  TEXT CONTENT                                 |  |
|  ------------------------------------------------  |
|  [ HOURS CARD ]                                    |
|  ------------------                                |
| |  Mon–Thu: 11–9  |                                |
| |  Fri–Sat: 11–11 |                                |
| |  Sun: 12–8      |                                |
|  ------------------                                |
 -----------------------------------------------------
|                      FOOTER                        |
 -----------------------------------------------------
```

### 🖼 Menu Page

```
 -----------------------------------------------------
|                       HEADER                       |
 -----------------------------------------------------
|                    MENU GRID                       |
|  [Item][Item]                                      |
|  [Item][Item]                                      |
|  [Item][Item]                                      |
 -----------------------------------------------------
|                       FOOTER                       |
 -----------------------------------------------------
```

### 🖼 Order Page

```
 -----------------------------------------------------
|                       HEADER                       |
 -----------------------------------------------------
|                   ORDER FORM                       |
|  [ Customer Info ] [ Pizza Choices ]               |
|                                                    |
|  [Submit Order Button]                             |
 -----------------------------------------------------
|                       FOOTER                       |
 -----------------------------------------------------
```

### 🖼 Contact Page

```
 -----------------------------------------------------
|                     HEADER                         |
 -----------------------------------------------------
|                   CONTACT CARDS                    |
|    [Phone]   [Email]   [Address]                   |
 -----------------------------------------------------
|                     FOOTER                         |
 -----------------------------------------------------
```

## 📌 Why All of This Happens *Before* Coding

These steps ensure:

### ✔ Build the correct features  
Personas + user stories keep the team user-focused.

### ✔ Avoid rewriting code  
Wireframes and acceptance criteria reduce refactoring.

### ✔ Improve communication  
Everyone shares the same vision.

### ✔ Match real engineering workflows  
This mirrors apprenticeship-level processes.