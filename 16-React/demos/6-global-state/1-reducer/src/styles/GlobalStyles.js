import { createGlobalStyle } from "styled-components";

/*
  GlobalStyles
  ------------
  This file defines CSS that applies to the ENTIRE app.

  Why this exists:
  - Reset browser defaults
  - Set base font + background
  - Ensure consistent layout behavior

  This is NOT a component you render directly.
  It is injected once by styled-components.
*/

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, sans-serif;

    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
  }
`;
