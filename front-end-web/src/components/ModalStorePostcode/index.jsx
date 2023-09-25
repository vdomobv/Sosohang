import React from "react";
import { Modal } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";

function ModalStorePostcode(props) {
  const { onCompletePost } = props;
  // 찾은 주소 입력하기
  const onComplete = (data) => {
    onCompletePost(data);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute" }}>
      <Modal.Dialog className="modalBox">
        <Modal.Header style={{ outline: "none" }}>우편번호 찾기</Modal.Header>

        <Modal.Body>
          <div>
            <DaumPostcode onComplete={onComplete} />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalStorePostcode;
