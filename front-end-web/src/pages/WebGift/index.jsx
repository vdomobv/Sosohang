import React from "react";
import Wrapper from "./styles";

const qrImage = "https://sosoticon.s3.ap-northeast-2.amazonaws.com/QRCode_3de13672-94cf-4aee-8e34-2f1cfc94cab8.png"

function WebGift() {
  return (
    <>
      <Wrapper>
        <div className="container">
          <div>
            <img src="/assets/soso_logo_line.png" alt="sosohang_logo" 
            style={{ width: '50%', marginBottom: '10px' }}
            />
              <div className="cardBackground">
                {/* 소소티콘 배경 이미지 */}
                <img src="/assets/greencard_qr.png" alt="CardBackground"
                style={{ width: '70%' }}
                />
              </div>
              <div className="cardImage">
                {/* 카드 이미지 */}
                <img src="/assets/thx.png" alt="ThankYouCard" 
                style={{ width: '60%', borderRadius: 10 }}
                />
              </div>
              <div className="messageBox">
              <div className="message">
                {/* 메시지 */}
                <p>메시지 박스</p>
              </div>
              </div>
              <div className="qrImage">
                {/* QR 이미지 */}
                <img src={qrImage} alt="QR_code"
                style={{ width: '60%' }}
                />
              </div>
            </div>
        </div>
      </Wrapper>
    </>
  );
}

export default WebGift;