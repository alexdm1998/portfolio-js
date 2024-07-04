import styled from "styled-components";
import React from "react";
import { useState } from "react";

const Inspectable = styled.span`
    border-bottom: 2px dotted black;
`

const bannerColor = "#b84d2a";
const TooltipBanner = styled.div`
  visibility: ${props => props.$isVisible ? "visible" : "hidden"};
  width: 200px;
  height: 200px;
  background-color: ${bannerColor};
  color: #fff;
  text-align: center;
  padding: 5px 3px;
  border: 3px solid #852a2a;
  border-radius: 6px;

  position: absolute;
  z-index: 99;
`

const radius = 10;
const dimension = 25;
const length = 2 * 3.14 * radius;
const Icon = styled.svg`
    position: absolute;
    right: 5%;
    height: ${dimension}px;
    width: ${dimension}px;
    transform: rotate(-90deg);
    stroke-dasharray: ${length};
    stroke-dashoffset: ${props => props.$isVisible ? 0 : length};
    transition: stroke-dashoffset 2s linear;
`


//This only wrapps around plain text.
export const Tooltip = ({children}) => {
    const [tooltipVisibility, setTooltipVisibility] = useState(false);
    const [isLocked, setIsLocked] = useState(false)
    try{
        if(typeof children !== 'string'){
            throw new Error(`${Tooltip.name}'s children must be only of type string`)
        }
    } catch (error) {
        console.error('Error:', error.message)
    }


    function transitionHandler() {
        if(tooltipVisibility){
            if(!isLocked){
                setIsLocked(true);
            }else{
                setIsLocked(false);
            }
        }
    }
    
    let inspectableHovered = false;
    let bannerHovered = false;
    let switch_var;
    function tooltipHandler(tag, bool){ //Inspectable mouse enter > setTooltipVisibility(true) //Inspectable mouse leave > setTooltipVisibility(false) only if not locked.
        if(tag == "inspectable") {inspectableHovered = bool};
        if(tag == "banner") {bannerHovered = bool};
        if(inspectableHovered && !tooltipVisibility)                    {switch_var = 0}
        if(!(isLocked || inspectableHovered) && tooltipVisibility)      {switch_var = 1}
        if(isLocked && !(inspectableHovered || bannerHovered))          {switch_var = 2}
        switch(switch_var){
            case 0:
                setTooltipVisibility(true);
                break;
            case 1:
                setTooltipVisibility(false);
                break;
            case 2:
                setTimeout(closeBanner, 100);
                break;
            case undefined:
                break;
        }
    }

    function closeBanner(){
        if(isLocked && !(bannerHovered || inspectableHovered) && tooltipVisibility){
            setTooltipVisibility(false)
            setIsLocked(false)
        }
    }

    
    return(
        <>
            <Inspectable onMouseEnter={() => tooltipHandler("inspectable", true)} onMouseLeave={() => tooltipHandler("inspectable", false)}>{children}</Inspectable>
            <TooltipBanner $isVisible={tooltipVisibility} onMouseEnter={() => tooltipHandler("banner", true)} onMouseLeave={() => tooltipHandler("banner", false)}>
                <Icon $isVisible={tooltipVisibility} onTransitionEnd={transitionHandler}>
                    <circle r={radius} cx={dimension/2} cy={dimension/2} stroke="#e7a82a" strokeWidth="1.5px" fill={bannerColor}></circle>
                </Icon>
                {children}
            </TooltipBanner>
        </>
    )
}
