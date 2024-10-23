import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Calendar } from "./Calendar";
import { Navigation_Selector } from "./Navigation_Selector";

const Container = styled.div`
  position: fixed;
  top: 0px;
  height: 5dvh;
  width: 60dvw;
  max-width: 60dvw;
  border-bottom: 1px solid #d8d8d855;
  border-right: 1px solid #d8d8d855;
  border-bottom-right-radius: 10px;
  background-color: #c3bfbf12;
  z-index: 2;
  transform: translateY(${(props) => (props.$isVisible ? "0" : "-5dvh")});
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  transition: transform 1s ease, opacity 1s ease;
  display: grid;
  grid-template-columns: 60% 40%;
  align-items: center;
`;

export const Navbar = ({ shouldRender }) => {
  const [isMounted, setIsMounted] = useState(shouldRender);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [shouldRender]);

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
    }
  };

  return (
    <>
      {isMounted && (
        <Container $isVisible={isVisible} onTransitionEnd={handleTransitionEnd}>
          <Calendar />
          <Navigation_Selector />
        </Container>
      )}
    </>
  );
};
