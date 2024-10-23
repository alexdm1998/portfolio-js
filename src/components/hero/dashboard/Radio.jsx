import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import sahara_music from "@assets/sahara-desert-144119.mp3";
import { PlayPauseButton } from "@UI/audio_controls/PlayPauseButton";
import { SkipButton } from "@UI/audio_controls/SkipButton";
import { RewindButton } from "@UI/audio_controls/RewindButton";
import { VolumeButton } from "@UI/audio_controls/VolumeButton";
import { device } from "../../../devices";

const PlaybackBar = styled.div`
  width: 95%;
  height: 6px;
  border-radius: 5px;
  border: 1px solid #d8d8d884;
`;

const ProgressBar = styled.div.attrs((props) => ({
  style: {
    width: `${props.$progress}%`, //Dynamic attr to not generate many CSS classes as it changes values
  },
}))`
  background-color: #d8d8d8e8;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
`;

const SongTitle = styled.span`
  color: #d8d8d8e8;
  flex: 0 0 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  font-size: 1rem;

  @media ${device.mobile} {
    flex: 0 0 25%;
  }

  @media ${device.tablet} {
    flex: 0 0 30%;
  }

  @media ${device.standard} {
    flex: 0 0 30%;
  }
`;

const RadioControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  flex: 0 0 35%;
  overflow: visible;
`;

const PlaceHolder = styled.div`
  flex: 0 0 30%;
  display: flex;
  align-items: center;

  @media ${device.tablet} {
    flex: 0 0 30%;
  }
`;

const RadioInformation = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding-block: 0.5rem;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30dvw;
  min-width: 280px;
`;

export const Radio = () => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function playback() {
    if (isPlaying == true) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function updateProgress() {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    if (!isNaN(duration)) {
      setProgress((currentTime / duration) * 100);
    }
  }

  function clicked(e) {
    const playbackWidth = e.target.getBoundingClientRect().width;
    const clickXcoordinate = e.clientX - e.target.getBoundingClientRect().left;
    const percentage = clickXcoordinate / playbackWidth;
    const duration = audioRef.current.duration;
    const time = duration * percentage;
    audioRef.current.currentTime = time;
  }

  const volumeChanger = (event) => {
    setVolume(event.target.value);
  };

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <RadioContainer>
      <RadioInformation>
        <SongTitle></SongTitle>
        <audio
          ref={audioRef}
          src={sahara_music}
          onEnded={() => {
            setIsPlaying(false);
          }}
          onTimeUpdate={(e) => updateProgress(e)}
        />
        <RadioControls>
          <RewindButton></RewindButton>
          <PlayPauseButton
            playingState={isPlaying}
            onClick={playback}
          ></PlayPauseButton>
          <SkipButton></SkipButton>
        </RadioControls>
        <PlaceHolder>
          <VolumeButton
            volume={volume}
            volumeChanger={volumeChanger}
          ></VolumeButton>
        </PlaceHolder>
      </RadioInformation>
      <PlaybackBar onClick={(e) => clicked(e)}>
        <ProgressBar $progress={progress} />
      </PlaybackBar>
    </RadioContainer>
  );
};
