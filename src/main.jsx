import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { NavigationProvider } from "./contexts/NavigationContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { TimeProvider } from "./contexts/TimeContext.jsx";
import { KeyboardInputProvider } from "./contexts/KeyboardInputContext.jsx";
import { CapitalsProvider } from "./contexts/CapitalsContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routerConfig } from "./contexts/RouterConfigContext.jsx";

import { RouterConfigProvider } from "./contexts/RouterConfigContext.jsx";
import { TimezoneProvider } from "@contexts/TimezoneContext";
import { WelcomeProvider } from "@contexts/WelcomeContext";

const router = createBrowserRouter(routerConfig);



ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <NavigationProvider>
        <TimezoneProvider>
          <TimeProvider>
            <KeyboardInputProvider>
              <CapitalsProvider>
                <WelcomeProvider>
                  <RouterConfigProvider>
                    <RouterProvider router={router}/>
                  </RouterConfigProvider>
                </WelcomeProvider>
              </CapitalsProvider>
            </KeyboardInputProvider>
          </TimeProvider>
        </TimezoneProvider>
      </NavigationProvider>
    </ThemeContextProvider>
  </StrictMode>
);
