import styled from "styled-components";
import React from "react";
import SVG from "react-inlinesvg"
import pause_button_svg from "../../assets/Pause_Button.svg"
import play_button_svg from "../../assets/Play_Button.svg"
import { Button_Template } from "./Button_Template";


const Button_Icon = styled(SVG)`
    position: absolute;
    height: 50%;
    width: 50%;
    z-index: 2;
`

export const PlayPauseButton = ({playingState, onClick}) => {

    return(
        <Button_Template onClick={onClick} size={"1.75rem"}>
            <Button_Icon src={playingState ? pause_button_svg : play_button_svg}></Button_Icon>
        </Button_Template>
    )
}