import React from "react";
import styled from "styled-components";
import { NavListSubfolder } from "./NavListSubfolder";

const Container = styled.div`
  display: flex;
  flex-flow: column;

  margin: 0rem;
`

//A react-router-dom navigation list.
export const NavList = ({ linksArray }) => {
  return (
    <Container>
      <NavListSubfolder folderName="DevLogs" items={linksArray}></NavListSubfolder>
    </Container>
  );
};
