import React, { useState, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import { Planet as PlanetTemplate } from "../templates/Planet.style";
import { HoverScaleWrapper } from "../styles/onHoverScale.style";
import { useTheme } from "../../hooks/ThemeContext";
import { useNavigation, useSelection } from "../../hooks/NavigationContext";

//Moon
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





//Position and transition
const PositionWrapper = styled.div`
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

const Planet = styled(PlanetTemplate)`
    width: 100%;
    height: 100%;
`

export const LeftPlanet = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const select = useSelection();
    const [isFocus, setFocus] = useState(false); //Focus is either selected (clicked) or mouse over
    const tag = "LP"

    function OutlineHandler(){
        if(navigation == tag){
            setFocus(true);
        }else{
            setFocus(false);
        }
    }

    useEffect(() => {
        OutlineHandler();
    }, [navigation])
    
    return(
        <PositionWrapper>
            <HoverScaleWrapper style={{borderRadius:"50%"}}>
                <Planet $isDarkMode={theme} $isFocus={isFocus} onClick={()=>{select(tag)}} onMouseEnter={() => setFocus(true)} onMouseLeave={OutlineHandler}></Planet>
                <Moon/>
            </HoverScaleWrapper>
        </PositionWrapper>
    )
}