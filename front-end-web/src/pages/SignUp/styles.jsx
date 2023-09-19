import styled from "styled-components";

const Wrapper = styled.div`

/* 회원가입 양식 전체 CSS */
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 필수정보 입력란 CSS */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
  height: 500px;
}

.essentialInputBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
  
`;

export default Wrapper;
