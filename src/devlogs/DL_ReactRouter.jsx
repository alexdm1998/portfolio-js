import React from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as CodeSnippets from "./DLCS_ReactRouter.js";
import { DL_Template } from "./DL_Template.jsx";



const CodeSnippet = styled(SyntaxHighlighter).attrs({
  style: gruvboxDark,
  language: "jsx",
  customStyle: {
    backgroundColor: "rgba(24, 24, 24, 0.793)",
  },
})``;

export const DL_ReactRouter = () => {
  return (
    <>
      <h1>React Router</h1>
      <p>
        In the process of developing this website, I decided to create these
        devlogs to document some of my journey. Since I wanted these expositions
        to be somewhat seperate from the portfolio itself, as to not clutter the
        visitor with heavy textual information in the landing view, I needed to
        stray away from the original idea of only having a single view.
      </p>

      <p>
        With that said, there still wasn't any necessity for making this a MPA,
        as it's a project of a relatively simple order of complexity and doesn't
        have the need for scalability more than it has the need to be fast (once
        loaded), which is exactly what SPA is good for and why I went with that
        approach.
      </p>

      <p>
        Yet, I already had an SPA by default, seeing that there was just one
        page being provided at the root url. What I actually wanted to achieve
        was the MPA style of navigation without actually requesting for a file
        with each new url change. To that end, what I actually had to implement
        was CSR (Client-Side Rendering) and only provide the index.html once.
        For that, I chose react-router-dom.
      </p>

      <h3>The problem</h3>

      <p>
        For this devlog, I decided very early on that the left side section of
        these pages would be for navigation. The navigation would be done in a
        way that allowed the visitor to go directly to any view defined inside
        the folder that pertains to devlogs.
      </p>

      <p>
        That meant that the router configuration would need to have a route
        defined for every devlog present in the devlogs folder (src/devlogs);
        The straightfoward solution would be configure the routes by hand in
        such a way:
      </p>

      <CodeSnippet>{CodeSnippets.mainRouterConfigCode}</CodeSnippet>

      <p>And to then link to them as such:</p>

      <CodeSnippet>{CodeSnippets.routerLinks}</CodeSnippet>

      <p>
        The problem with this approach is that, depending on the number of
        devlog views, this file can increase considerably in size, making it
        less readable — and seeing that it's being manually hardcoded, it's
        prone to errors, like missing views or misspellings. Not only that, but
        the fact that this is a manual approach, in turn means taking more time
        to set up routes each time a file is created/deleted/modified.
      </p>

      <p>
        So, ideally, the configuration would be able to allow components to read
        routes in the router configuration, which, from what I could gather,
        isn't a functionality of react-router-dom. For example, to read the
        children paths of given path.
      </p>

      <h1>Solution</h1>
      <h2>Creating a router configuration</h2>
      <p>
        Firstly, let's create a seperate file (routerConfiguration.jsx) for the
        router configuration. This will greatly improve the readability of both
        router configuration and also the entry point (main.jsx) for this
        project.
      </p>

      <CodeSnippet>{CodeSnippets.routerConfigCode}</CodeSnippet>

      <p>And the main.jsx</p>

      <CodeSnippet>{CodeSnippets.mainWithoutConfigCode}</CodeSnippet>

      <h2>Exposing paths</h2>
      <p>
        Although the improvement in readability is worth it in and of itself, that
        was not the end goal of this change. The goal still remains to have
        these static routes be made available for the components to read them.
      </p>

      <p>
        To inform any component of these routes the best approach is to
        transform the routerConfiguration into a react context that provides the
        necessary function to get these routes.
      </p>

      <CodeSnippet>{CodeSnippets.RouterConfigContextCode}</CodeSnippet>

      <p>Wrapped around the whole router.</p>

      <CodeSnippet>{CodeSnippets.MainRouterContextWrappedCode}</CodeSnippet>

      <p>
        Then, on the DevLog component, we can now use the context to call
        the function getRouteChildren, which will return the children routes —
        if they happen to exist — of the component passed as an argument. Once the children are
        retrieved, just set them to a useState and map them into the navigation.
      </p>

      <CodeSnippet>{CodeSnippets.DevLogGetChildrenCode}</CodeSnippet>

      <p>
        By this point, any route added to the routerConfig that is a children of
        the DevLog path, will be automatically mapped into a navigation within
        the DevLog component. There's just one final thing that can be done
        to really automate the process.
      </p>

      <h2>Automating the route creation</h2>

      <p>
        Continuing with the increased levels of automation logic here, the final
        step is to import the devlogs dynamically and automatically. This part
        will depend on the context of the project, as this implementation is
        speficic to Vite. So let's update RouterConfigContext.jsx to do just
        that.
      </p>

      <p>Instead of importing every devlog like so:</p>
      <CodeSnippet>{CodeSnippets.WrongDevLogImports}</CodeSnippet>
      <p>We now make use of the Glob Import provided to us by Vite.</p>
      <CodeSnippet>{CodeSnippets.DynamicDevLogImports}</CodeSnippet>
      <p>
        It may look worse at first, in terms of readiability, but it's mostly
        string manipulation. This simply imports every file inside the devlogs
        folder with the jsx extension. The second argument defines this import
        as eager, as opposed to lazy.
      </p>
      <CodeSnippet>{CodeSnippets.DynamicDevLogImportsExplained}</CodeSnippet>
      <p>Now using this, we can export a dynamic routerConfig, like so:</p>
      <CodeSnippet>{CodeSnippets.FinalRouterConfig}</CodeSnippet>

      <h2>Conclusion</h2>
      <p>
        The final result of this approach is that now we can, not only getRoutes
        from our react-router-dom dynamically, but also automate the
        imports for of children routes pertaining to a given parent route,
        making it easy to import a component, create a route and map it in the
        parent component.
      </p>
      <p>
        If you've already tried this you'll notice that there's an error with
        this approach that only appears in production, and that is the names
        shown in the navbar. Eventhough everything works as it should
        (functionaly), the navigation names listed are unintelligable. That is
        because in build the components' names are mangled, thus not reflecting
        the names of the components in the source code. The solution for this is
        to obviously have the names derive from something else, in this case,
        the path which itself is derived from the file's name.
      </p>

      <CodeSnippet>{CodeSnippets.NavNameBeforeChange}</CodeSnippet>

      <p>So we go from this, to this:</p>

      <CodeSnippet>{CodeSnippets.NavNameAfterChange}</CodeSnippet>

      <p>Caveats to this approach:</p>
      <ul>
        <li>
          The route path is tightly related to the component's file name.
        </li>
      </ul>
    </>
  );
};
