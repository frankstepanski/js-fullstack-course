import styled from "styled-components";

export const Reviews = styled.div`
  padding-left: 1rem;
  max-height: 415px;
  overflow-y: auto;
`;

export const Review = styled.div`
  margin-bottom: 0.75rem;
`;

export const Reviewer = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
`;

export const Comment = styled.p`
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;
