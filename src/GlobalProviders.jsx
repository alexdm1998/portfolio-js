import React from "react";
import { ThemeContextProvider } from "@contexts/ThemeContext";
import { NavigationProvider } from "@contexts/NavigationContext";
import { TimezoneProvider } from "@contexts/TimezoneContext";
import { TimeProvider } from "@contexts/TimeContext";
import { KeyboardInputProvider } from "@contexts/KeyboardInputContext";
import { CapitalsProvider } from "@contexts/CapitalsContext";
import { WelcomeProvider } from "@contexts/WelcomeContext";


/**
 * Use this component for wrapping the SPA with global contexts. It simply makes it more readable.
 * 
 */
export const GlobalProviders = ({ children }) => {
  const globalProviders = [ //Top wraps around the bottom
    ThemeContextProvider,
    NavigationProvider,
    TimezoneProvider,
    TimeProvider,
    KeyboardInputProvider,
    CapitalsProvider,
    WelcomeProvider,
  ];

  return (
    globalProviders.reduceRight((accumulator, Provider) => <Provider>{accumulator}</Provider>, children)
  )
};
