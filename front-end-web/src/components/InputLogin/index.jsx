import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Wrapper from "./styles";

function InputLogin() {
  const navigate = useNavigate();
  const [storeRegNum, setStoreRegNum] = useState(""); // 상점 사업자등록번호
  const [storePassword, setStorePassword] = useState(""); // 상점 비밀번호
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이는지 여부

  // 비밀번호 보이기
  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (storeRegNum.trim() === "" || storePassword.trim() === "") {
      alert("사업자등록번호와 비밀번호를 모두 입력해주세요.");
      return;
    }

    axios
      .post("/api/v1/store/login", {
        registrationNumber: storeRegNum,
        storePassword: storePassword,
      })
      .then((res) => {
        if(res.data.isLogin === "success") {
          navigate("/productManage")
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("로그인 실패");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // 엔터 키가 눌렸을 때 로그인 함수 호출
      handleLogin();
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h3 className="title">로그인</h3>
        <Form.Label className="label">사업자등록번호</Form.Label>
        <InputGroup className="inputGroup">
          <Form.Control
            className="formControl"
            style={{ borderRadius: "10px", height: "40px" }}
            // placeholder="숫자만 입력해주세요."
            aria-label="사업자등록번호를 입력하세요"
            maxLength={10}
            onChange={(e) => {
              const regNumExp = /[^0-9]/g;
              if (regNumExp.test(e.target.value)) {
                alert("사업자등록번호는 숫자로만 입력해주세요.");
                e.target.value = e.target.value.replace(regNumExp, "");
              }
              setStoreRegNum(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
        </InputGroup>
        <div className="labelGroup">
          <Form.Label className="label">비밀번호</Form.Label>
        </div>
        <InputGroup className="inputGroup">
          <Form.Control
            className="control"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              height: "40px",
            }}
            type={showPassword ? "text" : "password"}
            // placeholder="비밀번호"
            aria-label="비밀번호를 입력하세요"
            autoComplete="off"
            maxLength={20}
            onChange={(e) => {
              setStorePassword(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <InputGroup.Text
            onClick={onChangeShowPassword}
            style={{ cursor: "pointer", height: "40px" }}>
            <i
              className={
                showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }></i>
          </InputGroup.Text>
        </InputGroup>

        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <a href="#" className="label" >
            비밀번호 찾기
          </a>
        </div>
        <Button className="button" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </Wrapper>
  );
}

export default InputLogin;
