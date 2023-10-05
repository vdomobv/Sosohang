import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";
import Header from "../../components/Header";
import EditStoreInfo from "../../components/EditStoreInfo";
import EditStoreIssue from "../../components/EditStoreIssue";
import FileUpload from "../../components/FileUpload";

function StoreInfo() {
  const navigate = useNavigate();

  // const tokenCookie = Cookies.get("jwtToken");
  // console.log(tokenCookie);
  // useEffect(() => {
  //   if (tokenCookie === undefined) return navigate("/")
  // }, [tokenCookie])

  const [storeKeywords, setStoreKeywords] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeEditInfo, setStoreEditInfo] = useState({});
  const [storeIssue, setStoreIssue] = useState({});
  const [storeEditIssue, setStoreEditIssue] = useState({});
  const [storeImage, setStoreImage] = useState("");
  const [storeEditImage, setStoreEditImage] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/store/info")
      .then(async (res) => {
        await axios
          .get(`/api/v1/store/keywordlist/${res.data.store.storeSeq}`)
          .then((res) => {
            res.data.forEach((ele) => {
              storeKeywords.push(ele.keywordSeq);
            });
          })
          .catch((err) => {
            console.error(err);
          });
        setStoreInfo({
          storeName: res.data.store.storeName,
          storeRegNum: res.data.registartionNumber,
          storeAddress: res.data.store.storeLocation,
          mainAddress: res.data.store.storeLocation.split("  ")[0],
          extraAddress: res.data.store.storeLocation.split("  ")[1],
          storeCategory: res.data.store.category.categorySeq,
          storeLatitude: res.data.store.storeLatitude,
          storeLongitude: res.data.store.storeLongitude,
          storeKeywords: storeKeywords,
        });
        setStoreIssue({
          storeCallNum: res.data.store.storeTell,
          storeParkinglot: res.data.store.storeParkinglot,
          storeWorkDay: res.data.store.storeWorkhour,
          storeHoliday: res.data.store.storeHoliday,
          storeExtraInfo: res.data.store.storeExtraInfo,
          storeUrl: res.data.store.storeUrl,
          storeImage: res.data.store.storeImage,
        });
        setStoreImage(res.data.store.storeImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditStoreInfo = async () => {
    if (!storeEditInfo.confirmStoreInfo) {
      return alert("필수정보가 입력되지 않거나 인증이 되지 않았습니다.");
    }

    await axios
      .put("/api/v1/store/update", {
        storeName: storeEditInfo.storeName,
        registrationNumber: storeEditInfo.storeRegNum,
        storeLocation: storeEditInfo.storeAddress,
        categorySeq: storeEditInfo.storeCategory,
        storeLatitude: storeEditInfo.storeLatitude,
        storeLongitude: storeEditInfo.storeLongitude,
        storeTell: storeEditIssue.storeCallNum,
        storeParkinglot: storeEditIssue.storeParkinglot,
        storeWorkhour: storeEditIssue.storeWorkDay,
        storeHoliday: storeEditIssue.storeHoliday,
        storeExtraInfo: storeEditIssue.storeExtraInfo,
        selectedKeywordSeqList: storeEditIssue.storeKeywords,
        storeUrl: storeEditIssue.storeUrl,
        storeImage: storeEditImage === "" ? storeImage : storeEditImage,
      })
      .then((res) => {
        console.log(res);
        alert("상점정보가 수정되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <EditStoreInfo onChange={setStoreEditInfo} info={storeInfo} />
        <EditStoreIssue onChange={setStoreEditIssue} info={storeIssue} />
        <div style={{display:"flex", width:"80%", marginLeft: 40}}>
          <FileUpload onChange={setStoreEditImage} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div></div>
          <Button
            style={{
              marginLeft: "100px",
              marginRight: "100px",
              width: "10vw",
              height: "5vh",
            }}
            onClick={handleEditStoreInfo}
          >
            정보수정
          </Button>
          <div></div>
        </div>
      </form>
    </div>
  );
}

export default StoreInfo;
