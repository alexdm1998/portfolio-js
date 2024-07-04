import styled, {keyframes } from 'styled-components'
import Contact from './components/viewframes/Contact'
import Gallery from './components/viewframes/Gallery'
import Introducer from './components/viewframes/Introducer'
import HomeBanner from './components/viewframes/HomeBanner'
import stars from './assets/stars.png'
import { useState} from 'react'
import { useTheme } from './hooks/ThemeContext'
import { useNavigation } from './hooks/NavigationContext'
import ThreeCanvas from './components/viewframes/ThreeCanvas'


const Navbar = styled.nav`
  position: fixed;
  top: 0px;
  height: 5dvh;
  width: 100%;
  border-bottom: 1px solid #d8d8d873;
  z-index: 2;
`

const Background = styled.div`
  position: relative;
  background-image: linear-gradient(to bottom left, #df3737,  #b0411f,#994f16 33%, #462299 66%, #242d93 80%, #0c031c);
  background-size: 300% 300%;
  background-position: ${props => props.$isDarkMode === "light" ? "top right" : "bottom left"};
  transition: background-position 5s;
  overflow: hidden;
  z-index: 1;

  @media (orientation: portrait) {
    background-image: radial-gradient(ellipse at top, #df3737, #bc7100);
  }
`

const Container = styled.div`
  pointer-events: all;
  position: relative;
  height: 100vh;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
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
  const navigation = useNavigation(); //Navigation Context
  const theme = useTheme();
  const [parallaxFactor, SetParallaxFactor] = useState();
  let scroll;
  const scrollEvent = (e) => {
    scroll = e.target.scrollTop;
    if(!window.matchMedia("(orientation: portrait)").matches){SetParallaxFactor(scroll * (0.12));} //Parallax for non-portrait mode
    else{SetParallaxFactor(scroll * (0.02));} //Parallax for portrait mode
  }
  

  return (
    <>
      <Navbar/>
      <Background $isDarkMode={theme}>
          <Container onScroll={scrollEvent}>
            <HomeBanner parallaxValue={parallaxFactor}/>
            {navigation == "LP" && <><Introducer/><Gallery/><Contact/></>}
            {navigation == "RP" && <><ThreeCanvas></ThreeCanvas><Sign src={stars}/></>}
          </Container>
      </Background>
    </>
  )
}

export default App