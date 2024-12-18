import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Hero } from "../components/hero/Hero";
import Gallery from "../components/containers/Gallery";
import Introducer from "../components/containers/Introducer";
import Contact from "../components/containers/Contact";
import { Navbar } from "../components/navbar/Navbar";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "../contexts/NavigationContext";
import { WelcomeView } from "../components/welcome/WelcomeView";
import { Footer } from "@components/footer/Footer";
import { useExperienceMemory } from "@contexts/ExperienceMemoryContext";

const Background = styled.div`
  position: relative;
  background-image: linear-gradient(
    to bottom left,
    #df3737,
    #b0411f,
    #994f16 33%,
    #462299 66%,
    #242d93 80%,
    #0c031c
  );
  background-size: 300% 300%;
  background-position: ${(props) =>
    props.$isDarkMode === "light" ? "top right" : "bottom left"};
  transition: background-position 5s;
  overflow: hidden;
  z-index: 1;

  @media (orientation: portrait) {
    background-image: radial-gradient(ellipse at top, #df3737, #bc7100);
  }
`;

const Container = styled.div`
  pointer-events: all;
  position: relative;
  height: 100vh;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 3;
`;

export const App = () => {
  //Contexts
  const navigation = useNavigation();
  const theme = useTheme();
  //Variables
  const homebanner_ref = useRef(null);
  const [parallaxFactor, setParallaxFactor] = useState();
  const [navbarRender, setNavbarRender] = useState(true);

  const { isRegistered, registerComponent } = useExperienceMemory();

  //Parallax logic
  let scroll;
  const scrollEvent = (e) => {
    scroll = e.target.scrollTop;
    if (!window.matchMedia("(orientation: portrait)").matches) {
      setParallaxFactor(scroll * 0.12);
    } else {
      setParallaxFactor(scroll * 0.02);
    }
  };

  //Intersection logic for navbar render
  const intersectionOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  };

  function intersectionEvent(entries) {
    if (entries[0].isIntersecting == true) {
      setNavbarRender(true);
    }
    if (entries[0].isIntersecting == false) {
      setNavbarRender(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionEvent,intersectionOptions); //prettier-ignore
    if (homebanner_ref.current) observer.observe(homebanner_ref.current);

    return () => {
      observer.disconnect();
    };
  }, [homebanner_ref.current]);

  return (
    <>
      {!isRegistered("WelcomeView") && (
        <WelcomeView
          onFadeComplete={() => registerComponent("WelcomeView")}
        ></WelcomeView>
      )}
      <Navbar shouldRender={navbarRender} />
      <Background $isDarkMode={theme}>
        <Container onScroll={scrollEvent}>
          <Hero parallaxValue={parallaxFactor} ref={homebanner_ref} />
          {navigation == "LP" && <></>}
          {navigation == "RP"}
        </Container>
        <Footer></Footer>
      </Background>
    </>
  );
};
