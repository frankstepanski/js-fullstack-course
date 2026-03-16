import styled from "styled-components";

export const ReviewFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
`;

export const Textarea = styled.textarea`
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  resize: vertical;
  font-size: 0.85rem;
`;

export const SubmitButton = styled.button`
  align-self: flex-start;
  background: ${({ theme }) => theme.colors.brand};
  color: white;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;
