import styled from "styled-components";
import React from "react";
import SVG from "react-inlinesvg";
import rewind_button_svg from "@assets/Rewind_Button.svg";
import { Button_Template } from "./Button_Template";

const Button = styled(SVG)`
  height: 50%;
  z-index: 2;
`;

export const RewindButton = () => {
  return (
    <Button_Template size={"1.5rem"}>
      <Button src={rewind_button_svg}></Button>
    </Button_Template>
  );
};
