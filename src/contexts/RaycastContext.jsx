import { createContext, useContext, useState } from "react";

const RaycastContext = createContext();
const HitContext = createContext("none");

export function useRaycast() {
  return useContext(RaycastContext);
}
export function useHit() {
  return useContext(HitContext);
}

export const RaycastProvider = ({ children }) => {
  const [hitObject, setHitObject] = useState("none");

  function registerHit(hitObject) {
    setHitObject(hitObject);
  }

  return (
    <RaycastContext.Provider value={hitObject}>
      <HitContext.Provider value={registerHit}>
        {children}
      </HitContext.Provider>
    </RaycastContext.Provider>
  );
};
