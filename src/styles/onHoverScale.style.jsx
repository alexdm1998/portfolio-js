import styled from "styled-components";

export const HoverScaleWrapper = styled.div`
  height: inherit;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;
