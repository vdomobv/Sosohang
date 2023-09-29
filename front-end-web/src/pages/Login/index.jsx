import React from "react";
// import Header from "../../components/Header";
import InputLogin from "../../components/InputLogin";
import Wrapper from "./styles";

function Login() {
  return (
    <>
      {/* <Header /> */}
      <Wrapper>
        <div className="loginContainer">

          <img src="/assets/web_login.png" alt="loginImage" className="loginImage" />
          <div className="login">
            <InputLogin />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Login;
