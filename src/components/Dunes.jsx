import styled from "styled-components";
import Dune_SVG from '../assets/Dune.svg'
import Back_Dune_SVG from '../assets/Back_Dune.svg'
import Fade_Dune_SVG from '../assets/Fade_Dune.svg'
import Distant_Dune_SVG from '../assets/Distant_Dune.svg'
import SVG from 'react-inlinesvg'
import { useTheme } from "../hooks/ThemeContext";


//TODO: Add variation to colours
const lightColour = "#102552"
const shadowColour = "#0d103d"

//Shared properties the multiple dune elements || TEMPLATE
const Dune_Wrapper_Template = styled.div`
  position: fixed;
  bottom: ${props => props.$verticalOffset}vh;
  z-index: ${props => props.$zIndex};
  pointer-events: none;
  @media (orientation: portrait), (max-height:300px){
    display: none;
  }
`
const Dune_Template = styled(SVG)`
  path[component="light"], path[component="shadow"]{
    transition: fill 5s ease;
  }
`

//Instances
const DuneForegroundWrapper = styled(Dune_Wrapper_Template)`
  right: 0px;
  width: 60%;
`
const DuneForegroudSVG = styled(Dune_Template)`
  path[component="light"]{
    fill: ${props => props.$theme === "light" ? "" : lightColour};
  }
  path[component="shadow"]{
    fill: ${props => props.$theme === "light" ? "" : shadowColour};
  }
`

const DuneBackWrapper = styled(Dune_Wrapper_Template)`
  right: 0px;
  width: 40%;
`
const DuneBackSVG = styled(Dune_Template)`
  path[component="light"]{
    fill: ${props => props.$theme === "light" ? "" : lightColour};
  }
  path[component="shadow"]{
    fill: ${props => props.$theme === "light" ? "" : shadowColour};
  }
`

const DuneFadeWrapper = styled(Dune_Wrapper_Template)`
  right: 50%;
  width: 40%;
`
const DuneFadeSVG = styled(Dune_Template)`
  path[component="light"]{
    fill: ${props => props.$theme === "light" ? "" : lightColour};
  }
  path[component="shadow"]{
    fill: ${props => props.$theme === "light" ? "" : shadowColour};
  }
`

const DuneDistantWrapper = styled(Dune_Wrapper_Template)`
  right: 35%;
  width: 30%;
`
const DuneDistantSVG = styled(Dune_Template)`
  path[component="shadow"]{
    fill: ${props => props.$theme === "light" ? "" : shadowColour};
  }
`

export const Dunes = ({parallaxValue}) => {
    let duneHeight = (parallaxValue * 0.05)
    const styleDuneForefront = {transform: `translate(0px, ${-duneHeight}vh)`}
    const styleDune_Back = {transform: `translate(0px, ${-duneHeight * 0.4}vh)`}
    const styleDune_Fade = {transform: `translate(0px, ${-duneHeight * 0.3}vh)`}
    const styleDune_Distant = {transform: `translate(0px, ${-duneHeight * 0.2}vh)`}

    const theme = useTheme();

    return(
        <>
          <DuneForegroundWrapper $verticalOffset={-20} $zIndex={3} style={styleDuneForefront}>
            <DuneForegroudSVG src={Dune_SVG} $theme={theme}></DuneForegroudSVG>
          </DuneForegroundWrapper>
          <DuneBackWrapper $verticalOffset={-20} $zIndex={1} style={styleDune_Back}>
            <DuneBackSVG src={Back_Dune_SVG} $theme={theme}></DuneBackSVG>
          </DuneBackWrapper>
          <DuneFadeWrapper $verticalOffset={-10} $zIndex={2} style={styleDune_Fade}>
            <DuneFadeSVG src={Fade_Dune_SVG} $theme={theme}></DuneFadeSVG>
          </DuneFadeWrapper>
          <DuneDistantWrapper $verticalOffset={-3} $zIndex={0} style={styleDune_Distant}>
            <DuneDistantSVG src={Distant_Dune_SVG} $theme={theme}></DuneDistantSVG>
          </DuneDistantWrapper>
        </>
    )
}