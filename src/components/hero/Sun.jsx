import React from "react";
import styled from "styled-components";
import { useTheme, useThemeSwitch } from "@contexts/ThemeContext";

const WrapperSun = styled.div`
  position: fixed;
  top: -38vw;
  right: -25vw;
  width: 50vw;
  height: 50vw;
  float: right;
  transition: transform 0.2s ease;

  @media (orientation: portrait) {
    top: -30vh;
    right: 0;
    left: 0;
    margin-left: calc((100vw - 50vh) / 2);
    margin-right: calc((100vw - 50vh) / 2);
    width: 50vh;
    height: 50vh;
  }
`;

const SunDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: linear-gradient(
    to bottom left,
    #910000,
    #c62b00 50%,
    #1f0000
  );
  background-size: 200% 200%;
  background-position: ${(props) =>
    props.$isDarkSun === "light" ? "top right" : "bottom left"};
  transition: background-position 5s;
  box-shadow: 0 0 40px #ff000089, 0 0 60px #9152529e;
`;

export const Sun = ({ parallaxValue }) => {
  const theme = useTheme();
  const switchTheme = useThemeSwitch();

  let parallaxStyle;
  if (!window.matchMedia("(orientation: portrait)").matches) {
    //Perhaps only make this verification run on change of orientation and not every mount.
    parallaxStyle = {
      transform: `translate(0px, ${parallaxValue * 0.01}vh)`,
    };
  } else {
    parallaxStyle = {
      transform: `translate(0px, ${parallaxValue}vh)`,
    };
  }

  return (
    <WrapperSun style={parallaxStyle}>
      <SunDiv $isDarkSun={theme} onClick={switchTheme} />
    </WrapperSun>
  );
};
