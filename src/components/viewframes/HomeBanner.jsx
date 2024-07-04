import React from 'react'
import styled from 'styled-components'
import { Dashboard } from '../Dashboard'
import { ViewFrame } from './ViewFrame.style'
import { RightPlanet } from '../navigations/RightPlanet'
import { LeftPlanet } from '../navigations/LeftPlanet'
import { Sun } from '../Sun'
import { Dunes } from '../Dunes'

const HomeFrame = styled(ViewFrame)`
    position: relative;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: initial;
`

const HomeBanner = ({parallaxValue}) => {
  return (
    <HomeFrame>
        <Dashboard/>
        <Dunes parallaxValue={parallaxValue}/>
        <Sun parallaxValue={parallaxValue}/>
        <LeftPlanet/>
        <RightPlanet/>
    </HomeFrame>
  )
}

export default HomeBanner