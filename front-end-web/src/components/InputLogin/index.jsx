import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function InputLogin() {
  const [storeId, setStoreId] = useState(""); // 상점ID
  const [storePassword, setStorePassword] = useState(""); // 상점비밀번호
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이는지 여부

  // 비밀번호 보이기
  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <InputGroup>
        <Form.Label>아이디</Form.Label>
        <Form.Control
          placeholder="아이디"
          aria-label="아이디를 입력하세요"
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
      <InputGroup>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
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
          style={{ cursor: "pointer" }}>
          <i
            className={
              showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
            }></i>
        </InputGroup.Text>
      </InputGroup>
      <Button>로그인</Button>
    </div>
  );
}

export default InputLogin;
