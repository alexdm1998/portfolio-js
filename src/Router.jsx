import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routerConfig } from "@contexts/RouterConfigContext.jsx";
import { RouterConfigProvider } from "@contexts/RouterConfigContext.jsx";
const router = createBrowserRouter(routerConfig);

export const Router = () => {
  return (
    <RouterConfigProvider>
      <RouterProvider router={router} />
    </RouterConfigProvider>
  );
};
