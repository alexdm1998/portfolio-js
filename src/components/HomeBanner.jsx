import React from 'react'
import { ViewFrame } from './ViewFrame.style'
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

const Moon = styled.div`
    position: absolute;
    top: 10%;
    right: -10%;
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    background-image: linear-gradient(to bottom right, #9e4f4f 40%, #aa2601);
    animation: ${AnimationMoon} 60s linear infinite;
`

const LeftPlanet = styled(Planet)`
    width: 100%;
    height: 100%;
`

const Wrapper = styled.div`
    position: absolute;
    left: 5vw;
    top: 5vw;
    width: 8vw;
    height: 8vw;
`

const RightPlanet = styled(Planet)`
    left: 35vw;
    top: 2vw;
    width: 2vw;
    height: 2vw;
`

const HomeBanner = () => {
    const [contourLPlanet, setContLPlanet] = useState("");
    const [contourRPlanet, setContRPlanet] = useState("")
    const styleLPlanet = {
        outline: contourLPlanet
    };
    const styleRPlanet = {
        outline: contourRPlanet
    };
    const whiteContour = "1px solid #ffffffb8";

  return (
    <HomeFrame>
        <Wrapper>
            <LeftPlanet style={styleLPlanet} onMouseEnter={() => setContLPlanet(whiteContour)} onMouseLeave={() => setContLPlanet("none")}></LeftPlanet>
            <Moon style={styleLPlanet} onMouseEnter={() => setContLPlanet(whiteContour)} onMouseLeave={() => setContLPlanet("none")}></Moon>
        </Wrapper>
        <RightPlanet style={styleRPlanet} onMouseEnter={() => setContRPlanet(whiteContour)} onMouseLeave={() => setContRPlanet("none")}></RightPlanet>
    </HomeFrame>
  )
}

export default HomeBanner