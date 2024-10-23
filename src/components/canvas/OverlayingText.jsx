import React from "react";
import styled from "styled-components";
import { useRaycast } from "@contexts/RaycastContext";

const Textbox = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OverlayingText = () => {
  const currentHit = useRaycast();

  function DisplayGMT() {
    if (currentHit >= 0) {
      return `GMT+${currentHit}`;
    }
    return `GTM${currentHit}`;
  }

  return (
    <Textbox>
      {currentHit != "none" && currentHit != "globe" ? (
        <span style={{ fontSize: "0.8rem" }}>{DisplayGMT()}</span>
      ) : (
        ""
      )}
    </Textbox>
  );
};
