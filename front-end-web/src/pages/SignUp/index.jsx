import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Wrapper from "./styles";
import Header from "../../components/Header";
import InputStoreInfo from "../../components/InputStoreInfo";
import InputOwnerInfo from "../../components/InputOwnerInfo";
import InputStoreIssue from "../../components/InputStoreIssue";

function SignUp() {
  const [storeInfo, setStoreInfo] = useState({});
  const [ownerInfo, setOwnerInfo] = useState({});
  const [storeIssue, setStoreIssue] = useState({});

  const handleSignup =  async() => {
    if(!(storeInfo.confirmStoreInfo && ownerInfo.confirmOwnerInfo)) {
      return alert("필수정보가 입력되지 않거나 인증이 되지 않았습니다.")
    }
    try {
      const res = await axios.post("/api/v1/store/register", {
        storeName: storeInfo.storeName,
        registrationNumber: storeInfo.storeRegNum,
        storeLocation: storeInfo.storeAddress,
        categorySeq: storeInfo.storeCategory,
        ownerTell: ownerInfo.storePhoneNum,
        storePassword: ownerInfo.storePassword,
        storeTell: storeIssue.storeCallNum,
        storeParkinglot: storeIssue.storeParkinglot,
        storeWorkhour: storeIssue.storeOpenHour,
        storeHoliday: storeIssue.storeCloseDay,
        storeUrl: storeIssue.storeUrl,
        storeExtraInfo: storeIssue.storeExtraInfo,
        selectedKeywordSeqList: storeIssue.storeKeywords,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <form>
          <div className="container">
            <InputStoreInfo onChange={setStoreInfo} />
            <InputOwnerInfo onChange={setOwnerInfo} />
          </div>
          <div>
            <InputStoreIssue onChange={setStoreIssue} />
          </div>
          <Button onClick={handleSignup}>회원가입</Button>
        </form>
      </Wrapper>
    </div>
  );
}

export default SignUp;
