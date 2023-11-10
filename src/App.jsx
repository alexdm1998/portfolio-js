import styled from 'styled-components'
import Contact from './components/Contact'
import Gallery from './components/Gallery'
import Introducer from './components/Introducer'
import HomeBanner from './components/HomeBanner'
import dune from './assets/Dune.svg'

const Background = styled.div`
  position: relative;
  background-image: linear-gradient(to bottom left, #df3737,  #bc7100,#cf7500);
  overflow: hidden;
  z-index: 1;
`
const Sun = styled.div`
    position: absolute;
    top: -38vw;
    right: -18vw;
    width: 50vw;
    height: 50vw;
    border-radius: 50%;
    background-image: linear-gradient(to bottom right, #910000 10%, #c62b00);
    float: right;
    box-shadow: 0 0 40px #ff000089,
    0 0 60px #9152529e;
`

const Dune = styled.div`
  position: absolute;
  bottom:0px;
  right: 0px;
  width: 60%;
  aspect-ratio: 494/281;
  background-image: url(${dune});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 2;
`

const Container = styled.div`
  position: relative;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  &::-webkit-scrollbar{
    display: none;
  }
  z-index: 3;
`



function App() {
  return (
    <Background>
        <Sun></Sun>
        <Dune></Dune>
        <Container>
          <HomeBanner></HomeBanner>
          <Introducer></Introducer>
          <Gallery></Gallery>
          <Contact></Contact>    
        </Container>
    </Background>
  )
}

export default App