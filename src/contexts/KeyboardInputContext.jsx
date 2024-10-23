//Main purpose is to deal with the canvas mode.
import React, { useContext, createContext, useState, useEffect } from "react";

const Inputs = createContext();

export function useInputs() {
  return useContext(Inputs);
}

const CursorInputs = createContext();
export function useCursorInputs() {
  return useContext(CursorInputs);
}

const CursorStates = createContext();
export function useCursorStates() {
  return useContext(CursorStates);
}

export const KeyboardInputProvider = ({ children }) => {
  const [inputMode, setInputMode] = useState(false);

  function setMode(mode) {
    switch (mode) {
      case "Canvas":
        setInputMode(true);
        break;
      case "Preset":
        setInputMode(false);
        break;
      default:
        setInputMode(false);
    }
  }

  const [isDragging, setIsDragging] = useState(false);
  const [latestPos, setLatestPos] = useState([
    [0, 0],
    [0, 0],
  ]);

  function handleCursorInputs(event) {
    const x = event.clientX;
    const y = event.clientY;

    switch (event._reactName) {
      case "onMouseDown":
        setLatestPos([
          [x, y],
          [x, y],
        ]);
        setIsDragging(true);
        break;
      case "onMouseUp":
      case "onMouseLeave":
        setIsDragging(false);
        break;
      case "onMouseMove":
        if (isDragging) {
          setLatestPos((prevPos) => [prevPos[1], [x, y]]);
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (inputMode == "Canvas") console.log("Canvas mode activated");
  }, [inputMode]);

  return (
    <Inputs.Provider value={setMode}>
      <CursorInputs.Provider value={handleCursorInputs}>
        <CursorStates.Provider value={{ isDragging, latestPos }}>
          {children}
        </CursorStates.Provider>
      </CursorInputs.Provider>
    </Inputs.Provider>
  );
};
