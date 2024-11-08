import React, { useState } from "react";
import { DraggablePoint } from "./DraggablePoint";
import styled from "styled-components";

const Link = styled.svg.attrs((props) => ({
  width: `${Math.max(props.$position.cx, props.$siblingPosition.cx)}px`,
  height: `${Math.max(props.$position.cy, props.$siblingPosition.cy)}px`,
}))`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: -1;
`;

const Line = styled.line.attrs((props) => ({
  x1: `${props.$position.cx}`,
  y1: `${props.$position.cy}`,
  x2: `${props.$siblingPosition.cx}`,
  y2: `${props.$siblingPosition.cy}`,
}))`
  stroke: black;
  stroke-width: "1";
`

/**
 *
 *  A `TetherPoint` is a `DraggablePoint` that is attached to another `DraggablePoint`— (children of `TetherPoint`; sibling of `DraggablePoint`).
 *  
 * The `TetherPoint` can be used as the control point of a bezier curve
 * 
 * Caveats: • Should only be used for positive position values.
 */
export const TetherPoint = ({ mousePosition, showLink = false, children, cx = 0, cy = 0, onChange}) => {
  const [position, setPosition] = useState({cx: cx, cy: cy});
  const [siblingPosition, setSiblingPosition] = useState({cx:0, cy: 0}); //Pertains to the children
  if (React.Children.count(children) > 1)
    throw new Error("TetherPoint expects only one child.");

  function handlePositionChange(position) {
    setPosition(position);
    onChange("TetherPoint", position)
  }

  function handleSiblingPositionChange(position) {
    setSiblingPosition(position);
    onChange("DraggablePoint", position)
  }


  return (
    <>
      <DraggablePoint cx={position.cx} cy={position.cy} mousePosition={mousePosition} strokeColor="red" onPositionChange={handlePositionChange}/>
      {React.isValidElement(children) ? React.cloneElement(children, {mousePosition: mousePosition, onPositionChange: handleSiblingPositionChange}): null}
      {showLink && (React.Children.count(children) == 1) && (
        <Link $position={position} $siblingPosition={siblingPosition}> 
          <Line $siblingPosition={siblingPosition} $position={position}/>
        </Link>
      )}
    </>
  );
};