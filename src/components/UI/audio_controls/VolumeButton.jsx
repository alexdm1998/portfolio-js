import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import volume_icon_svg from "@assets/Volume_Icon.svg";
import volume_muted_icon_svg from "@assets/Volume_Muted_Icon.svg";
import volume_low_icon_svg from "@assets/Volume_Low_Icon.svg";
import volume_high_icon_svg from "@assets/Volume_High_Icon.svg";

const ButtonContainer = styled.div`
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000072;
  transition: width 0.75s, border-radius 0.75s;

  &:hover {
    width: 100%;
    border-radius: 25px;
  }

  &:hover .slider {
    width: 70%;
  }

  &:hover input::-webkit-slider-thumb {
    opacity: 1;
  }

  &:hover input::-moz-range-thumb {
    opacity: 1;
  }
`;

const Button = styled(SVG)`
  height: 0.8rem;
  width: 0.8rem;
`;

const AudioSliderWrapper = styled.div`
  width: 0%;
  transition: width 0.5s;
  display: flex;
  align-items: center;
`;

const AudioSlider = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: #d8d8d865;
  border-radius: 5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: #d8d8d8e8;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &::-moz-range-thumb {
    height: 10px;
    width: 10px;
    background: #d8d8d8e8;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
`;

export const VolumeButton = ({ volume, volumeChanger }) => {
  const audio_slider_ref = useRef(null);
  const [source_svg, setSource_svg] = useState(null);
  useEffect(() => {
    setSource_svg(defineSvgSource(volume));
  }, [volume]);

  function defineSvgSource(volume) {
    const source_muted = volume_muted_icon_svg; //The sources need to be assigned, otherwise,
    const source_low = volume_low_icon_svg; //the first time they are used, they stutter as they are loaded in.
    const source_high = volume_high_icon_svg;

    if (volume == 0) return source_muted;
    if (volume < 50) return source_low;
    if (volume >= 50) return source_high;
    return volume_icon_svg; //In case of unexpected volume value.
  }

  function toggleAudio() {
    if (volume > 0) {
      volumeChanger({ target: { value: 0 } });
    } else {
      volumeChanger({ target: { value: 100 } });
    }
  }

  return (
    <ButtonContainer>
      <Button src={source_svg} onClick={toggleAudio}></Button>
      <AudioSliderWrapper className="slider">
        <AudioSlider
          ref={audio_slider_ref}
          min={"0"}
          max={"100"}
          value={volume}
          onChange={volumeChanger}
        />
      </AudioSliderWrapper>
    </ButtonContainer>
  );
};
