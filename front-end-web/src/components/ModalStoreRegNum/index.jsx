import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

function ModalStoreRegNum(props) {
  const { regNum, setIsOpenRegNum } = props;
  const [openDate, setOpenDate] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const confirmRegNum = () => {
    // axios
    //   .get()
    //   .then()
    //   .catch()
    console.log(regNum, openDate, ownerName);
    setIsOpenRegNum(false);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute" }}>
      <Modal.Dialog className="modalBox">
        <Modal.Header closeButton>
          <Modal.Title>사업자 등록 조회</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="date"
              placeholder="개업일자"
              onChange={(e) => setOpenDate(e.target.value)}
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
