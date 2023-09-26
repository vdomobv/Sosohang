import React, { useState } from "react";
import { Form, InputGroup, ToggleButton } from "react-bootstrap";


function InputStoreIssue() {
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

  return (
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
          <Form.Control placeholder="짱큰거 필요" aria-label="storeInfo" />
        </InputGroup>
      </div>
      <div>
        <Form.Label>상점 키워드</Form.Label>
        <button style={{ color: "red", marginLeft: "30px" }}>수박</button>
        <button style={{ color: "orange", marginLeft: "30px" }}>딸기</button>
        <button style={{ color: "yellow", marginLeft: "30px" }}>커피</button>
        <button style={{ color: "green", marginLeft: "30px" }}>망고</button>
        <button style={{ color: "blue", marginLeft: "30px" }}>라떼</button>
        <button style={{ color: "indigo", marginLeft: "30px" }}>튀김</button>
        <button style={{ color: "purple", marginLeft: "30px" }}>치킨</button>
        <br></br>
        <button style={{ marginLeft: 3 }}>내</button>
        <button>이름은</button>
        <button>정빈</button>
        <button>탐정</button>
        <button>이죠</button>
      </div>
    </div>
  );
}

export default InputStoreIssue;
