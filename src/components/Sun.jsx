import React, {useState} from "react";
import styled from "styled-components";
import { HoverScaleWrapper } from "./styles/onHoverScale.style";
import { useTheme, useThemeSwitch } from "../hooks/ThemeContext";
 

const WrapperSun = styled.div`
    position: fixed;
    top: -38vw;
    right: -25vw;
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

const SunDiv = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: linear-gradient(to bottom left, #1f0000, #910000 50%, #c62b00);
    background-size: 200% 200%;
    background-position: ${props => props.$isDarkSun === "light" ? "bottom left" : "top right"};
    transition: background-position 1s;
    box-shadow: 0 0 40px #ff000089,
    0 0 60px #9152529e;

    &:hover{
        background-position: ${props => props.$isDarkSun === "light" ? "top right" : "bottom left"};
    }
`


export const Sun = () => {
    const theme = useTheme();
    const switchTheme = useThemeSwitch();
    const [sunTheme, setSunTheme] = useState("light");

    function SwitchSunTheme(){
        setSunTheme(theme);
    }

    return(
        <WrapperSun>
            <HoverScaleWrapper style={{borderRadius:"50%"}}>
                <SunDiv $isDarkSun={sunTheme} onClick={switchTheme} onMouseLeave={SwitchSunTheme}/>
            </HoverScaleWrapper>
        </WrapperSun>
    )
}