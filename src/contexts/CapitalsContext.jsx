import React, { createContext, useContext, useEffect, useState } from "react";

const CapitalsContext = createContext();
export function useCapitals() {
  return useContext(CapitalsContext);
}

export const CapitalsProvider = ({ children }) => {
  const [capitals, setCapitals] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.229:5000/capitals")
      .then((res) => res.json())
      .then((data) => {
        setCapitals(data);
      });
  }, []);

  return (
    <CapitalsContext.Provider value={capitals}>
      {children}
    </CapitalsContext.Provider>
  );
};
