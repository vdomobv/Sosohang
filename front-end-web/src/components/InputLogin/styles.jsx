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
  text-align : center;
}
  
  .container{
  box-shadow: 3px 3px 10px 1px lightgrey;
  // padding-top : 10%;
  padding: 15%;
  // padding-bottom : 10%;
  border-radius : 10%;
  align-content : center;
  justify-content : center;
  align-content : center;
  }

  .title {
    // width : 100%;
    margin-bottom : 50px;
  }
  .inputGroup {
    height: 45px;
  }

  .label{
    margin: 5px
  }

  .formControl {
    border-radius: 10px;
    height: 40px;
  }

  .labelGroup{
    display: flex;
    justify-content: space-between;
  }

  .button {
    // width: 475px;
    width: 100%;
    padding: 10px;
    border: none;
    margin-top : 30px
  }

`;

export default Wrapper;