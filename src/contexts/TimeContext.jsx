import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { useTimezone } from "./TimezoneContext";

const TimeContext = createContext();

export function useTime() {
  return useContext(TimeContext);
}

const monthLookup = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
const dayOfWeekLookup = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export const TimeProvider = ({ children }) => {
  const {gmtOffset} = useTimezone();
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState(() => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      monthAlphabetical: monthLookup[date.getMonth() + 1],
      day: date.getDate(),
      dayOfWeek: dayOfWeekLookup[date.getDay()],
      hour: date.getHours(),
      minute: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  });
  
  function getGMToffset(date) {
    const timezoneOffset = date.getTimezoneOffset();
    const hour = timezoneOffset / 60;
    return hour * -1;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prevTick) => prevTick + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const date = new Date();
    const localOffset = getGMToffset(date);
    const calculatedOffset = gmtOffset - localOffset;
    const hour_difference = 60 * 60 * 1000 * calculatedOffset;
    date.setTime(date.getTime() + hour_difference);
    const [year, month, day, dayOfWeek, hour, minute, seconds] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getDay(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    setTime({
      year: year,
      month: month,
      monthAlphabetical: monthLookup[month],
      day: day,
      dayOfWeek: dayOfWeekLookup[dayOfWeek],
      hour: hour,
      minute: minute,
      seconds: seconds,
    });
  }, [tick, gmtOffset]);

  return (
    <TimeContext.Provider value={time}>
        {children}
    </TimeContext.Provider>
  );
};
