import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
// import Cookies from "js-cookie";
import InputLogin from "../../components/InputLogin";
import Wrapper from "./styles";

function Login() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/'); // 메인 페이지로 이동
  }

  // const tokenCookie = Cookies.get("jwtToken");
  // console.log(tokenCookie);
  // useEffect(() => {
  //   if (tokenCookie !== undefined) return navigate("/")
  // }, [tokenCookie])  
  
  return (
    <>
      <Wrapper>
        <div className="loginContainer">
          <img src="/assets/web_login.png" alt="loginImage" className="loginImage" onClick={handleImageClick} />
          <div className="login">
            <InputLogin />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Login;
