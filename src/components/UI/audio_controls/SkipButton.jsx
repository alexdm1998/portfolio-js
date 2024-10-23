import styled from "styled-components";
import React from "react";
import SVG from "react-inlinesvg";
import skip_button_svg from "@assets/Skip_Button.svg";
import { Button_Template } from "./Button_Template";

const Button = styled(SVG)`
  height: 50%;
  z-index: 2;
`;

export const SkipButton = () => {
  return (
    <Button_Template size={"1.5rem"}>
      <Button src={skip_button_svg}></Button>
    </Button_Template>
  );
};
