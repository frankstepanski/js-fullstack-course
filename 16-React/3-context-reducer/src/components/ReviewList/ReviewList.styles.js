import styled from "styled-components";

export const Section = styled.section`
  margin-top: 32px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ReviewCard = styled.div`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  margin-bottom: 12px;
`;

export const Meta = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;
