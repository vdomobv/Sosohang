import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

function ModalStoreRegNum(props) {
  const { regNum, setIsOpenRegNum } = props;
  const [openDate, setOpenDate] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const confirmRegNum = () => {
    axios
      .post(
        "https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=ULFR0UF6ByTGjclsNKrqQLC0L3GItE%2FRZev%2FKQ%2FE5A0YMnGuDqdYpi00CYrvWXVPxz8hxJq4h9M92hUvCUAKhQ%3D%3D",
        {
          businesses: [
            {
              b_no: regNum,
              start_dt: openDate,
              p_nm: ownerName,
            },
          ],
        }
      )
      .then((res) => {
        // if(res.data.data[0].valid === "02") {
        //   console.log("존재하지 않는 사업자입니다. 입력하신정보를 확인하세요");
        // } else {
        //   if(res.data.data[0].status.end_dt !== "") {
        //     console.log("폐업한 사업자입니다.")
        //   }
        // }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


    // console.log(regNum, openDate, ownerName);
    // setIsOpenRegNum(false);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute" }}>
      <Modal.Dialog className="modalBox">
        <Modal.Header closeButton onClick={() => setIsOpenRegNum(false)}>
          <Modal.Title>사업자 등록 조회</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="date"
              placeholder="개업일자"
              onChange={(e) => setOpenDate(e.target.value.replace(/-/g, ""))}
            />
            <Form.Control
              placeholder="대표자명"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmRegNum}>
            인증
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalStoreRegNum;
