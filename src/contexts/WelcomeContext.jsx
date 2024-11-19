import React, {createContext, useContext, useState} from 'react'

const WelcomeContext = createContext();

export function useWelcome(){
    return useContext(WelcomeContext);
}

export const WelcomeProvider = ({children}) => {
    const [hasWelcomed, setHasWelcomed] = useState(false);

  return <WelcomeContext.Provider value={{hasWelcomed, setHasWelcomed}}>
    {children}
  </WelcomeContext.Provider>
}