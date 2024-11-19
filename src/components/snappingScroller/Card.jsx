import styled from "styled-components";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { getElementDimensions } from "@utils/ElementDimensions";

const CardFrame = styled.div.attrs((props) => ({
  style: {
    opacity: `${props.$opacity}`,
    transform: `translate(-${props.$translate}%,0%)`,
     //This makes sure it only shows the card once the translate is set, 
    //thus preventing jittering/flashing first at translate (0) 
    //and immediately after appearing at a set translate value.
    visibility: `${props.$translate ? "visible" : "hidden"}`,
   
  },
}))`
  position: relative;
  height: 2rem;
  width: 50%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  border: 1px solid black;
  box-sizing: border-box;
  will-change: transform;
  font-size: 0.8rem;
`;

export const Card = forwardRef(({ text, grid, gridScroll }, ref) => {
  const [opacity, setOpacity] = useState(1.0);
  const [translate, setTranslate] = useState(null);
  const localRef = useRef(null);

  //Sets the forwardRef to the localRef
  useImperativeHandle(ref, () => localRef.current);

  useEffect(() => {
    const cardDimensions = getElementDimensions(localRef.current);
    if (!cardDimensions) return;
    const gridDimensions = getElementDimensions(grid.current);
    const cardCenterY = cardDimensions.centerY;
    const cardRelativeCenterY = cardCenterY - gridDimensions.top;
    const cardNormalizedCenterY = cardRelativeCenterY / gridDimensions.height;
    const isVisible = cardNormalizedCenterY <= 1 && cardNormalizedCenterY >= 0;

    const translation = isVisible
      ? Math.sin(cardNormalizedCenterY * Math.PI) * 100
      : 0;
    const opacity = isVisible ? Math.sin(cardNormalizedCenterY * Math.PI) : 0;

    setTranslate(translation);
    setOpacity(opacity);
  }, [grid, gridScroll]);

  return (
    <CardFrame ref={localRef} $opacity={opacity} $translate={translate}>
      {text}
    </CardFrame>
  );
});
