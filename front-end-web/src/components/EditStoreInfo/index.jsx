import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, ToggleButton } from "react-bootstrap";
import axios from "axios";
import ModalStorePostcode from "../../components/ModalStorePostcode";

function EditStoreInfo(props) {
  const { onChange, info } = props;
  const [confirmStoreInfo, setConfirmStoreInfo] = useState(false); // StoreInfo 유효성여부

  const [storeName, setStoreName] = useState(""); // 상점 이름

  const [storeRegNum, setStoreRegNum] = useState(""); // 사업자 등록번호

  const [storeAddress, setStoreAddres] = useState(""); // 상점 전체 주소
  const [mainAddress, setMainAddress] = useState(""); // 상점 대표 주소
  const [extraAddress, setExtraAddress] = useState(""); // 상점 상세 주소
  const [isOpenPost, setIsOpenPost] = useState(false); //  주소 검색창 열렸는지
  const [storeLatitude, setStoreLatitude] = useState(""); // 상점 위도
  const [storeLongitude, setStoreLongitude] = useState(""); // 상점 경도

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

  const [storeCategory, setStoreCategory] = useState(""); // 상점 카테고리

  const [categoryKeywords, setCategoryKeyWords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const selectedCategory = (category) => {
    // console.log(storeCategory);
    axios
      .get(
        `https://j9c109.p.ssafy.io/api/v1/keywords/category/${category}`
      )
      .then((res) => {
        console.log(res.data);
        setCategoryKeyWords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setStoreName(info.storeName);
    setStoreRegNum(info.storeRegNum);
    setStoreAddres(info.storeAddress);
    setMainAddress(info.mainAddress);
    setExtraAddress(info.extraAddress);
    setStoreLatitude(info.storeLatitude);
    setStoreLongitude(info.storeLongitude);
    setStoreCategory(info.storeCategory);
  }, [info]);

  useEffect(() => {
    if (
      storeName !== "" &&
      storeRegNum !== "" &&
      storeAddress !== "" &&
      storeCategory !== ""
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
    });
  }, [storeName, storeAddress, storeCategory, onChange]);

  return (
    <div
      style={{
        width: "80%",
        marginTop: "50px",
        marginLeft: "100px",
        marginRight: "100px",
      }}
    >
      <h4>상점 정보</h4>
      <div style={{ outline: "none", margin: "20px" }}>
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

      <div style={{ outline: "none", margin: "20px" }}>
        <Form.Label>사업자등록번호*</Form.Label>
        <InputGroup>
          <Form.Control
            aria-label="사업자등록번호를 입력하세요."
            readOnly={true}
            value={storeRegNum}
          />
        </InputGroup>
      </div>

      <div style={{ outline: "none", margin: "20px" }}>
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
              setExtraAddress(e.target.value);
              setStoreAddres(mainAddress + " " + " " + e.target.value);
            }}
          />
        </InputGroup>
      </div>

      <div style={{ outline: "none", margin: "20px" }}>
        <Form.Label>상점 카테고리*</Form.Label>
        <Form.Select
          aria-label="상점 카테고리를 선택해 주세요."
          onChange={(e) => {
            setStoreCategory(e.target.value);
            selectedCategory(e.target.value);
          }}>
          <option>상점카테고리</option>
          <option value="1">카페/제과</option>
          <option value="2">음식점</option>
          <option value="3">생활/소품</option>
          <option value="4">여가/체험</option>
          <option value="5">건강/뷰티</option>
        </Form.Select>
      </div>
      <div style={{ outline: "none", margin: "20px" }}>
        <Form.Label>상점 키워드</Form.Label>
        {categoryKeywords?.map((keyword, index) => (
          <ToggleButton
            key={keyword.keywordSeq}
            id={`${keyword.keywordSeq}-toggle-check`}
            type="checkbox"
            variant="outline-primary"
            checked={false}
            value={keyword.keywordSeq}
            onChange={(e) => {
              console.log("HERE");
            }}>
            {keyword.keywordName}
          </ToggleButton>
        ))}
      </div>
      {isOpenPost ? (
        <ModalStorePostcode
          show={isOpenPost}
          onHide={() => setIsOpenPost(false)}
          onCompletePost={onCompletePost}
          setIsOpenPost={setIsOpenPost}
        />
      ) : null}
    </div>
  );
}

export default EditStoreInfo;
