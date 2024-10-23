import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

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
  transform: translate(0%, -30%);
`

const Image = styled.img`
  position: relative;

  width: 100px;
  height:100px;
`


///Auxiliary functions
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(value, min, max){
  return Math.min(Math.max(value, min), max)
}

export const SnappingScroller = ({ data, onFocus}) => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollTarget = useRef(0);
  const acumulator = useRef(0);
  const animationIdRef = useRef(undefined);
  const cardSnappingPositions = useRef([])      //The center positions of each card, starting at 0
  const focusRef = useRef(null);
  const [imageURIs, setImageURIs] = useState([])
  

  //Grid and Card Properties
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
      const { top: top, height: height } = cardsRef.current[index].getBoundingClientRect();
      return { top, height, position: top + height / 2 };
    }
    return undefined;
  }
  

  ///Triggers when the grid scrolls
  function scrollHandler() {
    applyTransformation();
  }

  function applyTransformation(){
    const { top: gridTop, height: gridHeight } = getGridProperties();
    cardsRef.current.forEach((card, index) => {
      const { position: cardPosition } = getCardProperties(index);
      const cardRelativePosition = cardPosition - gridTop; //Relative to the grid
      const cardNormalizedPosition = cardRelativePosition / gridHeight; //Normalized to the grid's height

      if (cardNormalizedPosition <= 1 && cardNormalizedPosition >= 0) {
        const translation = Math.sin(cardNormalizedPosition * Math.PI) * 100;
        card.style.transform = `translate(-${translation}%, 0%)`;
        card.style.opacity = Math.sin(Math.PI * cardNormalizedPosition)
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
    
    let duration = 500;
    function animateScroll(timestamp, initialScroll, amountToScroll){
      const totalElapsedTime = (timestamp - initialTime) / duration;
      const easedProgress = easeInOutQuad(totalElapsedTime);
      if(totalElapsedTime < 1){
        gridRef.current.scrollTo(0, initialScroll + amountToScroll * easedProgress);
        animationIdRef.current = requestAnimationFrame((timestamp) => animateScroll(timestamp, initialScroll, amountToScroll));
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



  //onFocus
  useEffect(() => {
    if(focusRef.current != null){
      if(focusRef.current.firstChild.data == "Lisbon"){
        console.log("Entrou")
        fetch("http://192.168.1.229:5000/capitals/image/something")
        .then((res) => res.json())
        .then((URIs) => {
          console.log(URIs)
          onFocus(URIs);
        });
      }
    }

  },[focusRef.current])


  useEffect(() => {
    if(imageURIs.length > 0){
      console.log(imageURIs)
    }
  },[imageURIs])



  
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
      {data.length > 0 && <FocusLine></FocusLine>}
    </Container>   
  );
};
