import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import { useTheme } from "@contexts/ThemeContext";
import { useNavigation } from "@contexts/NavigationContext";

const lightColour = "#102552";
const shadowColour = "#0d103d";

const Dune_Wrapper = styled.div.attrs((props) => ({
  style: {
    transform: `translate(0px, -${props.$parallax}vh)`,
  },
}))`
  position: fixed;
  bottom: ${(props) => props.$verticalOffset};
  right: ${(props) => props.$positionRight};
  width: ${(props) => props.$width};
  z-index: ${(props) => props.$zIndex};
  pointer-events: none;
  @media (orientation: portrait), (max-height: 300px) {
    display: none;
  }
`;

const calculateAnimationDelay = (delayOn, delay, navigation) => {
  if (navigation === "RP") {
    return delayOn === "fadeOut" ? delay : "0s";
  }
  if (navigation === "LP") {
    return delayOn === "fadeOut" ? "0s" : delay;
  }
};

const Dune_SVG = styled(SVG)`
  path[component="light"] {
    transition: fill 5s ease;
    fill: ${(props) => (props.$theme === "light" ? "" : lightColour)};
  }
  path[component="shadow"] {
    transition: fill 5s ease;
    fill: ${(props) => (props.$theme === "light" ? "" : shadowColour)};
  }

  mask-image: linear-gradient(
    to left,
    transparent,
    transparent 33%,
    #000000 50%,
    #000000
  );
  mask-position: ${(props) => (props.$navigation === "RP" ? "right" : "0% 0")};
  mask-size: 300% 100%;
  transition: mask-position 3s ease-out
    ${(props) =>
      calculateAnimationDelay(props.$delayOn, props.$delay, props.$navigation)};
  will-change: fill mask-position;
`;

export const Dune = ({
  width = "100%",
  positionRight = "0%",
  verticalOffset = "0dvh",
  zIndex = "1",
  delay = "0.0s",
  delayOn = "fadeOut",
  parallaxValue,
  src,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Dune_Wrapper
      $width={width}
      $positionRight={positionRight}
      $verticalOffset={verticalOffset}
      $zIndex={zIndex}
      $parallax={parallaxValue}
    >
      <Dune_SVG
        $theme={theme}
        $navigation={navigation}
        $delay={delay}
        $delayOn={delayOn}
        src={src}
      ></Dune_SVG>
    </Dune_Wrapper>
  );
};
