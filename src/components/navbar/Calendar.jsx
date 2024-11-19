import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { device } from "../../devices";
import { useTime} from "@contexts/TimeContext";
import { useTimezone } from "@contexts/TimezoneContext";

const Container = styled.div`
  margin-inline: 1rem;
  overflow: hidden;
`;

const Text = styled.span`
  color: #d8d8d8;
  font-family: "Montserrat";
  font-size: 0.75rem;
  letter-spacing: 0.2rem;
`;

export const Calendar = () => {
  //Loading contexts for time and timezones
  const {
    year,
    month,
    monthAlphabetical,
    day,
    dayOfWeek,
    hour,
    minute,
    seconds,
  } = useTime();
  const { gmtOffset: timezone } = useTimezone();
  //Mobile handler
  const [mobile, setMobile] = useState(false);
  function resizeHandler() {
    if (window.matchMedia(device.tablet).matches) {
      setMobile(true);
    } else setMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  //Adds a zero to single digit numbers for formatting
  function doubleDigit(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }
  //Regular screen formatting
  function date() {
    const formattedTimezone = timezone < 0 ? timezone : `+${timezone}`;
    return `${year} ${monthAlphabetical} ${day}, ${dayOfWeek} ${doubleDigit(
      hour
    )}:${doubleDigit(minute)}:${doubleDigit(seconds)}  GMT${formattedTimezone}`;
  }
  //Shortened formatting for mobile screens
  function shortenedDate() {
    return `${year.toString().slice(2,4)}/${doubleDigit(month)}/${day}, ${dayOfWeek.slice(0,3)} ${doubleDigit(hour)}:${doubleDigit(minute)}:${doubleDigit(seconds)}`; //prettier-ignore
  }

  return (
    <Container>
      {!mobile && <Text>{date()}</Text>}
      {mobile && <Text>{shortenedDate()}</Text>}
    </Container>
  );
};
