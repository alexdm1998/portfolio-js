import React from "react";
import { TransPanel, ViewFrame } from "../../styles/ViewFrame.style";
import styled from "styled-components";

const Container = styled.div`
  padding: 5vh;
`;

const Gallery = () => {
  return (
    <ViewFrame>
      <TransPanel>
        <Container></Container>
      </TransPanel>
    </ViewFrame>
  );
};

export default Gallery;
