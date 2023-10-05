import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Collapse } from "react-bootstrap";

function InputOwnerInfo({ onChange }) {
  const [confirmOwnerInfo, setConfirmOwnerInfo] = useState(false); // ownerInfo 유효성여부

  const [storePassword, setStorePassword] = useState(""); // 상점비밀번호
  const [storeConfirmPassword, setStoreConfirmPassword] = useState(""); // 상점비밀번호
  const [passwordWarning, setPasswordWarning] = useState(""); // 상점비밀번호 유효성 검사 경고문구
  const [comfirmPasswordWarning, setComfirmPasswordWarning] = useState(""); // 상점비밀번호 확인 유효성 검사 경고문구
  const [isValidPassword, setIsValidPassword] = useState(false); // 상점비밀번호 유효성 검사 결과

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이는지 여부
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호확인 보이는지 여부

  // 휴대폰 인증번호 입력 칸 보일지 말지 결정해보자.
  const [open, setOpen] = useState(false);

  // 상점비밀번호 형식 - 영어 대/소문자, 숫자, 특수문자를 포함하여 8~20글자
  const storePasswordRegEx =
    /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]).{8,20}$/;

  // 상점비밀번호 유효성 검사
  const passwordCheck = (password) => {
    const isValidPassword = storePasswordRegEx.test(password);

    if (!isValidPassword && password !== "") {
      setPasswordWarning(
        "대/소문자, 숫자, 특수문자를 포함한 8~20자로 설정해 주세요."
      );
    } else {
      setPasswordWarning("");
    }

    setIsValidPassword(isValidPassword);
  };

  // 상점비밀번호 확인 비교검사
  const isConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== storePassword && confirmPassword !== "") {
      setComfirmPasswordWarning("비밀번호가 일치하지 않습니다.");
    } else {
      setComfirmPasswordWarning("");
    }
  };

  // 비밀번호 보이기
  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 보이기
  const onChangeShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [storePhoneNum, setStorePhoneNum] = useState(""); // 휴대전화번호
  const [verifiedNum, setVerifiedNum] = useState(""); // 인증번호
  const [isVerifiedNum, setIsVerifiedNum] = useState(false); // 인증번호 인증 여부

  const sendVerifiedNum = async () => {
    if(storePhoneNum.length < 10) {
      return alert("휴대전화번호를 확인해주세요")
    }
    await axios
      .post(`/api/v1/store/register/phone-check?ownerPhone=${storePhoneNum}`)
      .then((res) => {
        console.log(res);
        alert("인증번호가 발송되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("인증번호 발송 x");

      });
    setOpen(true);
  };

  const verifieNumCheck = async () => {
    // 인증번호 확인
    // console.log("인증번호 확인");
    await axios
      .post(
        `/api/v1/member/register/verify-code?memberPhone=${storePhoneNum}&authCode=${verifiedNum}`
      )
      .then((res) => {
        if(res.data.status === "success") {
          console.log(res);
          setIsVerifiedNum(true);
          alert("인증이 완료되었습니다.")
        }
      })
      .catch((err) => {
        console.log(err)
      });

    setOpen(false);
  };

  useEffect(() => {
    if (
      storePassword !== "" &&
      isValidPassword &&
      storePassword === storeConfirmPassword &&
      isVerifiedNum
    ) {
      setConfirmOwnerInfo(true);
    }
    onChange({ storePassword, storePhoneNum, confirmOwnerInfo });
  }, [storePassword, storePhoneNum, confirmOwnerInfo, isVerifiedNum, isValidPassword, onChange]);

  return (
    <div style={{ width: "45%" }}>
      <h2 style={{ marginBottom: 30 }}>사장님 정보</h2>
      <div style={{ marginBottom: 30 }}>
        <Form.Label>휴대전화번호*</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="휴대전화번호(-없이 숫자만 입력하세요.)"
            aria-label="휴대전화번호를 입력하세요"
            maxLength={11}
            onChange={(e) => {
              const numExp = /[^0-9]/g;
              if (numExp.test(e.target.value)) {
                e.target.value = e.target.value.replace(numExp, "");
              }
              setStorePhoneNum(e.target.value);
            }}
          />
          <Button
            id="phone-button-addon2"
            aria-controls="example-collapse-text"
            aria-expanded={open}
            onClick={sendVerifiedNum}
          >
            전송하기
          </Button>
        </InputGroup>
        <Collapse in={open}>
          <div>
            <InputGroup style={{ marginTop: "15px" }}>
              <InputGroup.Text>인증번호</InputGroup.Text>
              <Form.Control
                placeholder="인증번호"
                aria-label="인증번호를 입력하세요"
                maxLength={6}
                onChange={(e) => {
                  const numExp = /[^0-9]/g;
                  if (numExp.test(e.target.value)) {
                    e.target.value = e.target.value.replace(numExp, "");
                  }
                  setVerifiedNum(e.target.value);
                }}
              />
              <Button id="verified-button-addon2" onClick={verifieNumCheck}>
                인증하기
              </Button>
            </InputGroup>
          </div>
        </Collapse>
      </div>
      <div style={{ height: "70px", marginBottom: 30 }}>
        <Form.Label>비밀번호*</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            aria-label="비밀번호를 입력하세요"
            onChange={(e) => {
              passwordCheck(e.target.value);
              setStorePassword(e.target.value);
            }}
          />
          <InputGroup.Text
            onClick={onChangeShowPassword}
            style={{ cursor: "pointer" }}
          >
            <i
              className={
                showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
            ></i>
          </InputGroup.Text>
        </InputGroup>
        <Form.Label className="waringMessage">{passwordWarning}</Form.Label>
      </div>
      <div style={{ height: "70px" }}>
        <Form.Label>비밀번호 확인*</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            aria-label="비밀번호를 한 번 더 입력하세요"
            maxLength={20}
            onChange={(e) => {
              isConfirmPassword(e.target.value);  
              setStoreConfirmPassword(e.target.value);

            }}
          />
          <InputGroup.Text
            onClick={onChangeShowConfirmPassword}
            style={{ cursor: "pointer" }}
          >
            <i
              className={
                showConfirmPassword
                  ? "fa-solid fa-eye"
                  : "fa-solid fa-eye-slash"
              }
            ></i>
          </InputGroup.Text>
        </InputGroup>
        <Form.Label className="waringMessage">
          {comfirmPasswordWarning}
        </Form.Label>
      </div>
    </div>
  );
}

export default InputOwnerInfo;
