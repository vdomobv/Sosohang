import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Wrapper from "./styles";

function InputLogin() {
  const [storeId, setStoreId] = useState(""); // 상점ID
  const [storePassword, setStorePassword] = useState(""); // 상점비밀번호
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이는지 여부

  // 비밀번호 보이기
  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrapper>
        <div className="container">
      <h1 className="title">로그인</h1>
          <Form.Label className="label">사업자등록번호</Form.Label>
          <InputGroup className="inputGroup" >
            <Form.Control
              className="formControl"
              style={{ borderRadius: "10px", height: "40px" }}
              placeholder="사업자등록번호"
              aria-label="사업자등록번호를 입력하세요"
              maxLength={15}
              onChange={(e) => {
                const idExp = /[^a-z0-9]/g;
                if (idExp.test(e.target.value)) {
                  e.target.value = e.target.value.replace(idExp, "");
                }
                setStoreId(e.target.value);
              }}
            />
          </InputGroup>
          <div className="labelGroup">
            <Form.Label className="label">비밀번호</Form.Label>
            <a href="#" className="label">비밀번호 찾기</a>
          </div>
          <InputGroup className="inputGroup" >
            <Form.Control className="control"
              style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", height: "40px" }}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              aria-label="비밀번호를 입력하세요"
              autoComplete="off"
              maxLength={20}
              onChange={(e) => {
                setStorePassword(e.target.value);
              }}
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
          <Button className="button" style={{ backgroundColor: 'green' }}>로그인</Button>
        </div>
    </Wrapper>
  );
}

export default InputLogin;
