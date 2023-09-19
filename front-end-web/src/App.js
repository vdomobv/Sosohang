import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NotFound from "./pages/NotFound"
import Main from "./pages/Main"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

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
