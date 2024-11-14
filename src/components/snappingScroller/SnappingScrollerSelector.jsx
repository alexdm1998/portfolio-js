import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getElementDimensions } from "@utils/ElementDimensions";

const FocusLine = styled.div`
  position: absolute;
  background-color: #ffffff48;
  top: 50%;
  left: 0;
  width: 50%;
  height: 10px;
  transform: translate(0%, -50%);
  clip-path: ${(props) => `path('${props.$clipPath}')`};
`;

/**
 * This component needs to be provided the closestCard in order to work.
 *
 * @param {*} param0
 * @returns
 */

export const SnappingScrollerSelector = ({
  closestCardDetails,
  selection,
  onSelection,
}) => {
  const [clipPath, setClipPath] = useState(null);
  const lineOfFocusRef = useRef(null);

  function createCardClip(card, line) {
    //Only works for uniform and perfect circles of borderRadius
    if (!card) return;
    const { height, width, centerY, borderRadius } = card;
    const lineOfFocusDimensions = getElementDimensions(line);
    if (!lineOfFocusDimensions) return;
    const {
      centerY: lineCenterY,
      height: lineHeight,
      width: lineWidth,
    } = lineOfFocusDimensions;

    const differenceY = centerY - lineCenterY;
    const lH = lineHeight / 2 + differenceY;
    const lW = lineWidth / 2;
    //variables
    const h = height / 2;
    const w = width / 2;
    const r = Math.min(height / 2, width / 2, borderRadius);
    const k = 0.55228;
    const xCurve = w - r;
    const yCurve = h - r;
    let xI = -1;
    let yI = -1;
    //
    let path = `M${-w + lW} ${lH}`;
    for (let i = 0; i < 4; i++) {
      if (i == 1 || i == 2) xI = 1;
      if (i == 3) xI = -1;
      if (i == 2 || i == 3) yI = 1;
      if (i % 2 == 0) {
        path += `V${yI * yCurve + lH}`;
        path += `C${xI * w + lW} ${yI * (h - r * (1 - k)) + lH},`;
        path += `${xI * (w - r * (1 - k)) + lW} ${yI * h + lH},`;
        path += `${xI * xCurve + lW} ${yI * h + lH}`;
      }
      if (i % 2 == 1) {
        path += `H${xI * xCurve + lW}`;
        path += `C${xI * (w - r * (1 - k)) + lW} ${yI * h + lH},`;
        path += `${xI * w + lW} ${yI * (h - r * (1 - k)) + lH},`;
        path += `${xI * w + lW} ${yI * yCurve + lH}`;
      }
    }

    setClipPath(path);
  }

  useEffect(() => {
    createCardClip(closestCardDetails, lineOfFocusRef.current);
  }, [closestCardDetails]);

  useEffect(() => {
    if (!selection) return;
    console.log(selection.firstChild.data);
    if (selection.firstChild.data == "Lisbon") {
      fetch("http://192.168.1.229:5000/capitals/image/something")
        .then((res) => res.json())
        .then((URIs) => {
          onSelection(URIs);
        });
    }
  }, [selection]);

  return <FocusLine $clipPath={clipPath} ref={lineOfFocusRef}></FocusLine>;
};
