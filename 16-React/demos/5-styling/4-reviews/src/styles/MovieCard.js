import styled from "styled-components";

export const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const Card = styled.article`
  display: grid;
  grid-template-columns: 180px 1fr 320px;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 1rem;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.75rem;
  gap: 0.75rem;
  align-self: start;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
`;

export const ReviewsColumn = styled.aside`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  margin-left: 0.5rem;
`;

export const ReviewsScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding-right: 0.5rem;
`;

export const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.star};
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.85rem;
`;

export const Categories = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;   /* 👈 spacing prevents border overlap */
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Category = styled.li`
  background: ${({ theme }) => theme.colors.badgeBg};
  color: ${({ theme }) => theme.colors.badgeText};
  font-size: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.badgeBorder};
  padding: 0.5rem;
  white-space: nowrap;
`;