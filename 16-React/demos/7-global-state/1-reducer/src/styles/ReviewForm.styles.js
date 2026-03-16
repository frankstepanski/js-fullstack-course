import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
`;

export const Textarea = styled.textarea`
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
  resize: vertical;
`;

export const Hint = styled.small`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Button = styled.button`
  align-self: flex-start;
  background: ${({ theme }) => theme.colors.brand};
  color: white;
  border: none;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
