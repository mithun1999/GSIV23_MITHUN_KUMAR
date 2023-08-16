import { createBrowserRouter } from "react-router-dom";
import List from "./pages/List";
import Root from "./layout/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <List />,
      },
    ],
  },
]);
