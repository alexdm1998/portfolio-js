import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Planet as PlanetTemplate } from "../templates/Planet.style";
import { HoverScaleWrapper } from "../styles/onHoverScale.style";
import { useTheme } from "../../hooks/ThemeContext";
import { useNavigation, useSelection } from "../../hooks/NavigationContext";

//Position and transition
const PositionWrapper = styled.div`
    pointer-events: all;
    position: absolute;
    left: 35vw;
    top: 12dvh;
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

const Planet = styled(PlanetTemplate)`
    width: 100%;
    height: 100%;
`

export const RightPlanet = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const select = useSelection();
    const [isFocus, setFocus] = useState(false); //Focus is either selected (clicked) or mouse over
    const tag = "RP"

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
                <Planet $isDarkMode={theme} $isFocus={isFocus} onClick={()=>select(tag)} onMouseEnter={()=>setFocus(true)} onMouseLeave={OutlineHandler}>
                </Planet>
            </HoverScaleWrapper>
        </PositionWrapper>
    )
}