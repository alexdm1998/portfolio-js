import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { getElementDimensions } from "@utils/ElementDimensions";
import { CubicBezierCurve } from "./CubicBezierCurve";

const Canvas = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  box-sizing: border-box;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
`;

export const VectorVisualiser = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({x:0, y:0})

  function handleMouseMove(e){
    const canvasDimensions = getElementDimensions(canvasRef.current);
    if(!canvasDimensions) return;

    const {left: canvasLeft, top: canvasTop} = canvasDimensions;
    const {clientX: mouseX, clientY: mouseY} = e;
    setMousePosition({x: mouseX - Math.round(canvasLeft), y: mouseY - Math.round(canvasTop)})
  }


  useEffect(() => {
    
  }, [mousePosition]);

  return (
    <Canvas onMouseMove={handleMouseMove} ref={canvasRef}>
      <CubicBezierCurve mousePosition={mousePosition}/>

      <svg width={112} height={32}>
    <path d="M0 16C0 7.16352,7.16352 0,16 0H96C104.83648 0,112 7.16352,112 16C112 24.83648,104.83648 32,96 32H16C7.16352 32,0 24.83648,0 16" stroke="red"></path>
</svg>
    </Canvas>
  );
};
