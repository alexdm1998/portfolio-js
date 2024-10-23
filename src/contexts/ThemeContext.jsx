import { createContext, useContext, useState } from "react";

const ThemeModeContext =  createContext("light");
const ThemeSwitchContext = createContext();

export function useTheme(){return useContext(ThemeModeContext);}
export function useThemeSwitch(){return useContext(ThemeSwitchContext);}

export const ThemeContextProvider = ({children}) => {
    const [themeState, switchState] = useState("light");

    function Switch(){
        if(themeState === "light"){
            switchState("dark");
        }else{
            switchState("light");
        }
    }

    return(
        <ThemeModeContext.Provider value={themeState}>
            <ThemeSwitchContext.Provider value={Switch}>
                {children}
            </ThemeSwitchContext.Provider>
        </ThemeModeContext.Provider>
    )
}