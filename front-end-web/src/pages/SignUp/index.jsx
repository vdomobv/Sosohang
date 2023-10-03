import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
// import Cookies from "js-cookie";
import Wrapper from "./styles";
import Header from "../../components/Header";
import InputStoreInfo from "../../components/InputStoreInfo";
import InputOwnerInfo from "../../components/InputOwnerInfo";
import InputStoreIssue from "../../components/InputStoreIssue";
import FileUpload from "../../components/FileUpload";

function SignUp() {
  const navigate = useNavigate();

  // const tokenCookie = Cookies.get("jwtToken");
  // console.log(tokenCookie);
  // useEffect(() => {
  //   if (tokenCookie !== undefined) return navigate("/")
  // }, [tokenCookie])  

  const [storeInfo, setStoreInfo] = useState({});
  const [ownerInfo, setOwnerInfo] = useState({});
  const [storeIssue, setStoreIssue] = useState({});
  const [storeImageUrl, setStoreImageUrl] = useState("");

  const handleSignup = async () => {
    if (!(storeInfo.confirmStoreInfo && ownerInfo.confirmOwnerInfo)) {
      return alert("필수정보가 입력되지 않거나 인증이 되지 않았습니다.");
    }

    await axios
      .post("/api/v1/store/register", {
        storeName: storeInfo.storeName,
        registrationNumber: storeInfo.storeRegNum,
        storeLocation: storeInfo.storeAddress,
        categorySeq: storeInfo.storeCategory,
        storeLatitude: storeInfo.storeLatitude,
        storeLongitude: storeInfo.storeLongitude,
        ownerTell: ownerInfo.storePhoneNum,
        storePassword: ownerInfo.storePassword,
        storeTell: storeIssue.storeCallNum,
        storeParkinglot: storeIssue.storeParkinglot,
        storeWorkhour: storeIssue.storeWorkDay,
        storeHoliday: storeIssue.storeHoliday,
        storeExtraInfo: storeIssue.storeExtraInfo,
        selectedKeywordSeqList: storeIssue.storeKeywords,
        storeUrl: storeIssue.storeUrl,
        storeImage: storeImageUrl,
      })
      .then((res) => {
        console.log(res);
        alert("회원가입이 완료되었습니다.")
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header/>
      <Wrapper>
        <form>
          <div className="container">
            <InputStoreInfo onChange={setStoreInfo} />
            <InputOwnerInfo onChange={setOwnerInfo} />
          </div>
          <div>
            <InputStoreIssue onChange={setStoreIssue} />
            <FileUpload onChange={setStoreImageUrl} />
          </div>
          <Button onClick={handleSignup}>회원가입</Button>
        </form>
      </Wrapper>
    </div>
  );
}

export default SignUp;
