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
    return props.$isVisible ? "transparent" : "black";
  }};
  color: ${(props) => (props.$isVisible ? "black" : "aliceblue")};
  border-block: ${(props) => (props.$isVisible ? "0.1rem solid rgb(255, 255, 255)" : "none")};
  transition: background-color 500ms linear;

  box-shadow: 0px 2px 10px 5px #c62b00, 0px 2px 100px 100px #c62b0039;
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

export const NavListSubfolder = ({ folderName, items }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)} $isVisible={isVisible}>
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
