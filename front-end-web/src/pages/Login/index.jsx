import React from "react";
import Header from "../../components/Header";
import InputLogin from "../../components/InputLogin";
import Wrapper from "./styles";

function Login() {
  return (
    <>
      <Header />
      <Wrapper>
        <div className="login">
          <InputLogin />
        </div>
      </Wrapper>
    </>
  );
}

export default Login;
