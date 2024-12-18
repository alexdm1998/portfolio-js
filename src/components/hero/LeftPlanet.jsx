import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Planet as PlanetTemplate } from "@styles/Planet.style";
import { HoverScaleWrapper } from "@styles/onHoverScale.style";
import { useTheme } from "@contexts/ThemeContext";
import { useNavigation, useSelection } from "@contexts/NavigationContext";
import { CelestialExperience } from "@experience/CelestialExperience";
import { Moon } from "./Moon";
import { useExperienceMemory } from "@contexts/ExperienceMemoryContext";

//Position and transition
const PositionWrapper = styled.div`
  pointer-events: all;
  position: absolute;
  left: 5vw;
  top: 16dvh;
  width: 8vw;
  height: 8vw;

  @media (orientation: portrait) {
    right: 0;
    left: 0;
    margin-left: calc((100vw - 16vh) / 2);
    margin-right: calc((100vw - 16vh) / 2);
    top: 25vh;
    width: 16vh;
    height: 16vh;
  }
`;

const Planet = styled(PlanetTemplate)`
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const LeftPlanet = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const select = useSelection();
  const [isFocus, setFocus] = useState(false); //Focus is either selected (clicked) or mouse over
  const tag = "LP";


  

  const {isRegistered, registerComponent} = useExperienceMemory()
  const [isFamiliarized, setIsFamiliarized] = useState(isRegistered(tag))

  function OutlineHandler() {
    if (navigation == tag) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }

  useEffect(() => {
    OutlineHandler();
  }, [navigation]);


  function handleMouseEnter(){
    setIsFamiliarized(true)
    setFocus(true)
  }


  function handleClick(){
    select(tag)
    registerComponent(tag)
  }


  return (
    <PositionWrapper>
      <HoverScaleWrapper style={{ borderRadius: "50%" }}>
        <Planet
          $isDarkMode={theme}
          $isFocus={isFocus}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={OutlineHandler}
        ></Planet>
        <Moon
          isDarkMode={theme}
          isFocus={isFocus}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={OutlineHandler}
          isLearned={isFamiliarized}
        />
        <CelestialExperience isLearned={isFamiliarized}/>
      </HoverScaleWrapper>
    </PositionWrapper>
  );
};
