import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/Header";
import EditStoreInfo from "../../components/EditStoreInfo";
import EditOwnerInfo from "../../components/EditOwnerInfo";
import EditStoreIssue from "../../components/EditStoreIssue";
import FileUpload from "../../components/FileUpload";

function StoreInfo() {
  const [storeKeywords, setStoreKeywords] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeIssue, setStoreIssue] = useState({});
  const [storeUrl, setStoreUrl] = useState("");

  /*
  {
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
        storeUrl: storeUrl,
      }

      {
  // "categorySeq": 0,
  "selectedKeywordSeqList": [
    0
  ],
  // "storeName": "string",
  // "storeLocation": "string",
  // "storeTell": "string",
  // "storeParkinglot": "string",
  // "storeWorkhour": "string",
  // "storeHoliday": "string",
  // "storeExtraInfo": "string",
  "storeUrl": "string",
  "storeImage": "string",
  // "storeLatitude": 0,
  // "storeLongitude": 0
}
   */

  useEffect(() => {
    axios
      .get("/api/v1/store/info")
      .then(async (res) => {
        await axios
          .get(`/api/v1/store/keywordlist/${res.data.store.storeSeq}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          })
        console.log("ehlsi?")
        setStoreInfo({
          storeName: res.data.store.storeName,
          storeRegNum: res.data.registartionNumber,
          storeAddress: res.data.store.storeLocation,
          storeCategory: res.data.store.category.categorySeq,
          storeLatitude: res.data.store.storeLatitude,
          storeLongitude: res.data.store.storeLongitude,
        });
        setStoreIssue({
          storeCallNum: res.data.store.storeTell,
          storeParkinglot: res.data.store.storeParkinglot,
          storeWorkDay: res.data.store.storeWorkhour,
          storeHoliday: res.data.store.storeHoliday,
          storeExtraInfo: res.data.store.storeExtraInfo,
        });
        setStoreUrl(res.data.store.storeUrl)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <h1>상점정보</h1>
      <form>
        <div>
          <EditStoreInfo />
          <EditOwnerInfo />
        </div>
        <div>
          <EditStoreIssue />
          <FileUpload onChange={setStoreUrl} />
        </div>
        <Button>정보수정</Button>
      </form>
    </div>
  );
}

export default StoreInfo;
