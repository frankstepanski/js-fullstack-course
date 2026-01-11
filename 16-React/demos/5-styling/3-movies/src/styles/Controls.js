import styled from "styled-components";

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
`;

export const Range = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.85rem;
    color: #666;
  }
`;