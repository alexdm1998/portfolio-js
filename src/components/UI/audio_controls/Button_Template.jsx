import styled from "styled-components";
import React from "react";
import { useState } from "react";


const animationTime = 250 //milliseconds

const ButtonContainer = styled.div`
    height: ${props => props.$size || "2dvw"};
    width: ${props => props.$size || "2dvw"};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 1;
    background-color: #00000072;
    transition: transform ${animationTime}ms ease-in-out;
    &.clicked{
        transform: scale(1.1);
    }
`


export const Button_Template = ({children, onClick, size}) => {
    const [isClicked, setIsClicked] = useState(false);


    function clickEvent(){
        if(typeof onClick === 'function') onClick()
        setIsClicked(true)
        setTimeout(() => {
            setIsClicked(false)
        }, animationTime);
    }


    return(
        <ButtonContainer onClick={clickEvent} $size={size}>
            {children}
            <Background className={isClicked ? "clicked" : ""}></Background>
        </ButtonContainer>
    )
}