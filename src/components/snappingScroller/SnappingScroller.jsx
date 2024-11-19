import React, { useRef, useEffect, useState} from "react";
import styled from "styled-components";
import { getElementDimensions, getElementScroll } from "@utils/ElementDimensions";
import { Card } from "./Card";
import { SnappingScrollerSelector } from "./SnappingScrollerSelector";

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


const Padding = styled.div`
  height: 8rem;
  width: 100%;
  position: relative;
`;

///Util functions
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(value, min, max){
  return Math.min(Math.max(value, min), max)
}


//Auxiliary functions
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


//ScrollTo Animation
//Returns selected card
async function animateScrollTo(animationIdReference, scrollTargetRef, gridRef, cardsArrayRef){
  
  return new Promise((resolve) => {
    let initialTime;
    function initiate(timestamp, destination){
      initialTime = timestamp;
      let initialScroll = getElementScroll(gridRef.current).scrollTop;
      let amountToScroll = destination - initialScroll;
      animateScroll(timestamp, initialScroll, amountToScroll);
    }
    
    
    let duration = 500;
    function animateScroll(timestamp, initialScroll, amountToScroll){
      const totalElapsedTime = (timestamp - initialTime) / duration;
      const easedProgress = easeInOutQuad(totalElapsedTime);
      if(totalElapsedTime <= 1){
        gridRef.current.scrollTo(0, initialScroll + amountToScroll * easedProgress);      
        animationIdReference.current = requestAnimationFrame((timestamp) => animateScroll(timestamp, initialScroll, amountToScroll));
      }
      else{ //Finalizer
        cleanUpFunction(initialScroll, amountToScroll);
      }
    }
    
    function cleanUpFunction(initialScroll, amountToScroll){ //This function certifies that the final scroll position is exactly the one requested initially.
      gridRef.current.scrollTo(0, initialScroll + amountToScroll);
      const focusedCard = findClosestToFocus(gridRef, cardsArrayRef)
      resolve(focusedCard);
    }
  
    //Cancels previous animation chain on (sometimes multiple) wheel event triggers.
    if(animationIdReference.current) cancelAnimationFrame(animationIdReference.current);
  
    animationIdReference.current = requestAnimationFrame((timestamp) => initiate(timestamp, scrollTargetRef.current))
  })

  
}


  //Returns the closest card to the focus line.
  //          
  //Caveat: • It assumes the focus line to be perfectly centered with the grid, vertically;
  function findClosestToFocus(gridRef, cardArrayRef){
    const gridScrollDimensions = getElementScroll(gridRef.current);
    const gridElementDimensions = getElementDimensions(gridRef.current);
    if(!gridScrollDimensions || !gridElementDimensions) return;
    const {centerY: gridCenterY} = gridElementDimensions;

    if(cardArrayRef.current.length === 0){
      return;
    }


    let closestDistance = null;
    let closestCard = null;
    cardArrayRef.current.forEach(card => {
      if(!card) return;
      
      const cardDimensions = getElementDimensions(card);
      if(!cardDimensions) return;
      const {centerY: cardCenterY} = cardDimensions;
      let distanceToLine = Math.abs(cardCenterY - gridCenterY)
      if(closestDistance == null){
        closestDistance = distanceToLine;
        closestCard = card;
        return;
      }

      if(distanceToLine < closestDistance){
        closestDistance = distanceToLine;
        closestCard = card;
      }
    });
    return closestCard;
  }

export const SnappingScroller = ({ data, onFocus }) => {
  const scrollTarget = useRef(0);
  const acumulator = useRef(0);
  const animationIdRef = useRef(undefined);
  const cardSnappingPositions = useRef([])      //The center positions of each card, starting at 0


  const gridRef = useRef(null);

  const cardArrayRef = useRef([]);
  const [gridScroll, setGridScroll] = useState(0);

  //For the focus line
  const [nearestCard, setNearestCard] = useState(null);
  const [selection, setSelection] = useState(null);

  /**
   * 
   * Custom onScroll event entry point.
   * Calls updateCardTransform to set the 
   * 
   */
  function scrollHandler() {
    const gridScrollDimensions = getElementScroll(gridRef.current)
    setGridScroll(gridScrollDimensions.scrollTop);
    const focusedCard = findClosestToFocus(gridRef, cardArrayRef);
    let focusedCardDetails = getElementDimensions(focusedCard);
    if(focusedCardDetails){
      focusedCardDetails.borderRadius = parseFloat(window.getComputedStyle(focusedCard).borderRadius)
      setNearestCard(focusedCardDetails);
    }
  }

  /**
   * 
   * Mouse wheel event handler (User input)
   * @param {WheelEvent} e Mouse wheel (or equivalent) event.
   * 
   *  
   */
  async function wheelHandler(e) {
    e.preventDefault();
    const gridScrollDimensions = getElementScroll(gridRef.current);
    const gridElementDimensions = getElementDimensions(gridRef.current);
    if(!gridScrollDimensions || !gridElementDimensions){
      console.log("The grid scroll dimensions aren't truthy: " + gridScrollDimensions)
      console.log("or grid element dimensions aren't truthy: " + gridElementDimensions)
      return;
    }
    const {scrollMax: gridScrollMax} = gridScrollDimensions;
    acumulator.current += e.deltaY * 0.5;
    acumulator.current = clamp(acumulator.current, 0, gridScrollMax);
    let previousValue = scrollTarget.current
    scrollTarget.current = snapToCard(acumulator.current, cardSnappingPositions.current);
    if(previousValue != scrollTarget.current){ //Only animates if there's a new scrollTarget
      const selectedCard = await animateScrollTo(animationIdRef, scrollTarget, gridRef, cardArrayRef)
      setSelection(selectedCard)
    } 
  }
  
  
  //When data
  useEffect(() => {
    const grid = gridRef.current;
    gridRef.current.addEventListener("wheel", wheelHandler, { passive: false });
    
    cardArrayRef.current = cardArrayRef.current.filter((card) => card !=null);    
    
    cardSnappingPositions.current = calculateSnappingPositions(gridRef.current, cardArrayRef.current);

    const focusedCard = findClosestToFocus(gridRef, cardArrayRef);
    setSelection(focusedCard);
    return () => {
        grid.removeEventListener("wheel", wheelHandler);
    };
  }, [data]);  
  
  //onFocus
  function onSelection(e){
    onFocus(e);
  }

  return (
    <Container>
      <Grid ref={gridRef} onScroll={scrollHandler}>
        <Padding />
          {data.map((element, index) => (
            <Card key={index} ref={(el) => (cardArrayRef.current[index] = el)} text={element["Capital city"]} grid={gridRef} gridScroll={gridScroll}/>
          ))}
        <Padding />
      </Grid>
      {data.length > 0 && <SnappingScrollerSelector closestCardDetails={nearestCard} selection={selection} onSelection={onSelection}/>}
    </Container>   
  );
};