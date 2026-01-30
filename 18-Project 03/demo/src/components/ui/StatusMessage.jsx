import styled from "styled-components";

/**
 * StatusMessage
 * --------------------------------------------------
 * Displays inline feedback messages (loading, error,
 * neutral, success, etc.).
 *
 * NOTE:
 * - We use a TRANSIENT prop ($tone) instead of `tone`
 * - Transient props are used for styling only
 * - They are NOT forwarded to the DOM
 */

const Wrapper = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.4;

  background-color: ${({ $tone }) => {
    switch ($tone) {
      case "error":
        return "#fee";
      case "success":
        return "#e6fffa";
      default:
        return "#f5f5f5";
    }
  }};

  color: ${({ $tone }) => {
    switch ($tone) {
      case "error":
        return "#900";
      case "success":
        return "#065f46";
      default:
        return "#333";
    }
  }};
`;

export default function StatusMessage({
  children,
  $tone = "neutral",
}) {
  return <Wrapper $tone={$tone}>{children}</Wrapper>;
}