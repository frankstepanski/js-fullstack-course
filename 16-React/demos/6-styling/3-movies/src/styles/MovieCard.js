import styled from "styled-components";

/*
  🧱 Movie Card
  -------------
  Individual movie container.
  Includes hover effects for a more professional feel.
*/
export const Card = styled.article`
  background: ${({ theme }) => theme.card};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
`;

export const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

/*
  🖼 Movie Poster
  ---------------
  Ensures consistent image sizing and aspect ratio.
*/
export const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
  display: block;
`;

/*
  🧾 Meta Section
  ---------------
  Holds rating, release date, and title.
*/
export const Meta = styled.div`
  padding: 0.75rem 0.85rem;
`;

/*
  ⭐ Rating Row
  -------------
  Shows star icon, rating number, and release date.
*/
export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  svg {
    color: #f59e0b;
  }
`;

/*
  🕒 Muted Text
  -------------
  Used for secondary information (release date).
*/
export const Muted = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.muted};
`;

/*
  🎞 Movie Title
  --------------
  Main title text.
*/
export const Title = styled.h3`
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  line-height: 1.3;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;
