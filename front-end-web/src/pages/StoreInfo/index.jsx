import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import Wrapper from "./styles";
import Header from "../../components/Header";
import EditStoreInfo from "../../components/EditStoreInfo";
import InputOwnerInfo from "../../components/InputOwnerInfo";
import InputStoreIssue from "../../components/InputStoreIssue";

function StoreInfo() {
  const [totalStoreInfo, setTotalStoreInfo] = useState({});
  const [storeInfo, setStoreInfo] = useState({});
  const [ownerInfo, setOwnerInfo] = useState({});
  const [storeIssue, setStoreIssue] = useState({});

  useEffect(() => {
    try {
      const token = Cookies.get("token");
      const res = axios.post("", { token: token });

      setTotalStoreInfo(res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const editTotalStoreInfo =  async() => {    
    if(!(storeInfo.confirmStoreInfo && ownerInfo.confirmOwnerInfo)) {
      return alert("필수정보가 입력되지 않거나 인증이 되지 않았습니다.")
    }
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
            <EditStoreInfo onChange={setStoreInfo} info={totalStoreInfo} />
            <InputOwnerInfo onChange={setOwnerInfo} info={totalStoreInfo} />
          </div>
          <div>
            <InputStoreIssue onChange={setStoreIssue} info={totalStoreInfo} />
          </div>
          <Button onClick={editTotalStoreInfo}>회원가입</Button>
        </form>
      </Wrapper>
    </div>
  );
}

export default StoreInfo;
