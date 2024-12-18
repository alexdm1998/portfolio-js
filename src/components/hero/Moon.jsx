import { CelestialExperience } from "@experience/CelestialExperience";
import React from "react";
import { styled, keyframes } from "styled-components";
import { useState } from "react";

const AnimationMoon = keyframes`
    0%{
        transform: translate(1vw,0px);
    }
    50%{
        transform: translate(-9vw, 1vw);
    }
    100%{
        transform: translate(1vw,0px);
        z-index: -1;
    }
`;

const AnimationMoonPortrait = keyframes`
    0%{
        transform: translate(2vh,0px);
    }
    50%{
        transform: translate(-16vh, 2vh);
    }
    100%{
        transform: translate(2vh,0px);
        z-index: -1;
    }
`;

const MoonDiv = styled.div`
  position: absolute;
  top: 10%;
  right: -10%;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  z-index: 2;
  background-image: linear-gradient(
    to bottom left,
    #9e4f4f 17%,
    #aa2601 33%,
    #3e4d5e 66%,
    #000000
  );
  background-size: 300% 300%;
  background-position: ${(props) =>
    props.$isDarkMode === "light" ? "top right" : "bottom left"};
  animation: ${AnimationMoon} 60s linear infinite;
  outline: ${(props) => (props.$isFocus ? "1px solid #ffffffb8" : "")};
  transition: background-position 5s;

  @media (orientation: portrait) {
    animation: ${AnimationMoonPortrait} 30s linear infinite;
  }
`;

export const Moon = ({
  isDarkMode,
  isFocus,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isLearned
}) => {

  function handleMouseEnter(){
    onMouseEnter()
  }

  return (
    <MoonDiv
      $isDarkMode={isDarkMode}
      $isFocus={isFocus}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CelestialExperience isLearned={isLearned}/>
    </MoonDiv>
  );
};
