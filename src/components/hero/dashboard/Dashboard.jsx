import styled, { css, keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import reconnect_button from "@assets/Reconnect_Button.svg";
import SVG from "react-inlinesvg";
import { Radio } from "./Radio";
import { WeatherWidget } from "./WeatherWidget";

const WideIn = keyframes`
    0%{max-width: 0vw;}
    100%{max-width: 75dvw;}
`;

const Container = styled.div`
  overflow-x: visible;
  overflow-y: visible;
  position: relative;
  top: 35dvh;
  animation: ${WideIn} 2s linear forwards;

  @media (orientation: portrait) {
    top: 60dvh;
  }
`;

const Spin = keyframes`
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
`;

const Loading = styled.div`
  border-radius: 50%;
  border-top: 1.5px solid #d6deb7;
  width: 20px;
  height: 20px;
  animation: ${Spin} 1s linear infinite;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinCss = css`
  //Css helper function for the nested interpolation of strings
  animation: ${spinAnimation} 1.25s ease;
`;

const Reconnect = styled(SVG)`
  top: 8px;
  width: 13px;
  margin-inline: 4px;
  ${(props) => (props.$isSpinning ? spinCss : "animation: none")};
`;

const Wrapper = styled.div`
  overflow-x: hidden;
  overflow-y: visible;

  &.fixed-overflow {
    overflow-x: visible;
  }
`;

export const Dashboard = () => {
  const [weatherData, setWeatherData] = useState("");
  const [hasReceived, setHasReceived] = useState(false);
  const [hasFailedConnection, setHasFailedConnection] = useState(false);
  const [spinReconnect, setSpinReconnect] = useState(false);
  const [toFetch, setToFetch] = useState(true);
  const [hasAnimationEnded, setHasAnimationEnded] = useState(false);

  useEffect(() => {
    /* if (toFetch) {
      fetch("http://192.168.1.229:5000/weather/famalicao")
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setHasReceived(true);
          setHasFailedConnection(false);
        })
        .catch((error) => {
          console.log(error);
          setHasFailedConnection(true);
          setHasReceived(false);
        });
      setToFetch(false);
    } */
  }, [toFetch]);

  return (
    <Container onAnimationEnd={() => setHasAnimationEnded(true)}>
      <Wrapper className={hasAnimationEnded ? "fixed-overflow" : ""}>
        <Radio />

        {/*  <div style={{margin: "1px 1px", display:"flex", flexDirection:"row", alignItems:"center", overflowX:"visible"}}>
                    {hasReceived ? <span style={{color:"#d8d8d8e8"}}><b>City:</b> {weatherData && weatherData.location.name} {weatherData && weatherData.current.temp_c}ºC {weatherData && weatherData.current.condition.text} || {weatherData && weatherData.location.localtime}</span> : null}
                    {(!hasReceived && !hasFailedConnection) ? <Loading></Loading> : null}
                    {(!hasReceived && hasFailedConnection) ? <><span style={{color:"#d8d8d8e8"}}>Failed Connection</span><Reconnect $isSpinning={spinReconnect} src={reconnect_button} onMouseOver={() => setSpinReconnect(true)} onAnimationEnd={()=> setSpinReconnect(false)} onClick={() => setToFetch(true)}></Reconnect></> : null}
                </div> */}
      </Wrapper>
    </Container>
  );
};
