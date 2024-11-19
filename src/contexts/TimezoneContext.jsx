import { useState, useContext, createContext } from "react";

const TimezoneContext = createContext();

export function useTimezone() {
  return useContext(TimezoneContext);
}

export const TimezoneProvider = ({ children }) => {
  const [gmtOffset, setGmtOffset] = useState(() => {
    const date = new Date();
    return getGMToffset(date);
  });

  function getGMToffset(date) {
    const timezoneOffset = date.getTimezoneOffset();
    const hour = timezoneOffset / 60;
    return hour * -1;
  }
  return (
    <TimezoneContext.Provider value={{ gmtOffset, setGmtOffset }}>
      {children}
    </TimezoneContext.Provider>
  );
};
