import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  font-size: inherit;
  &:hover{
    color: ${(props)=> props.$hoverColor};
  }
`;
