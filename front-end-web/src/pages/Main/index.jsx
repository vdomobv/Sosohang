import React, { useRef } from "react";
import Header from "../../components/Header";
import Wrapper from "./styles";
import { Fade, Slide } from "react-awesome-reveal";

function Main() {
  console.log(`
    ┌──────┐
    │버그발견시！│
    │연락주십쇼！│
    └──────┘
    ヽ(＾ω＾)ﾉ三三　 　 2
    　 (　 へ )三三　　┗팀┓三
    　　く 三三 　　　 ┏┗　 三
    ￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
    
    `);

  const secondSlideRef = useRef(null);

  const scrollToSecondSlide = () => {
    if (secondSlideRef.current) {
      secondSlideRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Wrapper>
      <Header />
      <div className="img-container">
        <div className="text-overlay">
          <Fade cascade damping={0.2}>
            <h2 className="text-overlay_h2" style={{ letterSpacing: '-2px' }}>소상공인에게 소소한 행운을</h2>
            <h2 className="text-overlay_h2" style={{ letterSpacing: '-2.5px' }} >소중한 이에게 소담한 행복을</h2>
            <br></br>
            <h3 className="text-overlay_h3">우리 동네 상점 '소소티콘'으로 선물하기</h3>
            <br />
            <img className="logo" style={{ width: '30%' }}
              src="/assets/sosohang.png" alt=""></img>
            <div className="arrow-container">
              <img
                src="/videos/down-arrow.png"
                alt=""
                className="down-arrow"
                onClick={scrollToSecondSlide}
              />
            </div>
          </Fade>
        </div>
      </div>
      <Slide direction="up" triggerOnce>
        <div ref={secondSlideRef} className="img-container2">
          <div className="img-container2">
            <div className="text-overlay_ballon">
              <Fade cascade damping={0.2} delay={200}>
                <div className="container">
                  <div className="message-container">
                    <div className="message-box">
                      <p>
                        소소행은 어떤 서비스인가요? 🧐
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="text-overlay_ballon2">
              <Fade cascade damping={0.2} delay={400}>
                <div className="container">
                  <div className="message-container">
                    <div className="message-box2">
                      <p>
                        동네 상점들도 선물할 수 있으면 좋겠다는 생각에서 시작하게 되었어요.
                        <br></br> 
                        그런데, 복잡한 수익구조 때문에 소상공인 분들은 모바일 쿠폰을 제작하기 힘들어요. 
                        <br />
                        인력도 부족한데다 금전적 어려움을 겪으시죠.
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="text-overlay_ballon3">
              <Fade cascade damping={0.2} delay={600}>
                <div className="container">
                  <div className="message-container">
                    <div className="message-box">
                      <p>기대효과로는 어떤게 있을까요?</p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="text-overlay_ballon4">
              <Fade cascade damping={0.2} delay={400}>
                <div className="container">
                  <div className="message-container">
                    <div className="message-box2">
                      <p>
                        {" "}

                        소상공인분들의 홍보를 도울 수 있을 것이라 기대됩니다!
                        <br />
                        동네 상권도 활성화 될 것이라 예측하고 있어요.
                        <br></br> 그래서 우리는 연장보육반
                        영유아를 위한 동화 프로그램을 개발하기로 결심했어요!{" "}
                        <br></br>
                      </p>
                      <span
                        style={{
                          color: "#15E575",
                          fontSize: "35px",
                          fontWeight: "bold",
                        }}
                      >
                        '모바일 쿠폰 제작 및 선물 서비스'
                      </span>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </Slide>

      <div className="img-container3">
        <Slide direction="up" triggerOnce>
          <div>
            <div className="text-overlay2">
              <Fade cascade damping={0.2}>
                <h2 className="text-overlay2_h1">소소행 팀원들을 소개합니다.</h2>
                {/* <h3 className="text-overlay_h3">
                이지은 김진주 서정빈 양지혜 위효선 이민규<br></br>
                </h3> */}
                <br></br>
                <div className="boxes-container">
                  <div className="box">
                    <img
                      src="/videos/dingdu.png"
                      alt=""
                      style={{ width: "130px", height: "150px" }}
                    ></img>
                    <div className="name">
                      <h3 style={{ fontWeight: "bold" }}>이지은</h3>
                      <p
                        style={{
                          color: "#FFBF46",
                          margin: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        팀장|프론트엔드
                      </p>
                      <p>
                        ㅇㅇ<br></br>
                        ㅇㅇ<br></br>
                        BE-FE 연결 전반
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src="/videos/chang.png"
                      alt=""
                      style={{ width: "130px", height: "150px" }}
                    ></img>
                    <div className="name">
                      <h3 style={{ fontWeight: "bold" }}>김진주</h3>
                      <p
                        style={{
                          color: "#FFBF46",
                          margin: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        프론트엔드
                      </p>
                      <p>
                        ㅇㅇ<br></br>
                        ㅇㅇ<br></br>
                        ㅇㅇ
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src="/videos/bean.png"
                      alt=""
                      style={{ width: "130px", height: "150px" }}
                    ></img>
                    <div className="name">
                      <h3 style={{ fontWeight: "bold" }}>서정빈</h3>
                      <p
                        style={{
                          color: "#FFBF46",
                          margin: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        백엔드
                      </p>
                      <p>
                        ㅇㅇ<br></br>
                        ㅇㅇ<br></br>
                        ㅇㅇ
                      </p>
                    </div>
                  </div>
                </div>
                <div className="boxes-container">
                  <div className="box">
                    <img
                      src="/videos/min.png"
                      alt=""
                      style={{ width: "130px", height: "150px" }}
                    ></img>
                    <div className="name">
                      <h3 style={{ fontWeight: "bold" }}>양지혜</h3>
                      <p
                        style={{
                          color: "#575761",
                          margin: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        백엔드
                      </p>
                      <p>
                        ㅇㅇ<br></br>
                        ㅇㅇ<br></br>
                        ㅇㅇ
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src="/videos/jieun.png"
                      alt=""
                      style={{ width: "130px", height: "150px" }}
                    ></img>
                    <div className="name">
                      <h3 style={{ fontWeight: "bold" }}>위효선</h3>
                      <p
                        style={{
                          color: "#575761",
                          margin: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        백엔드
                      </p>
                      <p>
                        ㅇㅇ<br></br>
                        ㅇㅇ<br></br>
                        ㅇㅇ
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src="/videos/ikjo.png"
                      alt=""
                      style={{ width: "130px", height: "150px" }}
                    ></img>
                    <div className="name">
                      <h3 style={{ fontWeight: "bold" }}>이민규</h3>
                      <p
                        style={{
                          color: "#575761",
                          margin: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        백엔드 매니저
                      </p>
                      <p>
                        ㅇㅇ<br></br>
                        ㅇㅇ<br></br>
                        ㅇㅇ
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </Slide>
      </div>
    </Wrapper>
  );
}

export default Main;
