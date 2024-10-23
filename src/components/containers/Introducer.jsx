import React from "react";
import { ViewFrame, TransPanel } from "../../styles/ViewFrame.style.jsx";
import styled from "styled-components";
import { Tooltip } from "@UI/Tooltip.jsx";

const Container = styled.div`
  padding: 5vh;
`;

const Introducer = () => {
  return (
    <ViewFrame>
      <TransPanel>
        <Container>
        </Container>
      </TransPanel>
    </ViewFrame>
  );
};

export default Introducer;
