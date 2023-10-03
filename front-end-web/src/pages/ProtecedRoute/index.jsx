import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {Modal} from "react-bootstrap";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const auth = Cookies.get("jwtToken");
  const navigate = useNavigate();  

  useEffect(() => {
    if (auth === undefined) {
      navigate("/");
      setIsOpenModal(true);
      alert("로그인이 필요한 페이지입니다.");
    }    
  }, [auth, navigate]);

  return (
    <>
      <Outlet />
      <Modal show={isOpenModal} />
    </>
  );
};

export default ProtectedRoute;
