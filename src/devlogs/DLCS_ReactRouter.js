export const mainRouterConfigCode = `import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { NavigationProvider } from "./contexts/NavigationContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { TimeProvider } from "./contexts/TimeContext.jsx";
import { KeyboardInputProvider } from "./contexts/KeyboardInputContext.jsx";
import { CapitalsProvider } from "./contexts/CapitalsContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./pages/App";
import { DevLog } from "./pages/DevLog";
import { ErrorPage } from "./pages/ErrorPage";
import { DL_HomePage } from "./devlogs/DL_HomePage";
import { DL_BezierCurves } from "./devlogs/DL_BezierCurves";
import { DL_ReactRouter } from "./devlogs/DL_ReactRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "DevLog",
    element: <DevLog />,
    children: [
      {
        path: "",
        element: <DL_HomePage />,
      },
      {
        path: "BezierCurves",
        element: <DL_BezierCurves />,
      },
      {
        path: "ReactRouter",
        element: <DL_ReactRouter />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <NavigationProvider>
        <TimeProvider>
          <KeyboardInputProvider>
            <CapitalsProvider>
              <RouterProvider router={router} />
            </CapitalsProvider>
          </KeyboardInputProvider>
        </TimeProvider>
      </NavigationProvider>
    </ThemeContextProvider>
  </StrictMode>
);`;

export const routerLinks = `export const DevLog = () => {
  return (
      <Background $isDarkMode={"light"}>
          <PageLayout>
              <LeftNavBar>
                  <StyledLink to={"/"}>Home</StyledLink>
                  <ul>
                      <li><StyledLink to={"/DevLog"}>DevLog</StyledLink></li>
                      <li><StyledLink to={"BezierCurves"}>BezierCurves</StyledLink></li>
                      <li><StyledLink to={"ReactRouter"}>ReactRouter</StyledLink></li>
                  </ul>
              </LeftNavBar>
              <DevLogContainer>
                  <Outlet></Outlet>
              </DevLogContainer>
              <RightPadding/>
          </PageLayout>
      </Background>
  );
};`;

export const routerConfigCode = `import React from "react";
import { App } from "./pages/App";
import { ErrorPage } from "./pages/ErrorPage";
import { DevLog } from "./pages/DevLog";
import { DL_HomePage } from "./devlogs/DL_HomePage";
import { DL_BezierCurves } from "./devlogs/DL_BezierCurves";
import { DL_ReactRouter } from "./devlogs/DL_ReactRouter";

export const routerConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "DevLog",
    element: <DevLog />,
    children: [
      {
        path: "",
        element: <DL_HomePage />,
      },
      {
        path: "BezierCurves",
        element: <DL_BezierCurves />,
      },
      {
        path: "ReactRouter",
        element: <DL_ReactRouter />,
      },
    ],
  },
];`;

export const mainWithoutConfigCode = `import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { NavigationProvider } from "./contexts/NavigationContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { TimeProvider } from "./contexts/TimeContext.jsx";
import { KeyboardInputProvider } from "./contexts/KeyboardInputContext.jsx";
import { CapitalsProvider } from "./contexts/CapitalsContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routerConfig } from "./routerConfiguration.jsx";

const router = createBrowserRouter(routerConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
<StrictMode>
  <ThemeContextProvider>
    <NavigationProvider>
      <TimeProvider>
        <KeyboardInputProvider>
          <CapitalsProvider>
            <RouterProvider router={router}/>
          </CapitalsProvider>
        </KeyboardInputProvider>
      </TimeProvider>
    </NavigationProvider>
  </ThemeContextProvider>
</StrictMode>
);
`;

export const RouterConfigContextCode = `import React, { createContext, useContext } from "react";
import { App } from "../pages/App";
import { ErrorPage } from "../pages/ErrorPage";
import { DevLog } from "../pages/DevLog";
import { DL_HomePage } from "../devlogs/DL_HomePage";
import { DL_BezierCurves } from "../devlogs/DL_BezierCurves";
import { DL_ReactRouter } from "../devlogs/DL_ReactRouter";

export const routerConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "DevLog",
    element: <DevLog />,
    children: [
      {
        path: "",
        element: <DL_HomePage />,
      },
      {
        path: "BezierCurves",
        element: <DL_BezierCurves />,
      },
      {
        path: "ReactRouter",
        element: <DL_ReactRouter />,
      },
    ],
  },
];

const RouterConfigContext = createContext();

export function useRouterConfigContext() {
  return useContext(RouterConfigContext);
}

export const RouterConfigProvider = ({ children }) => {
  function getRouteChildren(element) {
    if (!React.isValidElement(element)) return null;
    for (const route of routerConfig) {
      if (route.element.type == element.type) {
        if (route.children) {
          return route.children;
        }
      }
    }

    return null;
  }

  return (
    <RouterConfigContext.Provider value={getRouteChildren}>
      {children}
    </RouterConfigContext.Provider>
  );
};
`;


export const MainRouterContextWrappedCode = `import React, { StrictMode } from "react";
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

const router = createBrowserRouter(routerConfig);



ReactDOM.createRoot(document.getElementById("root")).render(
<StrictMode>
  <ThemeContextProvider>
    <NavigationProvider>
      <TimeProvider>
        <KeyboardInputProvider>
          <CapitalsProvider>
            <RouterConfigProvider>
              <RouterProvider router={router}/>
            </RouterConfigProvider>
          </CapitalsProvider>
        </KeyboardInputProvider>
      </TimeProvider>
    </NavigationProvider>
  </ThemeContextProvider>
</StrictMode>
);
`;



export const DevLogGetChildrenCode = `import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRouterConfigContext } from "@contexts/RouterConfigContext";
import styled from "styled-components";
[...]

export const DevLog = () => {
  const [childRoutes, setChildRoutes] = useState(null);
  const getRouteChildren = useRouterConfigContext();

  useEffect(() => {
    setChildRoutes(getRouteChildren(<DevLog />));
  }, []);

  function prunePrefix(name) {
    return name.includes("_") ? name.split("_")[1] : name;
  }

  return (
    <Background $isDarkMode={"light"}>
      <PageLayout>
        <LeftNavBar>
          <StyledLink to={"/"}>Home</StyledLink>
          <ul>
            {childRoutes &&
              childRoutes.map((route, index) => {
                return (
                  <li key={index}>
                    <StyledLink to={route.path} key={index}>
                      {prunePrefix(route.element.type.name)}
                    </StyledLink>
                  </li>
                );
              })}
          </ul>
        </LeftNavBar>
        <DevLogContainer>
          <Outlet></Outlet>
        </DevLogContainer>
        <RightPadding />
      </PageLayout>
    </Background>
  );
};
`;


export const WrongDevLogImports = `import { App } from "../pages/App";
import { ErrorPage } from "../pages/ErrorPage";
import { DevLog } from "../pages/DevLog";
import { DL_HomePage } from "../devlogs/DL_HomePage";
import { DL_BezierCurves } from "../devlogs/DL_BezierCurves";
import { DL_ReactRouter } from "../devlogs/DL_ReactRouter";`;


export const DynamicDevLogImports = `import { App } from "../pages/App";
import { ErrorPage } from "../pages/ErrorPage";
import { DevLog } from "../pages/DevLog";

const modules = import.meta.glob("../devlogs/*.jsx", { eager: true });

const devLogRoutes = Object.keys(modules).map((modulePath) => {
  const moduleExports = modules[modulePath];
  const componentName = modulePath.split("devlogs/")[1].replace(".jsx", "");
  const Component = moduleExports[componentName];
  const path = componentName.split("_")[1];

  return {
    element: <Component />,
    path,
  };
});`;

export const DynamicDevLogImportsExplained =  `const modules = import.meta.glob("../devlogs/*.jsx", { eager: true });`


export const FinalRouterConfig = `export const routerConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "DevLog",
    element: <DevLog />,
    children: devLogRoutes,
  },
];`


export const NavNameBeforeChange = `
export const DevLog = () => {
  const [childRoutes, setChildRoutes] = useState(null);
  const getRouteChildren = useRouterConfigContext();

  useEffect(() => {
    setChildRoutes(getRouteChildren(<DevLog />));
  }, []);

  function prunePrefix(name) {
    console.log(name);
    return name.includes("_") ? name.split("_")[1] : name;
  }

  return (
    <Background $isDarkMode={"light"}>
      <PageLayout>
        <LeftNavBar>
          <StyledLink to={"/"}>Home</StyledLink>
          <ul>
            {childRoutes &&
              childRoutes.map((route, index) => {
                console.dir(route.element);
                return (
                  <li key={index}>
                    <StyledLink to={route.path} key={index}>
                      {prunePrefix(route.element.type.name)}
                    </StyledLink>
                  </li>
                );
              })}
          </ul>
        </LeftNavBar>
        <DevLogContainer>
          <Outlet></Outlet>
        </DevLogContainer>
        <RightPadding />
      </PageLayout>
    </Background>
  );
};`



export const NavNameAfterChange = `export const DevLog = () => {
  const [childRoutes, setChildRoutes] = useState(null);
  const getRouteChildren = useRouterConfigContext();

  useEffect(() => {
    setChildRoutes(getRouteChildren(<DevLog />));
  }, []);

  return (
    <Background $isDarkMode={"light"}>
      <PageLayout>
        <LeftNavBar>
          <StyledLink to={"/"}>Home</StyledLink>
          <ul>
            {childRoutes &&
              childRoutes.map((route, index) => {
                console.dir(route.element);
                return (
                  <li key={index}>
                    <StyledLink to={route.path} key={index}>
                      {route.path}
                    </StyledLink>
                  </li>
                );
              })}
          </ul>
        </LeftNavBar>
        <DevLogContainer>
          <Outlet></Outlet>
        </DevLogContainer>
        <RightPadding />
      </PageLayout>
    </Background>
  );
};`