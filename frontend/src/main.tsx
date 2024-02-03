import App from "./App.tsx";
import Start from "./pages/Start.tsx";
import ShowScore from "./pages/ShowScore.tsx";
import Error from "./pages/Error.tsx";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { createBrowserRouter, RouterProvider, RemixRouter as Router } from "react-router-dom"

import "./style/style.css";

const rootEl: HTMLDivElement = document.querySelector("#root")!
const root: Root = createRoot(rootEl);
const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <Start/>
  },
  {
    path: "/quiz",
    element: <App/>
  },
  {
    path: "/score",
    element: <ShowScore/>
  },
  {
    path: "/error",
    element: <Error/>
  }
])

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
