import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { WelcomeSun } from "./WelcomeSun";
import NAME_SVG from "@assets/ALEXANDRE_TAVARES.svg";
import { useAnimate } from "@hooks/useAnimate";

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
  z-index: 100;
  opacity: 1;
  position: fixed;
  background-image: linear-gradient(#1e172f, #1e172f);
  mask-image: url("${NAME_SVG}"), linear-gradient(#000 0 0);
  mask-composite: exclude;
  mask-repeat: no-repeat;
  mask-position: 50% 75%;
`;

export const WelcomeView = ({ onFadeComplete }) => {
  const ContainerRef = useRef(null);
  const [isSunMagnified, setIsSunMagnified] = useState(false);
  const [isFaded, setIsFaded] = useState(false);

  const { start: animate, cancel } = useAnimate(
    (elapsed) => {
      const fade = Math.min(elapsed, 1);
      ContainerRef.current.style.opacity = 1.0 - fade;
      if (fade > 0.5) ContainerRef.current.style.pointerEvents = "none";
    },
    3000,
    () => {
      setIsFaded(true);
    }
  );

  useEffect(() => {
    if (isSunMagnified) {
      animate();
    }
  }, [isSunMagnified]);

  useEffect(() => {
    if (isFaded) {
      onFadeComplete();
    }
  }, [isFaded]);

  useEffect(() => {
    return () => {
      cancel();
      onFadeComplete();
    };
  }, []);

  return (
    <>
      <Container ref={ContainerRef}>
        <WelcomeSun isMagnified={setIsSunMagnified} />
      </Container>
    </>
  );
};
