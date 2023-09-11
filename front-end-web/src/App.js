import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

import Main from "./pages/Main/index.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
