import styled from "styled-components";

/**
 * Section
 * -------
 * Layout wrapper for the form
 */
export const Section = styled.section`
  margin-bottom: 32px;
`;

/**
 * Label
 * -----
 * Reusable label styling
 */
export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #374151;
`;

/**
 * Textarea
 * --------
 * Styled textarea with controlled resize behavior
 */
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #d1d5db;

  resize: vertical;
  overflow-y: auto;
`;

/**
 * Row
 * ---
 * Horizontal layout for inputs
 */
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

/**
 * Button
 * ------
 * Primary action button
 */
export const Button = styled.button`
  margin-top: 16px;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  background: #111827;
  color: white;
  cursor: pointer;

  &:hover {
    background: #1f2937;
  }
`;
