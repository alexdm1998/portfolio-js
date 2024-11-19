import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { easeOutQuad } from "@utils/EasingFunctions";
import { useAnimate } from "@hooks/useAnimate";

const Sun = styled.div`
  background-image: radial-gradient(#c62b00, #5c1400 80%);
  position: absolute;
  border-radius: 50%;
  left: 50dvw;
  transform: translate(-50%, 0);
  box-shadow: 0px 2px 10px 5px #c62b00, 0px 2px 100px 100px #c62b0039;
  z-index: 1000;
`;

export const WelcomeSun = ({ isMagnified }) => {
  const SunRef = useRef(null);
  const animate = useAnimate(
    (elapsed) => {
      const progress = easeOutQuad(elapsed);
      const magnify = Math.min(progress, 1);
      SunRef.current.style.width = `${magnify * 60}dvw`;
      SunRef.current.style.height = `${magnify * 60}dvw`;
      SunRef.current.style.top = `-${magnify * 30}dvw`;
    },
    3000,
    () => isMagnified(true)
  );

  useEffect(() => {
    animate();
  }, []);

  return <Sun ref={SunRef}></Sun>;
};
