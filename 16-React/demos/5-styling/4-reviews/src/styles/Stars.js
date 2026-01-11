import styled from "styled-components";

export const Star = styled.span`
  font-size: 1rem;
  user-select: none;

  color: ${({ active, theme }) =>
    active ? theme.colors.star : theme.colors.border};

  cursor: ${({ readOnly }) => (readOnly ? "default" : "pointer")};
  pointer-events: ${({ readOnly }) => (readOnly ? "none" : "auto")};

  transition: color 0.15s ease;

  ${({ readOnly, theme }) =>
    !readOnly &&
    `
      &:hover {
        color: ${theme.colors.star};
      }
    `}
`;
