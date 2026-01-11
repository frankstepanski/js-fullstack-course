import { createGlobalStyle } from "styled-components";

/*
  This file defines **GLOBAL CSS styles** for the entire application.

  Think of this file as the replacement for:
  - index.css
  - reset.css
  - base.css

  But instead of living in a plain CSS file,
  these styles live INSIDE JavaScript using styled-components.
*/

/*
  🧱 createGlobalStyle
  -------------------
  `createGlobalStyle` lets us write CSS that applies to the WHOLE APP,
  not just a single component.

  Important:
  - This creates a React COMPONENT
  - When rendered, it injects global CSS into the page
  - It does NOT render any visible HTML
*/


export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }
`;
