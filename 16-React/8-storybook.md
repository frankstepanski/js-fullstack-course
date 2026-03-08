# Introduction to Storybook for React Beginners

## What is Storybook?

Storybook is a tool that lets developers **build, view, and test UI
components in isolation**.

Instead of running your entire React application just to see one button
or one card component, Storybook allows you to:

-   Open a UI development environment
-   View one component at a time
-   Experiment with different states and styles
-   Document how components should be used

Think of Storybook like a **workshop for your UI components**.

## Why Storybook Exists

As applications grow, the number of UI components grows quickly.

    App
     ├─ Navbar
     ├─ Sidebar
     ├─ Button
     ├─ Card
     ├─ Modal
     ├─ Form Inputs
     └─ Dashboard Widgets

Without a tool like Storybook:

-   It becomes difficult to test components individually
-   Developers need to run the entire app to see changes
-   Designers cannot easily preview UI elements
-   Teams lose consistency in styling

Storybook solves this by creating a **visual component catalog**.

## How Storybook Fits Into Styling Patterns

React apps can be styled in many ways:

### Plain CSS

    Button.css
    Button.jsx

### CSS Modules

    Button.module.css
    Button.jsx

### Styled Components

    const Button = styled.button``

### Component Libraries

Examples include:

-   Material UI (MUI)
-   Chakra UI
-   Ant Design

Storybook works with **all of these approaches**.\
It does not replace styling --- it simply **displays and tests
components regardless of how they are styled**.

Example component states:

    Button
     ├─ Default
     ├─ Primary
     ├─ Secondary
     └─ Disabled

Storybook allows you to instantly preview each version.

## Storybook and Design Systems

In larger companies, teams often build **design systems**.

A design system is a collection of reusable UI components and design
guidelines that ensure consistency across products.

Example components:

    Buttons
    Inputs
    Dropdowns
    Cards
    Navigation
    Alerts
    Modals

Storybook often becomes the **documentation site and testing
environment** for those components.

Developers can see:

-   how components should look
-   what props they support
-   different visual states
-   example usage

This turns Storybook into a **living style guide**.

## How Companies Use Storybook

Storybook is widely used in the industry because it helps teams build
**consistent, reusable, and well-documented UI components**.

Instead of designing and testing components inside a large application,
teams can build and review them **independently**.

### Build UI Faster

Developers can build UI components **before the rest of the application
exists**.

For example, a team might start by building:

    Button
    Card
    Navbar
    Modal
    Input
    Dropdown

Each component can be developed in Storybook without waiting for:

-   backend APIs
-   routing
-   page layouts
-   full application setup

This allows developers to:

-   work on UI earlier
-   iterate quickly
-   test components safely
-   avoid breaking other parts of the app

Storybook acts as a **sandbox for UI development**.

---

### Improve Collaboration

Storybook improves collaboration between:

-   frontend developers
-   designers
-   product managers
-   QA testers

Everyone can open Storybook and see the same components.

Example:

    Button
     ├─ Primary
     ├─ Secondary
     ├─ Disabled
     └─ Loading

Designers can verify the UI.\
QA testers can check component states.\
Developers can confirm functionality.

Some companies even **deploy Storybook online** so the entire
organization can review the component library.

---

### Create Reusable Components

Large applications may contain **hundreds of components**.

Without organization, developers may accidentally recreate similar
components:

    BlueButton
    PrimaryButton
    RoundedButton
    SubmitButton

Storybook helps teams avoid duplication by creating a **central catalog
of components**.

Example component library:

    Components
     ├─ Button
     ├─ Card
     ├─ Modal
     ├─ Input
     ├─ Dropdown
     └─ Notification

Each component includes:

-   examples
-   props
-   visual states
-   usage guidance

Developers can browse Storybook and reuse components instead of
rebuilding them.

---

### Maintain a Design System

Many companies maintain a **design system** shared across multiple
applications.

A design system may include:

    Buttons
    Forms
    Cards
    Navigation
    Layouts
    Typography
    Color palettes
    Spacing rules

Storybook often becomes the **visual documentation site** for the design
system.

Instead of reading documentation alone, developers can interact with
real components.

This ensures consistency across many teams and products.

--- 

### Test Different UI States

UI components often need to support many states:

-   loading
-   empty data
-   error
-   disabled
-   success

Storybook allows developers to create **stories for each state**.

Example:

    UserCard
     ├─ Default
     ├─ Loading
     ├─ Empty
     └─ Error

This makes it easy to test edge cases without manually recreating those
scenarios in the application.

--- 

### Document Components for the Team

As applications grow, teams need a clear way to understand how
components work.

Storybook acts as **living documentation**.

Developers can quickly see:

-   what components exist
-   how they look
-   what props they accept
-   how they should be used

This also helps **onboard new developers faster**.

## Using Storybook in a React Project

1️⃣ **Add Storybook to an existing React project:**

``` bash
npx storybook@latest init
```

This command will:

-   Install Storybook and required dependencies
-   Create a `.storybook` configuration folder
-   Add example story files
-   Update your `package.json` scripts

2️⃣ **Running Storybook**

Start Storybook with:

``` bash
npm run storybook
```

This launches the Storybook development server.

It will open a browser window at:

http://localhost:6006

Storybook runs **separately from your main React application**.

For example:

React app\
http://localhost:5173

Storybook UI environment\
http://localhost:6006

>This allows developers to build and test UI components without loading
the entire application.

3️⃣ **The Storybook Interface**

When Storybook opens, you will see three main areas.

    ┌─────────────────────┬─────────────────────────────┐
    │ Component List      │ Component Preview           │
    │ (Left Sidebar)      │ (Main Canvas Area)          │
    │                     │                             │
    │ Button              │        Button Example       │
    │  ├─ Primary         │                             │
    │  ├─ Secondary       │      [ Primary Button ]     │
    │  └─ Disabled        │                             │
    │                     │                             │
    └─────────────────────┴─────────────────────────────┘

The left sidebar shows your component library.

Example:

    Components
     ├─ Button
     │   ├─ Primary
     │   └─ Secondary
     ├─ Card
     └─ Modal

Each item represents a **story**, which is a specific state of a
component.

Clicking a story instantly renders that version of the component.

#### Canvas (Component Preview)

The center area is called the **Canvas**.

This is where the selected component is rendered.

Example:

    [ Primary Button ]

Developers use this area to visually inspect:

-   layout
-   spacing
-   colors
-   typography
-   interactions


#### Controls Panel

Storybook also provides **Controls**, which allow you to interact with
component props.

Example component:

``` jsx
<Button label="Submit" disabled={false} />
```

Storybook may show interactive controls like:

    label: "Submit"
    disabled: false

Changing these values updates the component immediately.

This allows developers to test many variations **without changing
code**.

4️⃣ **Example React Component**

``` jsx
function Button({ label }) {
  return <button>{label}</button>;
}

export default Button;
```

5️⃣ **Creating a Story**

Story files describe **how a component should appear**.

Example story file:

Button.stories.js

``` jsx
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

export const Primary = () => {
  return <Button label="Primary Button" />;
};

export const Secondary = () => {
  return <Button label="Secondary Button" />;
};
```

Storybook automatically organizes this into the sidebar:

    Components
     └─ Button
         ├─ Primary
         └─ Secondary

Clicking each story displays that component variation.

## Typical Workflow When Using Storybook

### Step 1 --- Build a Component

Create a React component.

Example:

Button.jsx

### Step 2 --- Create Stories

Create stories describing how the component should appear.

Example states:

-   Primary
-   Secondary
-   Disabled
-   Loading

### Step 3 --- Test the Component

Preview the component inside Storybook.

Developers can verify:

-   styling
-   spacing
-   responsive behavior
-   props
-   visual states


### Step 4 --- Use the Component in the App

Once the component works correctly, it can be imported into the main
React application.

Example:

``` jsx
import Button from "./components/Button";
```

## Key Takeaways

When working with React, Storybook becomes a dedicated environment for
building and testing UI components outside of your main application.

Instead of developing components only inside pages, developers can
create and refine them in isolation.

A common workflow looks like this:

    Design System / UI Ideas
            │
            ▼
    Create a React Component
            │
            ▼
    Create Stories for Different States
            │
            ▼
    Preview and Test the Component in Storybook
            │
            ▼
    Import and Use the Component in the React App

For example, a developer might build a `Button` component and create
several stories:

    Button
     ├─ Primary
     ├─ Secondary
     ├─ Disabled
     └─ Loading

Each story represents a **different state of the component**, allowing
developers to quickly verify styling, behavior, and props.

Using Storybook with React helps teams:

-   build and test components independently
-   visualize UI states quickly
-   document how components should be used
-   maintain consistency across the application

Over time, Storybook becomes a **visual library of reusable React
components**, making it easier for teams to build scalable and
maintainable user interfaces.

## Next Up: Global State

So far in React, you've learned how to manage **local state** using the
`useState` hook.

Local state works well when the data is only needed inside a single
component or passed to a few nearby components using props.

Example:

    App
     └─ Counter
         └─ Button

In cases like this, passing state through props works perfectly.

However, as applications grow, developers often run into a common
problem called **prop drilling**.

    App
     └─ Dashboard
         └─ Sidebar
             └─ UserProfile
                 └─ Avatar

If the `App` component owns the user data, it may need to pass that data
through many layers of components --- even if those components don't use
the data themselves.

This can make code harder to read, maintain, and scale.

### When Global State Becomes Helpful

Global state becomes useful when:

-   many components need access to the same data
-   data must stay synchronized across different parts of the app
-   prop drilling becomes excessive
-   application-wide data is needed

Common examples of global state include:

-   logged-in user information
-   theme settings (dark/light mode)
-   shopping cart data
-   notifications
-   application settings

Instead of passing this data through multiple layers of components, we
can store it in a **shared state available to the entire application**.

