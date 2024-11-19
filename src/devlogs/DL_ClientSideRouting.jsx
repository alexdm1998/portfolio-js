import React from "react";
import { DL_Template } from "./DL_Template";

export const DL_ClientSideRouting = () => {
  return (
    <DL_Template>
      <h1>Client Side Routing</h1>
      <p>
        Despite this appearing to be a MPA (Multi-Page Application) due to the
        fact that it has different routes, it is indeed a SPA (Single-Page
        Application). This means that the client only requests a file once to
        the server. So how can the url be routing to different "pages" of the
        application?
      </p>

      <p>
        Although it is working as I envisioned, there was problem that I
        encounter and in all honesty should've anticipated. While Vite during
        development and preview handles every request and redirects it
        accordingly, the server will most likely not be prepared for it for the
        first time. In my case, the server happens to be netlify, which
        immediately gave me an error upon requesting anything that wasn't the
        root path.
      </p>
    </DL_Template>
  );
};
