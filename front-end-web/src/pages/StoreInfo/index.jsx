import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Wrapper from "./styles";
import Header from "../../components/Header";
import InputStoreInfo from "../../components/InputStoreInfo";
import InputOwnerInfo from "../../components/InputOwnerInfo";
import InputStoreIssue from "../../components/InputStoreIssue";

function StoreInfo() {
  const [storeInfo, setStoreInfo] = useState({});
  const [ownerInfo, setOwnerInfo] = useState({});
  const [storeIssue, setStoreIssue] = useState({});

  const inquiryStoreInfo =  async() => {
    try {
      const res = await axios.post("", {
        storeName: storeInfo.storeName,
        storeLocation: storeInfo.storeAddress,
        categorySeq: storeInfo.storeCategory,
        ownerTell: ownerInfo.storePhoneNum,
        storePassword: ownerInfo.storePassword,
        storeTell: storeIssue.storeCallNum,
        storeParkinglot: storeIssue.storeParkinglot,
        storeWorkhour: storeIssue.storeWorkDay,
        storeHoliday: storeIssue.storeHoliday,
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

export default StoreInfo;
