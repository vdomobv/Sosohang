import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NotFound from "./pages/NotFound"
import Main from "./pages/Main"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProductManage from "./pages/ProductManage"
import StoreManage from "./pages/StoreManage"
import StoreInfo from "./pages/StoreInfo"
import WebGift from "./pages/WebGift"
// import ProtectedRoute from "./pages/ProtecedRoute";
// import publicRoute from "./pages/PublicRoute";

const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Main /> },
  { path: "/WebGift", element: <WebGift />},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp />},

  { path: "/productManage", element: <ProductManage />},
  { path: "/storeManage", element: <StoreManage />},
  { path: "/storeInfo", element: <StoreInfo />},

  // { path: "/", element: <ProtectedRoute />, children: [
  //   { path: "/productManage", element: <ProductManage />},
  //   { path: "/storeManage", element: <StoreManage />},
  //   { path: "/storeInfo", element: <StoreInfo />},
  // ]},
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
