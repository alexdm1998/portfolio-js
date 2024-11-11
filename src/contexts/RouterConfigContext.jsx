import React, { createContext, useContext } from "react";
import { App } from "../pages/App";
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
});

export const routerConfig = [
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
