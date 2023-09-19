import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "./styles";
import Header from "../../components/Header";

function SignUp() {
  // 사업자등록번호 형식 - 숫자 10자리
  const storeRegNumEx = /^[0-9]{10}$/;
  // 상점ID 형식 - 영어 소문자, 숫자로 이루어진 5~15글자
  const storeIdRegEx = /^[a-z0-9]{5,15}$/;
  // 상점비밀번호 형식 - 영어 대/소문자, 숫자, 특수문자를 포함하여 8~20글자
  const storePasswordRegEx =
    /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]).{8,20}$/;

  const [storeRegNum, setStoreRegNum] = useState(""); // 사업자 등록번호
  const [regNumWarnig, setRegNumWarning] = useState(""); // 사업자등록번호 유효성 검사 경고문구
  const [isValidRegNum, setIsValidRegNum] = useState(false); // 사업자등록번호 유효성 검사 결과
  const [storeId, setStoreId] = useState(""); // 상점ID
  const [idWarning, setIdWarning] = useState(""); // 상점ID 유효성 검사 경고문구
  const [isValidId, setIsValidId] = useState(false); // 상점ID 유효성 검사 결과
  const [storePassword, setStorePassword] = useState(""); // 상점비밀번호
  const [passwordWarning, setPasswordWarning] = useState(""); // 상점비밀번호 유효성 검사 경고문구
  const [comfirmPasswordWarning, setComfirmPasswordWarning] = useState(""); // 상점비밀번호 확인 유효성 검사 경고문구
  const [isValidPassword, setIsValidPassword] = useState(false); // 상점비밀번호 유효성 검사 결과

  // 사업자등록번호 유효성 검사
  const regNumCheck = (regNum) => {
    const isValidRegNum = storeRegNumEx.test(regNum);

    if (!isValidRegNum && regNum !== "") {
      setRegNumWarning("사업자등록번호는 10자리 숫자만 입력해주세요.");
    } else {
      setRegNumWarning("");
    }

    setIsValidRegNum(isValidRegNum);
  };

  // 상점ID 유효성 검사
  const idCheck = (id) => {
    const isValidId = storeIdRegEx.test(id);

    if (!isValidId && id !== "") {
      setIdWarning("소문자, 숫자 중 하나이상을 사용하여 5~15자리로 설정해 주세요");
    } else {
      setIdWarning("");
    }

    setIsValidId(isValidId);
  };

  // 상점비밀번호 유효성 검사
  const passwordCheck = (password) => {
    const isValidPassword = storePasswordRegEx.test(password);

    if(!isValidPassword && password !== "") {
      setPasswordWarning("대/소문자, 숫자, 특수문자를 포함한 8~20자로 설정해 주세요.");
    } else {
      setPasswordWarning("");
    }

    setIsValidPassword(isValidPassword);
  }

  // 상점비밀번호 확인 비교검사
  const confirmPassword = (confirmPassword) => {
    if(confirmPassword !== storePassword && confirmPassword !== "") {
      setComfirmPasswordWarning("비밀번호가 일치하지 않습니다.")
    } else {
      setComfirmPasswordWarning("");
    }
  }

  return (
    <div>
      <Header />
      <Wrapper>
        <form>
          <div className="container">
            <div className="essentialInputBox">
              <span>상점 정보</span>
              <InputGroup>
                <InputGroup.Text>상점 이름*</InputGroup.Text>
                <Form.Control
                  placeholder="상점 이름"
                  aria-label="상점이름을 입력하세요."
                />
              </InputGroup>

              <div>
                <InputGroup>
                  <InputGroup.Text>사업자등록번호*</InputGroup.Text>
                  <Form.Control
                    placeholder="사업자등록번호"
                    aria-label="사업자등록번호를 입력하세요."
                    maxLength={10}
                    onChange={(e) => {
                      const numExp = /[^0-9]/g;
                      if(numExp.test(e.target.value)) {
                        e.target.value = e.target.value.replace(numExp, "");
                      }                      
                      regNumCheck(e.target.value);
                      setStoreRegNum(e.target.value);
                    }}
                  />
                  <Button id="button-addon2">인증하기</Button>
                </InputGroup>
                <Form.Label>{regNumWarnig}</Form.Label>
             </div>

              <div>
                <span>상점 위치*</span>
                <InputGroup>
                  <Form.Control
                    placeholder="우편번호 조회"
                    aria-label="storeAdress"
                  />
                  <button>검색</button>
                </InputGroup>
                <InputGroup>
                  <Form.Control
                    placeholder="상세주소"
                    aria-label="storeDeatailAdress"
                  />
                </InputGroup>
              </div>
              <div>
                <span>사업장 카테고리*</span>
                <InputGroup>
                  <Form.Control
                    placeholder="사업장 카테고리"
                    aria-label="storeCartegory"
                  />
                  <button>드롭다운 알아보자</button>
                </InputGroup>
              </div>
            </div>

            <div className="essentialInputBox">
              <span>사장님 정보</span>
              <div>
                <span>아이디*</span>
                <InputGroup>
                  <Form.Control
                    placeholder="아이디"
                    aria-label="storeId"
                    onChange={(e) => {
                      idCheck(e.target.value);
                      setStoreId(e.target.value);
                    }}
                  />
                  <button>중복 확인</button>
                </InputGroup>
                <span>{idWarning}</span>
              </div>
              <div>
                <span>휴대전화번호*</span>
                <InputGroup>
                  <Form.Control
                    placeholder="휴대전화번호"
                    aria-label="storePhone"
                  />
                  <button>전송하기</button>
                </InputGroup>
                <InputGroup>
                  <Form.Control
                    placeholder="인증번호"
                    aria-label="storeVerifiNum"
                  />
                  <button>인증하기</button>
                </InputGroup>
              </div>
              <div>
                <span>비밀번호*</span>
                <InputGroup>
                  <Form.Control 
                    placeholder="비밀번호"
                    aria-label="storePW01"
                    onChange={(e) => {
                      passwordCheck(e.target.value);
                      setStorePassword(e.target.value);
                    }}
                  />
                </InputGroup>
                <span>{passwordWarning}</span>
                <InputGroup>
                  <Form.Control
                    placeholder="비밀번호 확인"
                    aria-label="storePW02"
                    onChange={(e) => {
                      confirmPassword(e.target.value);
                    }}
                  />
                </InputGroup>
                <span>{comfirmPasswordWarning}</span>
              </div>
            </div>
          </div>

          <div>
            <span>부가 정보</span>
            <div>
              <span>상점 전화번호</span>
              <InputGroup>
                <Form.Control
                  placeholder="상점 전화번호"
                  aria-label="storeCallNum"
                />
              </InputGroup>
            </div>
            <div>
              <span>주차장</span>
              <InputGroup>
                <Form.Control
                  placeholder="주차가능대수"
                  aria-label="storeParking"
                />
                <button>라디오버튼</button>
              </InputGroup>
            </div>
            <div>
              <span>영업시간</span>
              <InputGroup>
                <Form.Control
                  placeholder="영업시간 시계모양 Input  찾기"
                  aria-label="storeHour"
                />
              </InputGroup>
            </div>
            <div>
              <span>상점 휴무일</span>
              <InputGroup>
                <Form.Control
                  placeholder="휴무일 달력? 라디오버튼?"
                  aria-label="storeClosed"
                />
              </InputGroup>
            </div>
            <div>
              <span>상점 설명</span>
              <InputGroup>
                <Form.Control
                  placeholder="짱큰거 필요"
                  aria-label="storeInfo"
                />
              </InputGroup>
            </div>
            <div>
              <span>상점 홈페이지</span>
              <InputGroup>
                <Form.Control
                  placeholder="상점 홈페이지"
                  aria-label="storeURL"
                />
              </InputGroup>
            </div>
            <div>
              <span>상점 키워드</span>
              <button style={{color:"red", marginLeft : "30px"}}>수박</button>
              <button style={{color:"orange", marginLeft : "30px"}}>딸기</button>
              <button style={{color:"yellow", marginLeft : "30px"}}>커피</button>
              <button style={{color:"green", marginLeft : "30px"}}>망고</button>
              <button style={{color:"blue", marginLeft : "30px"}}>라떼</button>
              <button style={{color:"indigo", marginLeft : "30px"}}>튀김</button>
              <button style={{color:"purple", marginLeft : "30px"}}>치킨</button>
              <br></br>
              <button style={{marginLeft : 3}}>내</button>
              <button>이름은</button>
              <button>정빈</button>
              <button>탐정</button>
              <button>이죠</button>
            </div>
          </div>
        </form>
      </Wrapper>
    </div>
  );
}

export default SignUp;
