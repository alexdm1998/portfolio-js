import React, { useEffect } from "react";
import styled from "styled-components";
import { ThreeCanvas } from "./Canvas";
import { RaycastProvider } from "@contexts/RaycastContext";
import { OverlayingText } from "./OverlayingText";
import { useInputs } from "@contexts/KeyboardInputContext";
import { useCapitals } from "@contexts/CapitalsContext";
import { useTimezone } from "@contexts/TimeContext";
import { CapitalCards } from "./CapitalCards";

const Frame = styled.div`
  position: absolute;
  top: 0;
  height: 100dvh;
  width: 100dvw;
  z-index: -1;
`;

export const CanvasContainer = () => {
  /* 
  //Revise
  const inputMode = useInputs();
  useEffect(() => {
    inputMode("Canvas");

    return () => {
      inputMode("Preset");
    };
  }, []);
  */
  return (
    <Frame>
      <RaycastProvider>
        <OverlayingText></OverlayingText>
        <ThreeCanvas></ThreeCanvas>
        <CapitalCards></CapitalCards>
      </RaycastProvider>
    </Frame>
  );
};
