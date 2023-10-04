import React, { useState, useEffect } from "react";
import { Form, InputGroup, ToggleButton } from "react-bootstrap";

function InputStoreIssue({ onChange }) {
  const [storeCallNum, setStoreCallNum] = useState(""); // 상점 전화번호

  const [existParkinglot, setExistParkinglot] = useState(false); // 주차장여부
  const [storeParkinglot, setStoreParkinglot] = useState(""); // 주차장설명

  const [storeWorkDay, setStoreWorkDay] = useState(""); // 영업일 문자열
  const [storeOpenHour, setStoreOpenHour] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]); // 영업일
  const [openEveryday, setOpenEveryday] = useState(false); // 영업일 - 매일
  const [openMonday, setOpenMonday] = useState(false); // 영업일 - 월요일
  const [openTuesday, setOpenTuesday] = useState(false); // 영업일 - 화요일
  const [openWendsday, setOpenWendsday] = useState(false); // 영업일 - 수요일
  const [openThursday, setOpenThursday] = useState(false); // 영업일 - 목요일
  const [openFriday, setOpenFriday] = useState(false); // 영업일 - 금요일
  const [openSaturday, setOpenSaturday] = useState(false); // 영업일 - 토요일
  const [openSunday, setOpenSunday] = useState(false); // 영업일 - 일요일

  useEffect(() => {
    let temp = "";
    setStoreWorkDay(temp);
    storeOpenHour.forEach((ele) => {
      if (ele[0] !== "") {
        temp = temp + ele[0] + ": " + ele[1] + " ~ " + ele[2] + " / ";
        setStoreWorkDay(temp);
      }
    });
  }, [storeOpenHour]);

  const [storeHoliday, setStoreHoliday] = useState(""); // 휴무일 문자열
  const [storeCloseDay, setStoreCloseDay] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]); // 휴무일
  const [closeMonday, setCloseMonday] = useState(false); // 휴무일 - 월요일
  const [closeTuesday, setCloseTuesday] = useState(false); // 휴무일 - 화요일
  const [closeWendsday, setCloseWendsday] = useState(false); // 휴무일 - 수요일
  const [closeThursday, setCloseThursday] = useState(false); // 휴무일 - 목요일
  const [closeFriday, setCloseFriday] = useState(false); // 휴무일 - 금요일
  const [closeSaturday, setCloseSaturday] = useState(false); // 휴무일 - 토요일
  const [closeSunday, setCloseSunday] = useState(false); // 휴무일 - 일요일
  const [closeDay, setCloseDay] = useState(false); // 휴무일 - 기타

  useEffect(() => {
    let temp = "";
    setStoreHoliday(temp);
    storeCloseDay.forEach((ele) => {
      if (ele !== "") {
        temp = temp + " " + ele;
        setStoreHoliday(temp);
      }
    });
  }, [storeCloseDay]);

  const [storeUrl, setStoreUrl] = useState(""); // 상점홈페이지

  const [storeExtraInfo, setStoreExtraInfo] = useState(""); // 상점상세설명

  useEffect(() => {
    onChange({
      storeCallNum,
      storeParkinglot,
      storeWorkDay,
      storeHoliday,
      storeUrl,
      storeExtraInfo,
    });
  }, [
    storeCallNum,
    storeParkinglot,
    storeWorkDay,
    storeHoliday,
    storeUrl,
    storeExtraInfo,
    onChange,
  ]);

  return (
    <div className="optionalInputBox">
      <h4>부가 정보</h4>
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <Form.Label>상점 전화번호</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="상점 전화번호"
            aria-label="상점 전화번호를 입력해주세요"
            maxLength={50}
            onChange={(e) => {
              const numExp = /[^0-9]/g;
              if (numExp.test(e.target.value)) {
                e.target.value = e.target.value.replace(numExp, "");
              }
              setStoreCallNum(e.target.value);
            }}
          />
        </InputGroup>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Form.Label>주차장</Form.Label>
        <InputGroup>
          <ToggleButton
            id="parkinglot-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={existParkinglot}
            onChange={(e) => setExistParkinglot(e.currentTarget.checked)}
            style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
          >
            {existParkinglot ? "주차장 있음" : "주차장 없음"}
          </ToggleButton>
          <Form.Control
            placeholder="주차장에 대한 부가정보를 입력해주세요"
            aria-label="주차장에 대한 부가정보를 입력해주세요"
            disabled={!existParkinglot}
            onChange={(e) => {
              if (existParkinglot) {
                setStoreParkinglot(e.target.value);
              } else {
                setStoreParkinglot("");
              }
            }}
          />
        </InputGroup>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Form.Label>영업시간</Form.Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            alignItems: "center"
          }}
        >
          <InputGroup>
            <ToggleButton
              id="open-eveyday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openEveryday}
              onChange={(e) => {
                setOpenEveryday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[0][0] = "매일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[0][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90,
              }}
              disabled={
                openMonday ||
                openTuesday ||
                openWendsday ||
                openThursday ||
                openFriday ||
                openSaturday ||
                openSunday
              }
            >
              매 일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openEveryday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[0][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openEveryday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[0][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <ToggleButton
              id="open-monday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openMonday}
              onChange={(e) => {
                setOpenMonday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[1][0] = "월요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[1][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90
              }}
              disabled={openEveryday}
            >
              월요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openMonday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[1][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openMonday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[1][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <ToggleButton
              id="open-tuesday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openTuesday}
              onChange={(e) => {
                setOpenTuesday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[2][0] = "화요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[2][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90
              }}
              disabled={openEveryday}
            >
              화요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openTuesday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[2][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openTuesday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[2][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <ToggleButton
              id="open-wendsday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openWendsday}
              onChange={(e) => {
                setOpenWendsday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[3][0] = "수요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[3][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90
              }}
              disabled={openEveryday}
            >
              수요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openWendsday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[3][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openWendsday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[3][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          {/* </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
          }}> */}
          <InputGroup>
            <ToggleButton
              id="open-thursday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openThursday}
              onChange={(e) => {
                setOpenThursday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[4][0] = "목요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[4][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90,
              }}
              disabled={openEveryday}
            >
              목요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openThursday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[4][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openThursday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[4][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <ToggleButton
              id="open-friday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openFriday}
              onChange={(e) => {
                setOpenFriday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[5][0] = "금요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[5][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90
              }}
              disabled={openEveryday}
            >
              금요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openFriday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[5][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openFriday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[5][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <ToggleButton
              id="open-saturday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openSaturday}
              onChange={(e) => {
                setOpenSaturday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[6][0] = "토요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[6][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90
              }}
              disabled={openEveryday}
            >
              토요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openSaturday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[6][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openSaturday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[6][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <ToggleButton
              id="open-sunday-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={openSunday}
              onChange={(e) => {
                setOpenSunday(e.currentTarget.checked);
                if (e.currentTarget.checked) {
                  let temp = [...storeOpenHour];
                  temp[7][0] = "일요일";
                  setStoreOpenHour(temp);
                } else {
                  let temp = [...storeOpenHour];
                  temp[7][0] = "";
                  setStoreOpenHour(temp);
                }
              }}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                marginLeft: 15,
                marginRight: 25,
                height: 90
              }}
              disabled={openEveryday}
            >
              일요일
            </ToggleButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openSunday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[7][1] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
              <Form.Control
                type="time"
                aria-label="영업시간에 대한 정보를 입력해주세요"
                disabled={!openSunday}
                onBlur={(e) => {
                  let temp = [...storeOpenHour];
                  temp[7][2] = e.target.value;
                  setStoreOpenHour(temp);
                }}
              />
            </div>
          </InputGroup>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Form.Label>상점 휴무일</Form.Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "10px",
            alignItems: "center",
          }}
        >
          <Form.Control
            placeholder="주기"
            aria-label="휴무주기에 대한 정보를 입력해주세요"
            onChange={(e) => {
              let temp = [...storeCloseDay];
              temp[0] = e.target.value;
              setStoreCloseDay(temp);
            }}
          />

          <ToggleButton
            id="close-monday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeMonday}
            onChange={(e) => {
              setCloseMonday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[1] = "월요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[1] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            월요일
          </ToggleButton>
          <ToggleButton
            id="close-tuesday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeTuesday}
            onChange={(e) => {
              setCloseTuesday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[2] = "화요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[2] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            화요일
          </ToggleButton>
          <ToggleButton
            id="close-wendsday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeWendsday}
            onChange={(e) => {
              setCloseWendsday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[3] = "수요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[3] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            수요일
          </ToggleButton>
          <ToggleButton
            id="close-thursday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeThursday}
            onChange={(e) => {
              setCloseThursday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[4] = "목요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[4] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            목요일
          </ToggleButton>
          <ToggleButton
            id="close-friday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeFriday}
            onChange={(e) => {
              setCloseFriday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[5] = "금요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[5] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            금요일
          </ToggleButton>
          <ToggleButton
            id="close-saturday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeSaturday}
            onChange={(e) => {
              setCloseSaturday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[6] = "토요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[6] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            토요일
          </ToggleButton>
          <ToggleButton
            id="close-sunday-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeSunday}
            onChange={(e) => {
              setCloseSunday(e.currentTarget.checked);
              if (e.currentTarget.checked) {
                let temp = [...storeCloseDay];
                temp[7] = "일요일";
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[7] = "";
                setStoreCloseDay(temp);
              }
            }}
          >
            일요일
          </ToggleButton>
        </div>
        <InputGroup style={{ marginTop: 10 }}>
          <ToggleButton
            id="close-day-toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={closeDay}
            onChange={(e) => setCloseDay(e.currentTarget.checked)}
            style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
          >
            기타
          </ToggleButton>
          <Form.Control
            placeholder="휴무일에 대한 정보를 입력해주세요"
            aria-label="휴무일에 대한 정보를 입력해주세요"
            disabled={!closeDay}
            onChange={(e) => {
              if (closeDay) {
                let temp = [...storeCloseDay];
                temp[8] = e.target.value;
                setStoreCloseDay(temp);
              } else {
                let temp = [...storeCloseDay];
                temp[8] = "";
                setStoreCloseDay(temp);
              }
            }}
          />
        </InputGroup>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Form.Label>상점 홈페이지</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="상점 홈페이지"
            aria-label="상점 홈페이지를 입력하세요."
            onChange={(e) => setStoreUrl(e.target.value)}
          />
        </InputGroup>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Form.Label>상점 설명</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="짱큰거 필요"
            aria-label="storeInfo"
            onChange={(e) => setStoreExtraInfo(e.target.value)}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default InputStoreIssue;
