import React, { useRef } from "react";
import Header from "../../components/Header";
import Wrapper from "./styles";
import { Fade, Slide } from "react-awesome-reveal";

function Main() {
  // MainPage Console
  // console.log(`
  //   ┌──────┐
  //   │버그발견시！│
  //   │연락주십쇼！│
  //   └──────┘
  //   ヽ(＾ω＾)ﾉ三三　 　 9
  //   　 (　 へ )三三　　┗팀┓三
  //   　　く 三三 　　　 ┏┗　 三
  //   ￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
    
  //   `);

  const secondSlideRef = useRef(null);

  const scrollToSecondSlide = () => {
    if (secondSlideRef.current) {
      secondSlideRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>        
      <Header />
      <Wrapper>
        <div className="img-Container">
          Main
        </div>          
      </Wrapper>
    </div>
    );
}

export default Main;