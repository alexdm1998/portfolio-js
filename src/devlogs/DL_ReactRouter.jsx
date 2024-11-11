import React, { useEffect } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Container = styled.div`
  font-family: inherit;
  position: relative;
  padding: 5% 10%;
  font-size: 0.8rem;
  box-sizing: border-box;
  text-align: justify;
`;

const CodeSnippet = styled(SyntaxHighlighter).attrs({
  style: gruvboxDark,
  language: "jsx",
  customStyle: {
    backgroundColor: "rgba(24, 24, 24, 0.793)",
  },
})``;

export const DL_ReactRouter = () => {
  const mainRouterConfigCode = `import React, { StrictMode } from "react";
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

  const routerLinks = `export const DevLog = () => {
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

  const routerConfigCode = `import React from "react";
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

  const mainWithoutConfigCode = `import React, { StrictMode } from "react";
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

  const RouterConfigContextCode = `import React, { createContext, useContext } from "react";
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

  const MainRouterContextWrappedCode = `import React, { StrictMode } from "react";
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

  const DevLogGetChildrenCode = `import React, { useEffect, useState } from "react";
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

  const WrongDevLogImports = `import { App } from "../pages/App";
import { ErrorPage } from "../pages/ErrorPage";
import { DevLog } from "../pages/DevLog";
import { DL_HomePage } from "../devlogs/DL_HomePage";
import { DL_BezierCurves } from "../devlogs/DL_BezierCurves";
import { DL_ReactRouter } from "../devlogs/DL_ReactRouter";`;

  const DynamicDevLogImports = `import { App } from "../pages/App";
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

  return (
    <Container>
      <h1>React Router</h1>
      <p>
        In the process of developing this website, I decided to create these
        devlogs to document some of my journey. Since I wanted it to be somewhat
        seperate from the portfolio itself, to not clutter the visitor with
        textual information in the front page, I needed to stray away from the
        original idea of creating a single page website.
      </p>

      <p>
        I had never worked with react prior to this project, so I had yet to
        work with react-router-dom, which was the router I chose for this
        project given its wide usage and how simple the use case here would be.
      </p>

      <h3>The problem</h3>

      <p>
        For this devlog I decided very early on that the left side section of
        these pages would be for navigation. The navigation would be done in a
        way that allowed the visitor to go directly to any page in the folder
        devlogs (components with the prefix DL_, i.e.
        &lt;DL_ReactRouter.jsx&gt;)
      </p>

      <p>
        That meant that the router would need to have a route to every devlog
        present in the devlogs folder (src/devlogs); The straightfoward solution
        would be configure the routes by hand in such a way:
      </p>
      <CodeSnippet>{mainRouterConfigCode}</CodeSnippet>

      <p>And to then utilise them as such:</p>

      <CodeSnippet>{routerLinks}</CodeSnippet>

      <p>
        The problem with this approach is that depending on the number of static
        routes this file can increase considerably in size, thus decreasing
        readability. Another consideration to have is the human error. Despite
        having each devlog with a route of its own, if one forgets to add that
        route to the navigation on the left section it simply wont display that
        route. So, ideally, the configuration would be able to inform the
        component which routes they possess and to which component it relates
        to. From what I could gather there isn't such a thing in
        react-router-dom.
      </p>

      <h2>First Step</h2>

      <p>
        Firstly, let's create a seperate file (routerConfiguration.jsx) for the
        router configuration. This will greatly improve the readability of both
        router configuration and also the entry point (main.jsx) for this
        project.
      </p>

      <CodeSnippet>{routerConfigCode}</CodeSnippet>

      <p>And the main.jsx</p>
      <CodeSnippet>{mainWithoutConfigCode}</CodeSnippet>

      <h2>Second step</h2>
      <p>
        Although the improvement in readability is worth in and of itself, that
        was not the end goal of this change. The goal still remains to have
        these static routes be made available for the components to read them.
      </p>

      <p>
        To inform any component listed in these routes the best approach is to
        transform the routerConfiguration into a useContext that provides the
        necessary function to get the routes of its children.
      </p>

      <CodeSnippet>{RouterConfigContextCode}</CodeSnippet>

      <p>Wrapped around the whole router.</p>

      <CodeSnippet>{MainRouterContextWrappedCode}</CodeSnippet>

      <p>
        Then, on the DevLog.jsx component, we can now use the context to call
        the function getRouteChildren, which will return the children routes —
        if they happen to exist — of the passed argument. Once the children are
        retrieved, attach them to a useState and map them into the navigation.
      </p>

      <CodeSnippet>{DevLogGetChildrenCode}</CodeSnippet>

      <p>
        By this point, any route added to the routerConfig that is a children of
        the DevLog path, will be automatically mapped into a navigation within
        the DevLog.jsx component. There's just one final thing that can be done
        to really automate the process.
      </p>

      <h2>Final step of automation</h2>

      <p>
        Continuing with the increased levels of automation logic here, the final
        step is to import the devlogs dynamically and automatically. This part
        will depend on the context of the project, as this implementation is
        speficic to Vite. So let's update RouterConfigContext.jsx to do just
        that.
      </p>

      <p>Instead of importing every devlog like so:</p>
      <CodeSnippet>{WrongDevLogImports}</CodeSnippet>
      <p>We now make use of the Glob Import provided to us by Vite.</p>
      <CodeSnippet>{DynamicDevLogImports}</CodeSnippet>
      <p>
        It may look worse at first, in terms of readiability, but it's mostly
        string manipulation. This simply imports every file inside the devlogs
        folder with the jsx extension. The second argument defines this import
        as eager, as opposed to lazy.
      </p>
      <CodeSnippet>
        {
          'const modules = import.meta.glob("../devlogs/*.jsx", { eager: true });'
        }
      </CodeSnippet>
      <p>Now using this, we can export a dynamic routerConfig, like so:</p>
      <CodeSnippet>
        {`export const routerConfig = [
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
];`}
      </CodeSnippet>

      <h2>Conclusion</h2>
      <p>
        The final result of this approach, is that now we can not only getRoutes
        from our react-router-dom dynamically, but we can also automate the
        imports for of children routes pertaining to a given parent route,
        making it easy to import a component, create a route and map it in the
        parent component.
      </p>

      <p>
        Caveats to this approach:
        <ul>
          <li>
            The route path is tightly related to the component's name. Example:
            If the element is &lt;DL_ReactRouter.jsx&gt;, then the path is
            ReactRouter
          </li>
        </ul>
      </p>
    </Container>
  );
};
