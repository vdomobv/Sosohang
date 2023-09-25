import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, ToggleButton } from "react-bootstrap";
import Wrapper from "./styles";
import Header from "../../components/Header";
import ModalStorePostcode from "../../components/ModalStorePostcode";

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

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이는지 여부
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호확인 보이는지 여부

  const [mainAddress, setMainAddress] = useState(""); // 상점 주소
  const [extraAddress, setExtraAddress] = useState(""); // 상점 상세 주소
  const [isOpenPost, setIsOpenPost] = useState(false); //  주소 검색창 열렸는지

  const [existParkinglot, setExistParkinglot] = useState(false); // 주차장여부

  const [openEveryday, setOpenEveryday] = useState(false); // 영업일 - 매일
  const [openMonday, setOpenMonday] = useState(false); // 영업일 - 월요일
  const [openTuesday, setOpenTuesday] = useState(false); // 영업일 - 화요일
  const [openWendsday, setOpenWendsday] = useState(false); // 영업일 - 수요일
  const [openThursday, setOpenThursday] = useState(false); // 영업일 - 목요일
  const [openFriday, setOpenFriday] = useState(false); // 영업일 - 금요일
  const [openSaturday, setOpenSaturday] = useState(false); // 영업일 - 토요일
  const [openSunday, setOpenSunday] = useState(false); // 영업일 - 일요일

  const [closeMonday, setCloseMonday] = useState(false); // 휴무일 - 월요일
  const [closeTuesday, setCloseTuesday] = useState(false); // 휴무일 - 화요일
  const [closeWendsday, setCloseWendsday] = useState(false); // 휴무일 - 수요일
  const [closeThursday, setCloseThursday] = useState(false); // 휴무일 - 목요일
  const [closeFriday, setCloseFriday] = useState(false); // 휴무일 - 금요일
  const [closeSaturday, setCloseSaturday] = useState(false); // 휴무일 - 토요일
  const [closeSunday, setCloseSunday] = useState(false); // 휴무일 - 일요일
  const [closeDay, setCloseDay] = useState(false); // 휴무일 - 기타

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
      setIdWarning(
        "소문자, 숫자 중 하나이상을 사용하여 5~15자리로 설정해 주세요"
      );
    } else {
      setIdWarning("");
    }

    setIsValidId(isValidId);
  };

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
  const confirmPassword = (confirmPassword) => {
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

  // 우편번호찾기 모달 띄우기
  const onChangeOpenPost = (e) => {
    e.preventDefault(); // 새로고침 방지
    setIsOpenPost(!isOpenPost);
  };

  // 찾은 주소 입력하기
  const onCompletePost = (data) => {
    setMainAddress(data.address);
    setExtraAddress(data.buildingName);
    setIsOpenPost(false);

    console.log(data);
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <form>
          <div className="container">
            <div className="essentialInputBox">
              <h4>상점 정보</h4>
              <div style={{ outline: "none" }}>
                <Form.Label>상점 이름*</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="상점 이름"
                    aria-label="상점이름을 입력하세요."
                  />
                </InputGroup>
              </div>

              <div style={{ height: "70px" }}>
                <Form.Label>사업자등록번호*</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="사업자등록번호(- 없이 숫자만 입력하세요)"
                    aria-label="사업자등록번호를 입력하세요."
                    maxLength={10}
                    onChange={(e) => {
                      const numExp = /[^0-9]/g;
                      if (numExp.test(e.target.value)) {
                        e.target.value = e.target.value.replace(numExp, "");
                      }
                      regNumCheck(e.target.value);
                      setStoreRegNum(e.target.value);
                    }}
                  />
                  <Button id="button-addon2">인증하기</Button>
                </InputGroup>
                <Form.Label className="waringMessage">
                  {regNumWarnig}
                </Form.Label>
              </div>

              <div>
                <Form.Label>상점 위치*</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="우편번호 조회"
                    aria-label="우측버튼을 눌러 우편번호를 조회하세요"
                    readOnly={true}
                    value={mainAddress}
                  />
                  <Button id="button-addon2" onClick={onChangeOpenPost}>
                    검색하기
                  </Button>
                </InputGroup>
                <InputGroup style={{ marginTop: "15px" }}>
                  <Form.Control
                    placeholder="상세주소"
                    aria-label="상점의 상세주소를 입력하세요"
                    value={extraAddress}
                    onChange={(e) => {
                      setExtraAddress(e.target.value);
                    }}
                  />
                </InputGroup>
              </div>

              <div>
                <Form.Label>상점 카테고리*</Form.Label>
                <Form.Select aria-label="상점 카테고리를 선택해 주세요.">
                  <option>상점카테고리</option>
                  <option value="1">One</option>
                  <option value="2">two</option>
                  <option value="3">three</option>
                </Form.Select>
              </div>
            </div>

            <div className="essentialInputBox">
              <h4>사장님 정보</h4>
              <div style={{ height: "70px" }}>
                <Form.Label>아이디*</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="아이디"
                    aria-label="상점아이디를 입력해주세요."
                    maxLength={15}
                    onChange={(e) => {
                      const idExp = /[^a-z0-9]/g;
                      if (idExp.test(e.target.value)) {
                        e.target.value = e.target.value.replace(idExp, "");
                      }
                      idCheck(e.target.value);
                      setStoreId(e.target.value);
                    }}
                  />
                  <Button id="button-addon2">중복확인</Button>
                </InputGroup>
                <Form.Label className="waringMessage">{idWarning}</Form.Label>
              </div>
              <div>
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
                    }}
                  />
                  <Button id="button-addon2">전송하기</Button>
                </InputGroup>
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
                    }}
                  />
                  <Button id="button-addon2">인증하기</Button>
                </InputGroup>
              </div>
              <div style={{ height: "70px" }}>
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
                    style={{ cursor: "pointer" }}>
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Label className="waringMessage">
                  {passwordWarning}
                </Form.Label>
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
                      confirmPassword(e.target.value);
                    }}
                  />
                  <InputGroup.Text
                    onClick={onChangeShowConfirmPassword}
                    style={{ cursor: "pointer" }}>
                    <i
                      className={
                        showConfirmPassword
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Label className="waringMessage">
                  {comfirmPasswordWarning}
                </Form.Label>
              </div>
            </div>
          </div>

          <div className="optionalInputBox">
            <h4>부가 정보</h4>
            <div>
              <Form.Label>상점 전화번호</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="상점 전화번호"
                  aria-label="상점 전화번호르 입력해주세요"
                  maxLength={50}
                  onChange={(e) => {
                    const numExp = /[^0-9]/g;
                    if (numExp.test(e.target.value)) {
                      e.target.value = e.target.value.replace(numExp, "");
                    }
                  }}
                />
              </InputGroup>
            </div>
            <div>
              <Form.Label>주차장</Form.Label>
              <InputGroup>
                <ToggleButton
                  id="parkinglot-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={existParkinglot}
                  onChange={(e) => setExistParkinglot(e.currentTarget.checked)}>
                  {existParkinglot ? "주차장 있음" : "주차장 없음"}
                </ToggleButton>
                <Form.Control
                  placeholder="주차장에 대한 부가정보를 입력해주세요"
                  aria-label="주차장에 대한 부가정보를 입력해주세요"
                  disabled={!existParkinglot}
                />
              </InputGroup>
            </div>
            <div>
              <Form.Label>영업시간</Form.Label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-eveyday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openEveryday}
                    onChange={(e) => setOpenEveryday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={
                      openMonday ||
                      openTuesday ||
                      openWendsday ||
                      openThursday ||
                      openFriday ||
                      openSaturday ||
                      openSunday
                    }>
                    매 일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openEveryday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openEveryday}
                    />
                  </div>
                </InputGroup>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-monday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openMonday}
                    onChange={(e) => setOpenMonday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    월요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openMonday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openMonday}
                    />
                  </div>
                </InputGroup>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-tuesday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openTuesday}
                    onChange={(e) => setOpenTuesday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    화요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openTuesday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openTuesday}
                    />
                  </div>
                </InputGroup>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-wendsday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openWendsday}
                    onChange={(e) => setOpenWendsday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    수요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openWendsday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openWendsday}
                    />
                  </div>
                </InputGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                }}>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-thursday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openThursday}
                    onChange={(e) => setOpenThursday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    목요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openThursday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openThursday}
                    />
                  </div>
                </InputGroup>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-friday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openFriday}
                    onChange={(e) => setOpenFriday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    금요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openFriday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openFriday}
                    />
                  </div>
                </InputGroup>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-saturday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openSaturday}
                    onChange={(e) => setOpenSaturday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    토요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openSaturday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openSaturday}
                    />
                  </div>
                </InputGroup>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="open-sunday-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={openSunday}
                    onChange={(e) => setOpenSunday(e.currentTarget.checked)}
                    style={{
                      width: "75px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    disabled={openEveryday}>
                    일요일
                  </ToggleButton>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openSunday}
                    />
                    <Form.Control
                      type="time"
                      aria-label="영업시간에 대한 정보를 입력해주세요"
                      disabled={!openSunday}
                    />
                  </div>
                </InputGroup>
              </div>
            </div>
            <div>
              <Form.Label>상점 휴무일</Form.Label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-evenly",
                }}>
                <ToggleButton
                  id="close-monday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeMonday}
                  onChange={(e) => setCloseMonday(e.currentTarget.checked)}>
                  월요일
                </ToggleButton>
                <ToggleButton
                  id="close-tuesday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeTuesday}
                  onChange={(e) => setCloseTuesday(e.currentTarget.checked)}>
                  화요일
                </ToggleButton>
                <ToggleButton
                  id="close-wendsday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeWendsday}
                  onChange={(e) => setCloseWendsday(e.currentTarget.checked)}>
                  수요일
                </ToggleButton>
                <ToggleButton
                  id="close-thursday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeThursday}
                  onChange={(e) => setCloseThursday(e.currentTarget.checked)}>
                  목요일
                </ToggleButton>
                <ToggleButton
                  id="close-friday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeFriday}
                  onChange={(e) => setCloseFriday(e.currentTarget.checked)}>
                  금요일
                </ToggleButton>
                <ToggleButton
                  id="close-saturday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeSaturday}
                  onChange={(e) => setCloseSaturday(e.currentTarget.checked)}>
                  토요일
                </ToggleButton>
                <ToggleButton
                  id="close-sunday-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={closeSunday}
                  onChange={(e) => setCloseSunday(e.currentTarget.checked)}>
                  일요일
                </ToggleButton>
                <InputGroup style={{ width: "350px" }}>
                  <ToggleButton
                    id="close-day-toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={closeDay}
                    onChange={(e) => setCloseDay(e.currentTarget.checked)}
                    style={{ borderRadius: "5%" }}>
                    기타
                  </ToggleButton>
                  <Form.Control
                    placeholder="휴무일에 대한 정보를 입력해주세요"
                    aria-label="휴무일에 대한 정보를 입력해주세요"
                    disabled={!closeDay}
                  />
                </InputGroup>
              </div>
            </div>
            <div>
              <Form.Label>상점 홈페이지</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="상점 홈페이지"
                  aria-label="상점 홈페이지를 입력하세요."
                />
              </InputGroup>
            </div>
            <div>
              <Form.Label>상점 설명</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="짱큰거 필요"
                  aria-label="storeInfo"
                />
              </InputGroup>
            </div>
            <div>
              <Form.Label>상점 키워드</Form.Label>
              <button style={{ color: "red", marginLeft: "30px" }}>수박</button>
              <button style={{ color: "orange", marginLeft: "30px" }}>
                딸기
              </button>
              <button style={{ color: "yellow", marginLeft: "30px" }}>
                커피
              </button>
              <button style={{ color: "green", marginLeft: "30px" }}>
                망고
              </button>
              <button style={{ color: "blue", marginLeft: "30px" }}>
                라떼
              </button>
              <button style={{ color: "indigo", marginLeft: "30px" }}>
                튀김
              </button>
              <button style={{ color: "purple", marginLeft: "30px" }}>
                치킨
              </button>
              <br></br>
              <button style={{ marginLeft: 3 }}>내</button>
              <button>이름은</button>
              <button>정빈</button>
              <button>탐정</button>
              <button>이죠</button>
            </div>
          </div>
        </form>
      </Wrapper>
      {isOpenPost ? (
        <ModalStorePostcode onCompletePost={onCompletePost} />
      ) : null}
    </div>
  );
}

export default SignUp;
