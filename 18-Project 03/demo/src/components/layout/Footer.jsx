import styled from "styled-components";

const Foot = styled.footer`
  border-top: 1px solid #eee;
  padding: 1rem;
`;

const Inner = styled.div`
  width: min(1100px, 100%);
  margin: 0 auto;
  font-size: 0.9rem;
  color: #555;
`;

export default function Footer() {
  return (
    <Foot>
      <Inner>
        <p>© {new Date().getFullYear()} Moonlight Pizza Co. • React demo</p>
      </Inner>
    </Foot>
  );
}
