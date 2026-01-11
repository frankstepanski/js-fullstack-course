import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Logo = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 800;
`;

const Title = styled.h1`
  font-size: 1rem;
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Brand>
          <Logo>🎬</Logo>
          <div>
            <Title>Now Playing</Title>
            <Subtitle>TMDB Movie Browser</Subtitle>
          </div>
        </Brand>
      </HeaderInner>
    </HeaderWrapper>
  );
}

