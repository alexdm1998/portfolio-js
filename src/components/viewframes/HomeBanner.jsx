import React from 'react'
import { ViewFrame } from './ViewFrame.style'
import styled from 'styled-components'
import { RightPlanet } from '../navigations/RightPlanet'
import { LeftPlanet } from '../navigations/LeftPlanet'
import { Sun } from '../Sun'

const HomeFrame = styled(ViewFrame)`
    position: relative;
    display: block;
    overflow: hidden;
`

const HomeBanner = ({planetsParallax}) => {
    const styleLPlanet = {
        outline: contourLPlanet
    };
    
    const styleRPlanet = {
        outline: contourRPlanet,
        transform: `translate(0px, ${planetsParallax}px)`
    };
    
    const styleLPlanetnMoon = {
        transform: `translate(0px, ${planetsParallax}px)`
    };
    
  return (
    <HomeFrame>
        <Sun></Sun>
        <LeftPlanet/>
        <RightPlanet/>
    </HomeFrame>
  )
}

export default HomeBanner