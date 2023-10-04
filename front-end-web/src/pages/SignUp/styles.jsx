import styled from "styled-components";

const Wrapper = styled.div`

/* 회원가입 양식 전체 CSS */
form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  /* margin-bottom: 50px; */

}

/* 필수정보 입력란 CSS */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  height: 500px;

}

/* 상점정보, 사장님정보 입력란 CSS */
.essentialInputBox {
  background-color: lightgray;
  padding: 10px;
  border-radius: 5%;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
}

.below {
}

/* 상점부가정보 CSS */
.optionalInputBox {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

/* 경고메세지 CSS */
.waringMessage {
  height: 24px;
  margin: none;
  display: inline-block;
  color: red;
}

*:focus {
  outline: none;
  box-shadow: none;
}

.modalBox {
  top: 15%;
}

.comboBox{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 150px;
}

// 이미지 업로드 버튼
.filebox label {
  display: inline-block;
  padding: .5em .75em;
  color: #999;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: .25em;
}

.filebox input[type="file"] {  /* 파일 필드 숨기기 */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
}
`;

export default Wrapper;
