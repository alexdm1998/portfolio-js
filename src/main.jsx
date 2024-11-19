import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { GlobalProviders } from "./GlobalProviders";
import { Router } from "./Router";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProviders>
      <Router/>
    </GlobalProviders>
  </StrictMode>
);
