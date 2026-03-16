import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.card};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 3rem;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <p>
          Built with React & Styled Components · Data from The Movie Database
        </p>
      </FooterInner>
    </FooterWrapper>
  );
}
