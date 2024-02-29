import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Task from "./components/Task";


export const backend = {endpoint:"https://data-neuron-uf36.onrender.com"}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "task2",
    element: <Task />,
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
