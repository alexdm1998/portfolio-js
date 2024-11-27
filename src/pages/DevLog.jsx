import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRouterConfigContext } from "@contexts/RouterConfigContext";
import styled from "styled-components";
import { NavList } from "@components/navList/NavList";
import { DL_Template } from "@devlogs/DL_Template";

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

  height: 100dvh;
  width: 100dvw;

  @media (orientation: portrait) {
    background-image: radial-gradient(ellipse at top, #df3737, #bc7100);
  }
`;

const PageLayout = styled.div`
  display: flex;
  flex-flow: row;
  height: 100dvh;
  width: 100dvw;
  position: relative;
`;

const LeftNavBar = styled.div`
  flex-basis: 20%;
`;

const RightPadding = styled.div`
  flex-basis: 20%;
`;

const DevLogContainer = styled.div`
  flex-basis: 60%;
  position: relative;
  height: 100dvh;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: #00000029;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  font-size: inherit;
`;

export const DevLog = () => {
  const [childRoutes, setChildRoutes] = useState(null);
  const getRouteChildren = useRouterConfigContext();

  //Returns an extra parameter with a nav name.
  function formatRouteNames(array) {
    return array.map((element) => {
      let navName = element.path.replace(/(?!^)([A-Z])/g, " $1");
      element.navName = navName;
      return element;
    });
  }

  useEffect(() => {
    let routes = getRouteChildren(<DevLog />);
    routes = formatRouteNames(routes);
    setChildRoutes(routes);
  }, []);

  return (
    <Background $isDarkMode={"light"}>
      <PageLayout>
        <LeftNavBar>
          <StyledLink to={"/"}>Home Page</StyledLink>
          <NavList linksArray={childRoutes} />
        </LeftNavBar>
        <DevLogContainer>
          <DL_Template>
            <Outlet></Outlet>
          </DL_Template>
        </DevLogContainer>
        <RightPadding />
      </PageLayout>
    </Background>
  );
};
