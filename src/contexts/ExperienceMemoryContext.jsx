import { useState, useContext, createContext } from "react";

const ExperienceMemoryContext = createContext();

export function useExperienceMemory() {
  return useContext(ExperienceMemoryContext);
}

export const ExperienceMemoryProvider = ({ children }) => {
  const [experiencedComponents, setExperiencedComponents] = useState(()=> new Set());

  function isRegistered(componentTag) {
    return experiencedComponents.has(componentTag);
  }

  function registerComponent(componentTag) {
    setExperiencedComponents((prevState) => {
      const replacingSet = new Set(prevState)
      replacingSet.add(componentTag)
      return replacingSet
    })
  }


  
  return (
    <ExperienceMemoryContext.Provider value={{isRegistered, registerComponent}}>
      {children}
    </ExperienceMemoryContext.Provider>
  );
};
