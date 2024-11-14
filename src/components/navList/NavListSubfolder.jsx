import React, { useState } from "react";
import { NavLink } from "./NavLink.style";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  padding-block: 0.3rem;
  width: 100%;
  font-size: inherit;
  font-family: inherit;
  font-size: large;
  text-align: left;
  background-color: ${(props) => {
    return props.$isVisible ? "black" : "transparent";
  }};
  color: ${(props) => (props.$isVisible ? "aliceblue" : "#000000")};
  transition: background-color 500ms linear;
  &:hover {
    background-color: #5034347b;
  }
`;

const ListItems = styled.div`
  padding-block: 0.3rem;
  list-style: none;
  padding-left: 1.5rem;
  display: grid;
  grid-row-gap: 0.3rem;
  background-color: #43434339;
`;

/**
 *
 * Assumptions: Items has items.path
 */

export const NavListSubfolder = ({ folderName, items}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Button
        onClick={() => setIsVisible(!isVisible)}
        $isVisible={isVisible}
      >
        {folderName}
      </Button>
      {isVisible && items && (
        <ListItems>
          {items.map((route, index) => {
            return (
              <NavLink to={route.path} $hoverColor="aliceblue" key={index}>
                {route.navName}
              </NavLink>
            );
          })}
        </ListItems>
      )}
    </>
  );
};
