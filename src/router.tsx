import { createBrowserRouter } from "react-router-dom";
import List from "./pages/List";
import Root from "./layout/Root";
import Details from "./pages/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <List />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
]);
