import styled from "styled-components";

/**
 * Shared page wrapper (DRY):
 * - consistent title sizing
 * - consistent spacing
 */
const Wrap = styled.section`
  display: grid;
  gap: 0.75rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export default function PageShell({ title, intro, children }) {
  return (
    <Wrap>
      <Title>{title}</Title>
      {intro ? <p style={{ margin: 0, color: "#555" }}>{intro}</p> : null}
      {children}
    </Wrap>
  );
}
