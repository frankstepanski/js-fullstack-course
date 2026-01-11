import styled from "styled-components";

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const Select = styled.select`
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Range = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    cursor: pointer;
  }
`;
