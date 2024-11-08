import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const SVG = styled.svg.attrs((props) => ({
  style: {
    left: `${props.$position.cx}px`,
    top: `${props.$position.cy}px`,
  }
}))`
  position: absolute;
  border-radius: ${(props)=> props.$radius + props.$strokeWidth/2}px;
  width: ${(props)=> (props.$radius) * 2 + props.$strokeWidth}px;
  height: ${(props)=> (props.$radius) * 2 + props.$strokeWidth}px;
  transform: translate(-50%, -50%);
`

const Circle = styled.circle.attrs((props) => ({
  r: `${props.$radius}`,
  cx: `${props.$radius + props.$strokeWidth/2}`,
  cy: `${props.$radius + props.$strokeWidth/2}`,
  strokeWidth: `${props.strokeWidth}`,
}))`
  fill: #ffffff;
  stroke: ${(props) => props.$strokeColor};
`


/**
 *  A simple point with dragging logic that is rendered without the need of an actual <canvas>
 * 
 */
export const DraggablePoint = ({mousePosition, radius = 5, cx = 0, cy = 0, strokeColor = "blue", onPositionChange}) => {
    const [position, setPosition] = useState({cx: cx, cy: cy})
    const [isMouseDown, setIsMouseDown] = useState(false);
    
    //Change this for aethetics
    const STROKE_WIDTH = 2;

    function handleMouse(e){
      if(e.type == 'mousedown') setIsMouseDown(true);
      if(e.type == 'mouseup')  setIsMouseDown(false);
    }

    useEffect(()=>{
      if(isMouseDown){
        setPosition({cx: mousePosition.x, cy: mousePosition.y})
      }
    },[mousePosition])

    useEffect(() =>{
      if(onPositionChange) onPositionChange(position);
    },[position])

  return (
    <>
      <SVG $position={position} $radius={radius} $strokeWidth={STROKE_WIDTH} onMouseDown={handleMouse} onMouseUp={handleMouse}>
          <Circle $radius={radius} $strokeWidth={STROKE_WIDTH} $strokeColor={strokeColor}></Circle>
      </SVG>
    </>
  )
}