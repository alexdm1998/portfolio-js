import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useElementDimensions } from "@hooks/useElementDimensions";

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

///Auxiliary functions
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(value, min, max){
  return Math.min(Math.max(value, min), max)
}


//Component
export const SnappingScroller = ({ data, onFocus}) => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollTarget = useRef(0);
  const acumulator = useRef(0);
  const animationIdRef = useRef(undefined);
  const cardSnappingPositions = useRef([])      //The center positions of each card, starting at 0
  const focusRef = useRef(null);
  const [imageURIs, setImageURIs] = useState([])
  const lineOfFocusRef = useRef(undefined)
  

  const {elementRef: focusLineRef, getDimensions: getFocusLineDimensions} = useElementDimensions();


  //Element Properties
  function getGridProperties() {
    if (gridRef.current) {
      const { top: top, height: height } = gridRef.current.getBoundingClientRect();
      const scrollHeight = gridRef.current.scrollHeight;
      const scrollTop = gridRef.current.scrollTop;
      return { top, height, center: top + height / 2, scrollHeight, maxScroll: scrollHeight - height, scrollTop};
    }
    return undefined;
  }
  
  function getCardProperties(index) {
    if (cardsRef.current && cardsRef.current[index] != null ) {
      const { top: top, height: height, width: width, left:left } = cardsRef.current[index].getBoundingClientRect();
      return { top, height, centerY: top + height / 2, centerX: left + width/2 };
    }
    return undefined;
  }
  
  function getLineOfFocusProperties(){
    const {top: top, left: left, width: width, height: height} = lineOfFocusRef.current.getBoundingClientRect();
    return {top, left, width, height, centerY: top + height/2, centerX: left + width/2}
  }

  ///Triggers when the grid scrolls
  function scrollHandler() {
    applyTransformation();
  }

  function applyTransformation(){
    const { top: gridTop, height: gridHeight } = getGridProperties();
    cardsRef.current.forEach((card, index) => {
      const { centerY: cardCenterY } = getCardProperties(index);
      const cardRelativeCenterY = cardCenterY - gridTop; //Relative to the grid
      const cardNormalizedCenterY = cardRelativeCenterY/ gridHeight; //Normalized to the grid's height

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

  //When a wheel event is detected (User Input)
  function wheelHandler(e) {
    e.preventDefault();
    acumulator.current += e.deltaY * 0.5;
    acumulator.current = clamp(acumulator.current, 0, getGridProperties().maxScroll);
    let previousValue = scrollTarget.current
    scrollTarget.current = snapToCard(acumulator.current);
    if(previousValue != scrollTarget.current){ //Only animates if there's a new scrollTarget
      focusRef.current = findCardByPosition(scrollTarget.current);
      animateScrollTo()
    } 
  }

  function calculateSnappingPositions() {
    const gridRowGap = parseFloat(window.getComputedStyle(gridRef.current).getPropertyValue("grid-row-gap"))
    cardSnappingPositions.current = []
    for(let i = 0; i < cardsRef.current.length; i++){
      const position = i * (gridRowGap + getCardProperties(i).height);
      cardSnappingPositions.current.push(position)
    }
  }

  function snapToCard(scrollValue){
    let closestValue;

    for(let i = 0; i < cardSnappingPositions.current.length; i++){
      const distance = Math.abs(scrollValue - cardSnappingPositions.current[i]);
      if(closestValue == undefined){closestValue = cardSnappingPositions.current[i]}
      if(distance < Math.abs(scrollValue - closestValue)){closestValue = cardSnappingPositions.current[i]}
    }
    if(closestValue == undefined || closestValue == null){return scrollValue}
    return closestValue;
  }

  function findCardByPosition(scrollValue){
    for(let i = 0; i < cardSnappingPositions.current.length; i++){
      if(scrollValue == cardSnappingPositions.current[i]){return cardsRef.current[i]}
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
      let initialScroll = getGridProperties().scrollTop;
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
        reshapeLineOfFocus();

        animationIdRef.current = requestAnimationFrame((timestamp) => animateScroll(timestamp, initialScroll, amountToScroll));
      }
      else{ //Finalizer
        cleanUpFunction(initialScroll, amountToScroll);
        if(focusLineRef.current){
          findNearestCard(getFocusLineDimensions.centerY);
        }
      }
    }
    animationIdRef.current = requestAnimationFrame((timestamp) => initiate(timestamp, scrollTarget.current))
  }
  

  //Event listeners (Put everything together)
  useEffect(() => {
    const grid = gridRef.current;
    gridRef.current.addEventListener("wheel", wheelHandler, { passive: false });
    return () => {
        grid.removeEventListener("wheel", wheelHandler);
    };
  }, [data]);

  useEffect(()=>{
    cardsRef.current = cardsRef.current.filter((card) => card !=null)
    calculateSnappingPositions();
  },[data])

  useEffect(() => {
    applyTransformation();
  },[data])

  

  function reshapeLineOfFocus(){
    const lineProperties = getFocusLineDimensions();
    const cardIndex = findNearestCard(lineProperties.centerY);
    const cardProperties = getCardProperties(cardIndex);


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

      

      if(!isIntersecting(cardProperties, lineProperties)){
        focusLineRef.current.style.opacity = 0.0;
        console.log("No intersection");
      }else{
        focusLineRef.current.style.opacity = 1.;
        const intersection = calculateIntersection(cardProperties, lineProperties);
        console.log(intersection);
      }
  }


  function findNearestCard(yValue){ //Returns the index of the card in the cardsRef.current array
    if(cardsRef.current){
      let nearestDistance = null;
      let nearestCard = null;
      cardsRef.current.forEach((element, index) => {
        if(nearestDistance == null){
          nearestDistance = Math.abs(yValue - getCardProperties(index).centerY);
          nearestCard = index;
        }
        let distance = Math.abs(yValue - getCardProperties(index).centerY);
        if(distance < nearestDistance){
          nearestDistance = distance;
          nearestCard = index
        }
      });
      return nearestCard;
    }
  }
  
  
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
  
  function renderCircle(radius, top, left, color){
    return (<svg width={2*radius} height={2*radius} style={{position: "fixed", top: top, left:left, transform: "translate(-50%,-50%)"}}>
      <circle r={radius} cx={radius} cy={radius} fill={color}>
      </circle>
    </svg>)
  }



  return (
    <Container>
      <Grid ref={gridRef} onScroll={scrollHandler}>
        <Padding />
          {data.map((element, index) => (
            <Card key={index} ref={(el) => (cardsRef.current[index] = el)}>
              {element["Capital city"]}
            </Card>
          ))}
        <Padding />
      </Grid>
      {data.length > 0 && <FocusLine ref={focusLineRef}></FocusLine>}
      {/* {lineOfFocusRef.current && (() => {
        const closestElement = findNearestCard(getLineOfFocusProperties().center);
        const {top: top, width: width, height: height, left: left} = closestElement.getBoundingClientRect();
        const center = top + height/2;
        const midway = left + width/2;
        return renderCircle(2, center, midway, "green");        
      })()}
      {lineOfFocusRef.current && renderCircle(1, getLineOfFocusProperties().center, getLineOfFocusProperties().midway, "blue")} */}
    </Container>   
  );
};
