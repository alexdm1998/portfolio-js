import React from "react";
import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();
const SelectNavigationContext = createContext();

export function useNavigation(){
    return useContext(NavigationContext);
}
export function useSelection(){
    return useContext(SelectNavigationContext);
}

export const NavigationProvider = ({children}) => {
    const [selectedNavigation, setSelectedNavigation] = useState("");

    function setSelection(selection){
        setSelectedNavigation(selection);
    }
    
    return(
        <NavigationContext.Provider value={selectedNavigation}>
            <SelectNavigationContext.Provider value={setSelection}>
                {children}
            </SelectNavigationContext.Provider>
        </NavigationContext.Provider>
    )
    
}