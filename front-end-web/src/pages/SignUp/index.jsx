import React, { useEffect, useState } from "react";
import Wrapper from "./styles";
import Header from "../../components/Header";
import InputStoreInfo from "../../components/InputStoreInfo";
import InputOwnerInfo from "../../components/InputOwnerInfo";
import InputStoreIssue from "../../components/InputStoreIssue";

function SignUp() {
  return (
    <div>
      <Header />
      <Wrapper>
        <form>
          <div className="container">
            <InputStoreInfo />
            <InputOwnerInfo />
          </div>
          <div className="container">
            <InputStoreIssue />
          </div>
        </form>
      </Wrapper>
    </div>
  );
}

export default SignUp;
