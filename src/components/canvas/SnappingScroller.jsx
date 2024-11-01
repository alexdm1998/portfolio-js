import React, { useRef, useEffect} from "react";
import styled from "styled-components";
import { getElementDimensions, getElementScroll } from "@utils/ElementDimensions";

const Container = styled.div`
  position: absolute;
  top: 40%;
  right: 10%;
  height: 20rem;
  width: 14rem;
`

const Grid = styled.div`
  display: grid;
  position: relative;
  row-gap: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr;
  justify-items: end;
  scrollbar-width: none;
  scroll-behavior: auto;
`;

const Card = styled.div`
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

const Padding = styled.div`
  height: 8rem;
  width: 100%;
  position: relative;
`;


const FocusLine = styled.div`
  position: absolute;
  background-color: #ffffff48;
  top: 50%;
  left:0;
  width: 50%;
  height: 10px;
  transform: translate(0%, -50%);
`

///Util functions
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(value, min, max){
  return Math.min(Math.max(value, min), max)
}


//Auxiliary functions
function applyTransformation(grid, cards){
  const gridDimensions = getElementDimensions(grid);
  if(!gridDimensions) return;
  const {top: gridTop, height: gridHeight} = gridDimensions;

  cards.forEach((card) => {
    if(!card){
      console.log(card + ": card isn't valid");
      return;
    }


    const { centerY: cardCenterY } = getElementDimensions(card);
    const cardRelativeCenterY = cardCenterY - gridTop; //Relative to the grid
    const cardNormalizedCenterY = cardRelativeCenterY / gridHeight; //Normalized to the grid's height

    if (cardNormalizedCenterY <= 1 && cardNormalizedCenterY >= 0) {
      const translation = Math.sin(cardNormalizedCenterY * Math.PI) * 100;
      card.style.transform = `translate(-${translation}%, 0%)`;
      card.style.opacity = Math.sin(Math.PI * cardNormalizedCenterY)
    }else{
      card.style.transform = `translate(0%, 0%)`;
      card.style.opacity = 0;
    }
  });
}

function snapToCard(scrollValue, cardSnappingArray){
  let closestValue;

  for(let i = 0; i < cardSnappingArray.length; i++){
    const distance = Math.abs(scrollValue - cardSnappingArray[i]);
    if(closestValue == undefined){closestValue = cardSnappingArray[i]}
    if(distance < Math.abs(scrollValue - closestValue)){closestValue = cardSnappingArray[i]}
  }
  if(closestValue == undefined || closestValue == null){return scrollValue}
  return closestValue;
}

function calculateSnappingPositions(grid, cardsArray) {
  const gridRowGap = parseFloat(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"));
  let snappingPositions = []
  for(let i = 0; i < cardsArray.length; i++){
    const cardDimensions = getElementDimensions(cardsArray[i]);
    if(!cardDimensions) continue;
    const {height: cardHeight} = cardDimensions;

    const position = i * (gridRowGap + cardHeight);
    snappingPositions.push(position)
  }
  return snappingPositions;
}









export const SnappingScroller = ({ data, onFocus }) => {
  const scrollTarget = useRef(0);
  const acumulator = useRef(0);
  const animationIdRef = useRef(undefined);
  const cardSnappingPositions = useRef([])      //The center positions of each card, starting at 0
  const focusRef = useRef(null);


  const gridRef = useRef(null);
  const lineOfFocusRef = useRef(null);
  const cardArrayRef = useRef([]);

  ///Triggers when the grid scrolls
  function scrollHandler() {
    applyTransformation(gridRef.current, cardArrayRef.current);
  }


  //When a wheel event is detected (User Input)
  function wheelHandler(e) {
    e.preventDefault();
    
    const gridScrollDimensions = getElementScroll(gridRef.current);
    if(!gridScrollDimensions){
      console.log("The grid scroll dimensions aren't truthy: " + gridScrollDimensions)
      return;
    }
    
    const {scrollMax: gridScrollMax} = gridScrollDimensions;
    acumulator.current += e.deltaY * 0.5;
    acumulator.current = clamp(acumulator.current, 0, gridScrollMax);
    let previousValue = scrollTarget.current
    scrollTarget.current = snapToCard(acumulator.current, cardSnappingPositions.current);
    if(previousValue != scrollTarget.current){ //Only animates if there's a new scrollTarget
      focusRef.current = findCardByPosition(scrollTarget.current);
      animateScrollTo()
    } 
  }


  function findCardByPosition(scrollValue){
    for(let i = 0; i < cardSnappingPositions.current.length; i++){
      if(scrollValue == cardSnappingPositions.current[i]){return cardArrayRef.current[i]}
    }
    return undefined;
  }

  //ScrollTo Animation
  function animateScrollTo(){
    if(animationIdRef.current){
      cancelAnimationFrame(animationIdRef.current)
    }

    let initialTime;
    function initiate(timestamp, destination){
      initialTime = timestamp;
      let initialScroll = getElementScroll(gridRef.current).scrollTop;
      let amountToScroll = destination - initialScroll;
      animateScroll(timestamp, initialScroll, amountToScroll);
    }
    
    function cleanUpFunction(initialScroll, amountToScroll){ //This function certifies that the final scroll position is exactly the one requested initially.
      gridRef.current.scrollTo(0, initialScroll + amountToScroll);
    }

    let duration = 500;
    function animateScroll(timestamp, initialScroll, amountToScroll){
      const totalElapsedTime = (timestamp - initialTime) / duration;
      const easedProgress = easeInOutQuad(totalElapsedTime);
      if(totalElapsedTime <= 1){
        gridRef.current.scrollTo(0, initialScroll + amountToScroll * easedProgress);


        //Reshape the focus line
        //reshapeLineOfFocus();

        animationIdRef.current = requestAnimationFrame((timestamp) => animateScroll(timestamp, initialScroll, amountToScroll));
      }
      else{ //Finalizer
        cleanUpFunction(initialScroll, amountToScroll);
        if(lineOfFocusRef.current){
          findNearestCard(getElementDimensions(lineOfFocusRef.current));
        }
      }
    }
    animationIdRef.current = requestAnimationFrame((timestamp) => initiate(timestamp, scrollTarget.current))
  }
  
  
  function reshapeLineOfFocus(){
    const lineProperties = getElementDimensions(lineOfFocusRef.current);
    if(!lineProperties){
      console.log("Line properties doesn't evaluate as true: " + lineProperties);
      return;
    }
    const cardIndex = findNearestCard(lineProperties.centerY);
    const cardDimensions = getElementDimensions(cardArrayRef.current[cardIndex]);
    if(!cardDimensions){
      console.log("Card properties doesn't evaluate as true: " + cardDimensions);
    }
    
    function isIntersecting(elementA, elementB){
      const topA = elementA.top;
      const topB = elementB.top;
      const bottomA = elementA.top + elementA.height;
      const bottomB = elementB.top + elementB.height;
      
      return topA <= bottomB && topB <= bottomA;
    }
    
    
    
    function calculateIntersection(card, line){ //This function should only be run if there's an intersection
      //Vertical intersection      
      const cardBottom = card.top + card.height;
      const lineBottom = line.top + line.height;
      const vIntersectionStart = card.top >= line.top ? card.top : line.top;
      const vIntersectionEnd = cardBottom <= lineBottom ? cardBottom : lineBottom;
      
      
      //Horizontal intersection
      const cardRight = card.left + card.width;
      const lineRight = line.left + line.width;
      const hIntersectionStart = card.left >= line.left ? card.left : line.left;
      const hIntersectionEnd = cardRight <= lineRight ? cardRight : lineRight;
      
      
      return {verticalIntersection: {vIntersectionStart, vIntersectionEnd}, horizontalIntersection:{hIntersectionStart, hIntersectionEnd}}
    }
    
    
    
    
    if(!lineOfFocusRef.current){
      console.log("Eworror")
      return;
    } 
    if(!isIntersecting(cardDimensions, lineProperties)){
      lineOfFocusRef.current.style.opacity = 0.0;
      console.log("No intersection");
    }else{
      lineOfFocusRef.current.style.opacity = 1.;
      const intersection = calculateIntersection(cardDimensions, lineProperties);
      console.log(intersection);
    }
  }
  
  
  function findNearestCard(yValue){ //Returns the index of the card in the cardsRef.current array
    if(cardArrayRef.current.length === 0){
      console.log("Errror in the find nearest card")
      return;
    }
    if(cardArrayRef.current){
      let nearestDistance = null;
      let nearestCard = null;
      cardArrayRef.current.forEach((card, index) => {
        const cardDimensions = getElementDimensions(card)
        if(!cardDimensions){
          console.log("Erororororor")
        }

        //
        const {centerY: cardCenterY} = cardDimensions;
        if(nearestDistance == null){
          nearestDistance = Math.abs(yValue - cardCenterY);
          nearestCard = index;
        }

        //
        let distance = Math.abs(yValue - cardCenterY);
        if(distance < nearestDistance){
          nearestDistance = distance;
          nearestCard = index
        }
      });
      return nearestCard;
    }
  }
  
  //Event listeners
  useEffect(() => {
    const grid = gridRef.current;
    gridRef.current.addEventListener("wheel", wheelHandler, { passive: false });
    
    cardArrayRef.current = cardArrayRef.current.filter((card) => card !=null);
    
    
    cardSnappingPositions.current = calculateSnappingPositions(gridRef.current, cardArrayRef.current);
    applyTransformation(gridRef.current, cardArrayRef.current);
    return () => {
        grid.removeEventListener("wheel", wheelHandler);
    };
  }, [data]);  
  
  //onFocus
  useEffect(() => {
    if(focusRef.current != null){
      if(focusRef.current.firstChild.data == "Lisbon"){
        fetch("http://192.168.1.229:5000/capitals/image/something")
        .then((res) => res.json())
        .then((URIs) => {
          onFocus(URIs);
        });
      }
    }
    
  },[focusRef.current])
  
  
  
  
  
  return (
    <Container>
      <Grid ref={gridRef} onScroll={scrollHandler}>
        <Padding />
          {data.map((element, index) => (
            <Card key={index} ref={(el) => (cardArrayRef.current[index] = el)}>
              {element["Capital city"]}
            </Card>
          ))}
        <Padding />
      </Grid>
      {data.length > 0 && <FocusLine ref={lineOfFocusRef}></FocusLine>}
    </Container>   
  );
};