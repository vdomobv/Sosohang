import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px 10px;
  background-color: white;
  box-shadow: 0 1px 7px -5px black;
  position : sticky;
  z-index: 999999;

  .logo {
    width: 150px;
    margin: 8px;
  }

  .links {
    display: flex;
    margin-right: 20px;
  } 

  a {
    margin: auto 20px;
    text-decoration: none;
    font-size: 18px;
    color: #333333;
  }
  
  .active {
    font-weight: bold;
  }
`;

export default Wrapper;
