import styled from "styled-components";

/**
 * DRY button component:
 * - Reusable styles
 * - Small "variant" API for demos (primary/ghost)
 */

const Base = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 120ms ease, opacity 120ms ease;

  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Primary = styled(Base)`
  background: #e63946;
  color: white;
`;

const Ghost = styled(Base)`
  background: #f3f3f3;
  color: #222;
`;

export default function Button({ variant = "primary", ...props }) {
  const Comp = variant === "ghost" ? Ghost : Primary;
  return <Comp {...props} />;
}
