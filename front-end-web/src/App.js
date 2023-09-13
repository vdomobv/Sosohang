import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';

import NotFound from "./pages/NotFound/index.jsx"
import Main from "./pages/Main/index.jsx"
import Login from "./pages/Login/index.jsx"
import SignUp from "./pages/SignUp/index.jsx"

const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp />}
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
