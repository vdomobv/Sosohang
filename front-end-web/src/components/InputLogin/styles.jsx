import styled from "styled-components";

const Wrapper = styled.div`

justify-content: center;
align-items: center;
margin : auto;
width : 500px;
height : 500px;
display: flex;

.title{
  font-weight : bold;
  text-align : left;
  margin-bottom : 60px;
}
  
  .container{
  box-shadow: 3px 3px 10px 1px lightgrey;
  padding: 15%;
  border-radius : 10%;
  align-content : center;
  justify-content : center;
  align-content : center;
  }

  .inputGroup {
    height: 45px;
  }

  .formControl {
    border-radius: 10px;
    height: 40px;
  }

  .labelGroup{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  a.label {
    text-decoration: none;
  }

  .button {
    width: 100%;
    border: none;
    margin-top : 12px;
    padding: 10px;
    background-color: #528DD9;
  }

`;

export default Wrapper;