import styled from "styled-components";

export const Trailer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background: black;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
