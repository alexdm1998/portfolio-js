import styled, {keyframes } from 'styled-components'
import Contact from './components/viewframes/Contact'
import Gallery from './components/viewframes/Gallery'
import Introducer from './components/viewframes/Introducer'
import HomeBanner from './components/viewframes/HomeBanner'
import dune from './assets/Dune.svg'
import dune_back from './assets/Back_Dune.svg'
import dune_fade from './assets/Fade_Dune.svg'
import dune_distant from './assets/Distant_Dune.svg'
import stars from './assets/stars.png'
import { useState} from 'react'
import { ThemeContextProvider } from './hooks/ThemeContext'
import { useNavigation } from './hooks/NavigationContext'


const Background = styled.div`
  position: relative;
  background-image: linear-gradient(to bottom left, #df3737,  #bc7100,#cf7500);
  overflow: hidden;
  z-index: 1;

  @media (orientation: portrait) {
    background-image: radial-gradient(ellipse at top, #df3737, #bc7100);
  }
`

const duneYOffset = -20;
const Dune = styled.div`
  position: absolute;
  bottom: ${duneYOffset}vh;
  right: 0px;
  width: 60%;
  aspect-ratio: 494/281;
  background-image: url(${dune});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 3;

  @media (orientation: portrait){
    display: none;
  }
`
const dune_backYOffset = -20;
const Dune_Back = styled.div`
  position: absolute;
  bottom: ${dune_backYOffset}vh;
  right: 0px;
  width: 40%;
  aspect-ratio: 297/231;
  background-image: url(${dune_back});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;

  @media (orientation: portrait){
    display: none;
  }
`

const dune_fadeYOffset = -10;
const Dune_Fade = styled.div`
  position: absolute;
  bottom: ${dune_fadeYOffset}vh;
  right: 50%;
  width: 40%;
  aspect-ratio: 538/137;
  background-image: url(${dune_fade});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 2;

  @media (orientation: portrait){
    display: none;
  }
`
const dune_distantYOffset = -3;
const Dune_Distant = styled.div`
  position: absolute;
  bottom: ${dune_distantYOffset}vh;
  right: 35%;
  width: 30%;
  aspect-ratio: 460/65;
  background-image: url(${dune_distant});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 0;

  @media (orientation: portrait){
    display: none;
  }
`


const Container = styled.div`
  pointer-events: all;
  position: relative;
  height: 100vh;
  scroll-behavior: smooth;
  overflow-y: auto;
  &::-webkit-scrollbar{
    display: none;
  }
  z-index: 3;
`

const SignAnimation = keyframes`
  0% {
    -webkit-mask-position: bottom;
  }
`

const Sign = styled.img`
  height: 100px;
  left: 10%;
  position: absolute;
  -webkit-mask-image: linear-gradient(to top, transparent, transparent 25%, #00000078 50%, #000000da 75%, #000000da);
  -webkit-mask-position: 0% 0;
  -webkit-mask-size: 100% 400%;
  animation: ${SignAnimation} 4s linear 1 alternate;
`

function App() {
  const [sunHeight, setSunHeight] = useState();
  const [duneHeight, setDuneHeight] = useState();
  const [duneFadeHeight, setDuneFadeHeight] = useState();
  const [duneBackHeight, setDuneBackHeight] = useState();
  const [duneDistantHeight, setDuneDistantHeight] = useState();
  const [planetsParallax, setPlanetsParallax] = useState();
  
  const styleSun = {transform: `translate(0px, ${sunHeight}vh)`};
  const styleDune = {transform: `translate(0px, ${duneHeight}vh)`};
  const styleDuneBack = {transform: `translate(0px, ${duneBackHeight}vh)`};
  const styleDuneFade = {transform: `translate(0px, ${duneFadeHeight}vh)`};
  const styleDuneDistant = {transform: `translate(0px, ${duneDistantHeight}vh)`};

  const scrollEvent = (e) => {
    const scrollTop = e.target.scrollTop;
    if(!window.matchMedia("(orientation: portrait)").matches){
      if(scrollTop * (-0.005) > duneYOffset){ //Only parallax until it shows the whole Dune svg
        setDuneHeight(scrollTop * (-0.004));
        setDuneFadeHeight(scrollTop * (-0.002));
        setDuneBackHeight(scrollTop * (-0.002));
        setDuneDistantHeight(scrollTop * (-0.001));
        setSunHeight(scrollTop * (-0.01));
        setPlanetsParallax(scrollTop * (0.12));
      }
    }else{                                  //Parallax for portrait mode
      setSunHeight(scrollTop * (0.01));
      setPlanetsParallax(scrollTop * (0.02));
    }
  }

  const navigation = useNavigation();
  return (
    <ThemeContextProvider>
        <Background>
            <Dune style={styleDune}/>
            <Dune_Fade style={styleDuneFade}/>
            <Dune_Back style={styleDuneBack}/>
            <Dune_Distant style={styleDuneDistant}/>
            <Container onScroll={scrollEvent}>
              <HomeBanner planetsParallax={planetsParallax}/>
              {navigation == "LP" && <><Introducer/><Gallery/><Contact/></>}
              {navigation == "RP" && <Sign src={stars}/>}
            </Container>
        </Background>
    </ThemeContextProvider>
  )
}

export default App