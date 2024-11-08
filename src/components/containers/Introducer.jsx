import React from "react";
import { ViewFrame, TransPanel } from "../../styles/ViewFrame.style.jsx";
import styled from "styled-components";
import { Tooltip } from "@UI/Tooltip.jsx";

import { VectorVisualiser } from "@components/vector_visualiser/VectorVisualiser.jsx";

const Container = styled.div`
  padding: 5vh;
`;

const Introducer = () => {
  return (
    <ViewFrame>
      <TransPanel>
        <Container>
          <VectorVisualiser>
            
          </VectorVisualiser>
        </Container>
      </TransPanel>
    </ViewFrame>
  );
};

export default Introducer;
