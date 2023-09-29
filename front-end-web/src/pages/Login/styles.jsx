import styled from "styled-components";

const Wrapper = styled.div`
display: flex;


.loginImage {
  width: 300px;
  transform: translate(100%, 80%);
}

.login {
    background-color: rgba(255, 255, 255, 0.5); 
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    right: 30%; 
    transform: translate(50%, -50%);
    font-family: 'Pretendard-Regular';
  }
  
@media screen and (max-width: 1020px) {
    .login {
      right: 50%;
    }
  }
`;

export default Wrapper;
