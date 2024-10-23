import React, { forwardRef } from "react";
import styled from "styled-components";
import { Dashboard } from "./dashboard/Dashboard";
import { ViewFrame } from "@styles/ViewFrame.style";
import { RightPlanet } from "./RightPlanet";
import { LeftPlanet } from "./LeftPlanet";
import { Sun } from "./Sun";
import { Dunes } from "./Dunes";
import { CanvasContainer } from "../canvas/CanvasContainer";
import { useNavigation } from "@contexts/NavigationContext";

const HomeFrame = styled(ViewFrame)`
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: initial;
`;

export const Hero = forwardRef((props, ref) => {
  const navigation = useNavigation();
  return (
    <HomeFrame ref={ref}>
      <Dunes parallaxValue={props.parallaxValue} />
      <Sun parallaxValue={props.parallaxValue} />
      <LeftPlanet />
      <RightPlanet />
      {navigation != "RP" && <Dashboard />}
      {navigation == "RP" && <CanvasContainer></CanvasContainer>}
    </HomeFrame>
  );
});
