import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  InputGroup,
  Button,
  Collapse,
  ToggleButton,
} from "react-bootstrap";
import axios from "axios";
import ModalStorePostcode from "../../components/ModalStorePostcode";
import ModalStoreRegNum from "../../components/ModalStoreRegNum";

function InputStoreInfo({ onChange }) {
  const [confirmStoreInfo, setConfirmStoreInfo] = useState(false); // StoreInfo 유효성여부

  const [storeName, setStoreName] = useState(""); // 상점 이름

  const [storeRegNum, setStoreRegNum] = useState(""); // 사업자 등록번호
  const [regNumWarnig, setRegNumWarning] = useState(""); // 사업자등록번호 유효성 검사 경고문구
  const [isValidRegNum, setIsValidRegNum] = useState(false); // 사업자등록번호 유효성 검사 결과
  const [isOpenRegNum, setIsOpenRegNum] = useState(false); // 사업자등록번호 인증 모달창 여부
  const [isVerifiedRegNum, setIsVerifiedRegNum] = useState(false); // 사업자 등록번호 인증여부

  // 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 국세청
  const redirectToHomeTax = () => {
    window.location.href = "https://hometax.go.kr/";
  };

  // 사업자등록번호 형식 - 숫자 10자리
  const storeRegNumEx = /^[0-9]{10}$/;

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

  // 사업자등록번호 인증 모달 띄우기
  const onChangeOpenRegNum = (e) => {
    // e.preventDefault(); // 새로고침 방지
    axios
      .post(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=ULFR0UF6ByTGjclsNKrqQLC0L3GItE%2FRZev%2FKQ%2FE5A0YMnGuDqdYpi00CYrvWXVPxz8hxJq4h9M92hUvCUAKhQ%3D%3D",
        {
          b_no: [storeRegNum],
        }
      )
      .then((res) => {
        if (
          res.data.data[0].b_stt_cd === "01" ||
          res.data.data[0].b_stt_cd === "02"
        ) {
          setIsOpenRegNum(!isOpenRegNum);
        } else {
          handleShow();
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  const [storeAddress, setStoreAddres] = useState(""); // 상점 전체 주소
  const [mainAddress, setMainAddress] = useState(""); // 상점 대표 주소
  const [extraAddress, setExtraAddress] = useState(""); // 상점 상세 주소
  const [isOpenPost, setIsOpenPost] = useState(false); //  주소 검색창 열렸는지
  const [storeLatitude, setStoreLatitude] = useState(0); // 상점 위도
  const [storeLongitude, setStoreLongitude] = useState(0); // 상점 경도

  // 우편번호찾기 모달 띄우기
  const onChangeOpenPost = (e) => {
    e.preventDefault(); // 새로고침 방지
    setIsOpenPost(!isOpenPost);
  };

  // 찾은 주소 입력하기
  const onCompletePost = (data) => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ACCESS_KEY}`,
          },
        }
      )
      .then((res) => {
        setMainAddress(data.address);
        setExtraAddress(data.buildingName);
        setStoreAddres(data.address + " " + " " + data.buildingName);
        setStoreLatitude(res.data.documents[0].y);
        setStoreLongitude(res.data.documents[0].x);
        setIsOpenPost(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [storeCategory, setStoreCategory] = useState("1"); // 상점 카테고리
  const [keywordList, setKeywordList] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordChecklist, setKeywordChecklist] = useState([]);

  const [open, setOpen] = useState(false);

  const handleCategorySeq = (categorySeq) => {
    axios
      .get(`https://j9c109.p.ssafy.io/api/v1/keywords/category/${categorySeq}`)
      .then((res) => {
        console.log(res.data);
        setKeywordList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (keywordList.length > 0) {
      // 키워드 목록에 데이터가 있을 경우만 Collapse를 엽니다.
      setOpen(true);
      setKeywordChecklist(new Array(keywordList.length).fill(false));
    }
  }, [keywordList]);

  useEffect(() => {
    if (
      storeName !== "" &&
      storeRegNum !== "" &&
      storeAddress !== "" &&
      storeCategory !== "" &&
      isVerifiedRegNum
    ) {
      setConfirmStoreInfo(true);
    }
    onChange({
      storeName,
      storeRegNum,
      storeAddress,
      storeCategory,
      confirmStoreInfo,
      storeLatitude,
      storeLongitude,
      selectedKeywords,
    });
  }, [
    storeName,
    storeRegNum,
    storeAddress,
    storeCategory,
    confirmStoreInfo,
    isVerifiedRegNum,
    selectedKeywords,
    onChange,
  ]);

  return (
    <div style={{ width: "45%", marginBottom: 30 }}>
      <h4>상점 정보</h4>
      <div style={{ outline: "none", marginBottom: 30 }}>
        <Form.Label>상점 이름*</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="상점 이름"
            aria-label="상점이름을 입력하세요."
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </InputGroup>
      </div>

      <div style={{ height: "70px", marginBottom: 30 }}>
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
          <Button
            id="regNum-button-addon2"
            onClick={onChangeOpenRegNum}
            disabled={!isValidRegNum}
          >
            인증하기
          </Button>
        </InputGroup>
        <Form.Label className="waringMessage">{regNumWarnig}</Form.Label>
      </div>

      <div style={{ marginBottom: 30 }}>
        <Form.Label>상점 위치*</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="우편번호 조회"
            aria-label="우측버튼을 눌러 우편번호를 조회하세요"
            readOnly={true}
            value={mainAddress}
          />
          <Button id="postcode-button-addon2" onClick={onChangeOpenPost}>
            검색하기
          </Button>
        </InputGroup>
        <InputGroup style={{ marginTop: "15px" }}>
          <Form.Control
            placeholder="상세주소"
            aria-label="상점의 상세주소를 입력하세요"
            value={extraAddress}
            onChange={(e) => {
              setExtraAddress(e.target.value.replace(/\s{2,}/gi, " "));
              setStoreAddres(mainAddress + " " + " " + e.target.value);
            }}
          />
        </InputGroup>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginBottom: 30 }}>
        <div style={{ width: "50%", marginRight: 30 }}>
          <Form.Label>상점 카테고리*</Form.Label>
          <Form.Select
            aria-label="상점 카테고리를 선택해 주세요."
            onChange={(e) => {
              setSelectedKeywords([]);
              if (e.target.value === "0") {
                setKeywordList([]);
                setStoreCategory("");
              } else {
                setStoreCategory(e.target.value);
                handleCategorySeq(e.target.value);
              }
            }}
          >
            <option value="0">상점카테고리</option>
            <option value="1">카페/제과</option>
            <option value="2">음식점</option>
            <option value="3">생활/소품</option>
            <option value="4">여가/체험</option>
            <option value="5">건강/뷰티</option>
          </Form.Select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <Form.Label>상점 키워드 (최대 3개 선택 가능합니다)</Form.Label>
        </div>
        <Collapse in={open}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "5px",
              alignItems: "center",
            }}
          >
            {keywordList?.map((keyword, index) => (
              <ToggleButton
                key={keyword.keywordSeq}
                id={`${keyword.keywordSeq}-toggle-check`}
                type="checkbox"
                variant="outline-primary"
                checked={keywordChecklist[index]}
                value={keyword.keywordSeq}
                onChange={(e) => {
                  const newChecklist = [...keywordChecklist];
                  newChecklist[index] = e.currentTarget.checked;

                  if (e.currentTarget.checked) {
                    // 최대 3개의 키워드만 선택 가능하도록 검사
                    if (selectedKeywords.length < 3) {
                      setSelectedKeywords([
                        ...selectedKeywords,
                        keyword.keywordSeq,
                      ]);
                    } else {
                      // 이미 3개 이상 선택된 경우, 체크를 해제합니다.
                      newChecklist[index] = false;
                    }
                  } else {
                    setSelectedKeywords(
                      selectedKeywords.filter(
                        (selected) => selected !== keyword.keywordSeq
                      )
                    );
                  }
                  setKeywordChecklist(newChecklist);

                  console.log(selectedKeywords);
                }}
              >
                {keyword.keywordName}
              </ToggleButton>
            ))}
          </div>
        </Collapse>
      </div>
      {isOpenPost ? (
        <ModalStorePostcode
          show={isOpenPost}
          onHide={() => setIsOpenPost(false)}
          onCompletePost={onCompletePost}
          setIsOpenPost={setIsOpenPost}
        />
      ) : null}
      {isOpenRegNum ? (
        <ModalStoreRegNum
          regNum={storeRegNum}
          setIsOpenRegNum={setIsOpenRegNum}
          setIsVerifiedRegNum={setIsVerifiedRegNum}
        />
      ) : null}
      {show ? (
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>사업자등록번호 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            존재하지 않는 사업자 입니다. 사업자 번호를 확인해 주세요.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={redirectToHomeTax}>
              국세청
            </Button>
            <Button variant="light" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
}

export default InputStoreInfo;
