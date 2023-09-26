import React, { useRef } from "react";
import Header from "../../components/Header";
import Wrapper from "./styles";

function Main() {
  const secondSlideRef = useRef(null);

  return (
    <div>
      <Header />
      <Wrapper>
        <h1>Main</h1>
      </Wrapper>
    </div>
  );
}

export default Main;
