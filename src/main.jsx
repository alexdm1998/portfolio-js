import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./global.css";
import { NavigationProvider } from "./contexts/NavigationContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { TimeProvider } from "./contexts/TimeContext.jsx";
import { KeyboardInputProvider } from "./contexts/KeyboardInputContext.jsx";
import { CapitalsProvider } from "./contexts/CapitalsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <NavigationProvider>
        <TimeProvider>
          <KeyboardInputProvider>
            <CapitalsProvider>
              <App />
            </CapitalsProvider>
          </KeyboardInputProvider>
        </TimeProvider>
      </NavigationProvider>
    </ThemeContextProvider>
  </StrictMode>
);
