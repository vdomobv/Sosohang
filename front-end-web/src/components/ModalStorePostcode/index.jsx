import React from "react";
import { Modal } from "react-bootstrap";
import DaumPostcode from "react-daum-postcode";

function ModalStorePostcode(props) {
  const { show, onHide, onCompletePost, setIsOpenPost } = props;
  // 찾은 주소 입력하기
  const onComplete = (data) => {
    onCompletePost(data);
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header
        closeButton
        style={{ outline: "none" }}
        onClick={() => setIsOpenPost(false)}>
        우편번호 찾기
      </Modal.Header>
      <Modal.Body>
        <div>
          <DaumPostcode onComplete={onComplete} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalStorePostcode;
