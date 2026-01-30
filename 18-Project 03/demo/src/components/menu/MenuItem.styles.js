import styled from "styled-components";

export const Card = styled.article`
  background: white;
  border: 1px solid #eee;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;

  @media (min-width: 768px) {
    height: 200px;
  }
`;

export const Body = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.15rem;
`;

export const Meta = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.4;
`;
