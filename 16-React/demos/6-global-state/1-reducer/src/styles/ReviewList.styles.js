import styled from "styled-components";

/* Wrapper for the entire list */
export const ReviewListWrapper = styled.section`
  margin-top: 1.5rem;
   display: flex;
   flex-direction: column;
`;

/*
  ReviewCard
  ----------
  Uses a TRANSIENT PROP ($status) for styling.
  Transient props:
  - Can be used inside styled-components
  - Will NOT be forwarded to the DOM
*/

export const ReviewCard = styled.article`
  background: ${({ theme, $status }) =>
    $status === "rejected"
      ? "#fef2f2"
      : theme.colors.card};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
`;

/* Header row */
export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* User name */
export const ReviewerName = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;

/* Status badge */
export const StatusBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;

  background: ${({ status, theme }) =>
    status === "approved"
      ? theme.colors.successBg
      : status === "rejected"
      ? theme.colors.dangerBg
      : theme.colors.warningBg};

  color: ${({ status, theme }) =>
    status === "approved"
      ? theme.colors.success
      : status === "rejected"
      ? theme.colors.danger
      : theme.colors.warning};
`;

export const ModerationActions = styled.div`
  display: flex;
  gap: 0.4rem;

  button {
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: 600;
  }

  button:first-child {
    background: #dcfce7;
    color: #166534;
  }

  button:last-child {
    background: #fee2e2;
    color: #991b1b;
  }
`;

export const ActionButton = styled.button`
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ $variant }) =>
    $variant === "approve" ? "#ecfdf5" : "#fef2f2"};

  color: ${({ $variant }) =>
    $variant === "approve" ? "#065f46" : "#991b1b"};

  &:hover {
    opacity: 0.85;
  }
`;

/* Review text */
export const ReviewText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

/* Footer row */
export const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
`;
