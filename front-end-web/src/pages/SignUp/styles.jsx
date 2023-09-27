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

/* 상점부가정보 CSS */
.optionalInputBox {
  width: 1000px;
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
`;

export default Wrapper;
