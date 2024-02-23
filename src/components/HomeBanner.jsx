import React, { useEffect } from 'react'
import { ViewFrame } from './ViewFrame.style'
import { HoverScaleWrapper } from './onHoverScale.style'
import styled, { keyframes } from 'styled-components'
import { useState } from 'react'

const HomeFrame = styled(ViewFrame)`
    position: relative;
    display: block;
    overflow: hidden;
`

//Template
const Planet = styled.div`
    position: absolute;
    border-radius: 50%;
    background-image: linear-gradient(to bottom right, #910000 10%, #c62b00);
`


const LeftPlanet = styled(Planet)`
    width: 100%;
    height: 100%;
`


const AnimationMoon = keyframes`
    0%{
        transform: translate(1vw,0px);
    }
    50%{
        transform: translate(-9vw, 1vw);
    }
    100%{
        transform: translate(1vw,0px);
        z-index: -1;
    }
`

const AnimationMoonPortrait = keyframes`
    0%{
        transform: translate(2vh,0px);
    }
    50%{
        transform: translate(-16vh, 2vh);
    }
    100%{
        transform: translate(2vh,0px);
        z-index: -1;
    }
`


const Moon = styled.div`
    position: absolute;
    top: 10%;
    right: -10%;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background-image: linear-gradient(to bottom right, #9e4f4f 40%, #aa2601);
    animation: ${AnimationMoon} 60s linear infinite;

    @media (orientation: portrait) {
        animation: ${AnimationMoonPortrait} 30s linear infinite;
    }
`

const WrapperLP = styled.div`
    pointer-events: all;
    position: absolute;
    left: 5vw;
    top: 5vw;
    width: 8vw;
    height: 8vw;
    
    @media (orientation: portrait){
      right: 0;
      left: 0;
      margin-left: calc((100vw - 16vh)/2);
      margin-right: calc((100vw - 16vh)/2);
      top: 25vh;
      width: 16vh;
      height: 16vh;
    }
`

const WrapperRP = styled.div`
    pointer-events: all;
    position: absolute;
    left: 35vw;
    top: 2vw;
    width: 2vw;
    height: 2vw;

    @media (orientation: portrait){
      right: 0;
      left: 0;
      margin-left: calc((100vw - 5vh)/2);
      margin-right: calc((100vw - 5vh)/2);
      top: 46vh;
      width: 5vh;
      height: 5vh;
    }
`

const RightPlanet = styled(Planet)`
    width: 100%;
    height: 100%;
`




const WrapperSun = styled.div`
    position: fixed;
    top: -38vw;
    right: -18vw;
    width: 50vw;
    height: 50vw;
    float: right;

    @media (orientation: portrait){
    top: -30vh;
    right: 0;
    left: 0;
    margin-left: calc((100vw - 50vh)/2);
    margin-right: calc((100vw - 50vh)/2);
    width: 50vh;
    height: 50vh;
  }
`
const Sun = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: linear-gradient(to bottom left, #1f0000, #910000 50%, #c62b00);
    background-size: 200% 200%;
    background-position: bottom left;
    transition: background-position 1s;
    box-shadow: 0 0 40px #ff000089,
    0 0 60px #9152529e;

    &:hover{
        background-position: top right;
    }
`

const HomeBanner = ({planetsParallax, conditionalRenderer}) => {
    const [contourLPlanet, setContLPlanet] = useState("");
    const [contourRPlanet, setContRPlanet] = useState("");
    const [selectedPlanet, setSelectedPlanet] = useState("");
    const styleLPlanet = {
        outline: contourLPlanet,
    };
    const styleRPlanet = {
        outline: contourRPlanet,
        transform: `translate(0px, ${planetsParallax}px)`
    };

    const styleLPlanetnMoon = {
        transform: `translate(0px, ${planetsParallax}px)`
    }
    const whiteContour = "1px solid #ffffffb8";


    const condKeyValPair = {
        LP: setContLPlanet,
        RP: setContRPlanet
    };


    function contourHandler(){
        for(const key in condKeyValPair){
            if(key == selectedPlanet){
                condKeyValPair[key](whiteContour);
            }
            else{
                condKeyValPair[key]("none");
            }
        }
    }
    
    useEffect(() => {
        contourHandler();
    }, [selectedPlanet]);
        




  return (
    <HomeFrame>
        <WrapperSun>
            <HoverScaleWrapper style={{borderRadius:"50%"}}>
                <Sun></Sun>
            </HoverScaleWrapper>
        </WrapperSun>
        <WrapperLP style={styleLPlanetnMoon}>
            <HoverScaleWrapper style={{borderRadius:"50%"}}>
                <LeftPlanet style={styleLPlanet} onMouseEnter={() => setContLPlanet(whiteContour)} onMouseLeave={contourHandler} onMouseDown={() => {conditionalRenderer("LP"); setSelectedPlanet("LP")}}></LeftPlanet>
                <Moon style={styleLPlanet} onMouseEnter={() => setContLPlanet(whiteContour)} onMouseLeave={contourHandler} onMouseDown={() => {conditionalRenderer("LP"); setSelectedPlanet("LP")}}></Moon>
            </HoverScaleWrapper>
        </WrapperLP>
        <WrapperRP>
            <HoverScaleWrapper style={{borderRadius:"50%"}}>
                <RightPlanet style={styleRPlanet} onMouseEnter={() => setContRPlanet(whiteContour)} onMouseLeave={contourHandler} onMouseDown={() => {conditionalRenderer("RP"); setSelectedPlanet("RP")}}></RightPlanet>
            </HoverScaleWrapper>
        </WrapperRP>
    </HomeFrame>
  )
}

export default HomeBanner