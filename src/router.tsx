import { createBrowserRouter } from "react-router-dom";
import List from "./pages/List";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
]);
