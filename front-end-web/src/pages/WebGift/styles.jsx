// styles.jsx 파일

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh; /* 화면 높이를 100%로 설정하여 세로 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    text-align: center;
  }

  .cardBackground img,
  .cardImage img,
  .qrImage img {
    width: 50%; /* 이미지의 너비를 50%로 설정하거나 필요에 따라 조절할 수 있습니다 */
    border-radius: 10px; /* 이미지의 모서리를 둥글게 만들기 위한 스타일 */
    margin: auto; /* 이미지를 수평 가운데 정렬 */
    display: block; /* 인라인 요소를 블록 요소로 변환하여 가운데 정렬을 적용할 수 있습니다 */
  }

  .messageBox {
    margin-top: 20px;
    width: '100px';
}

.message {
    background-color: #F8F2CA;
  }
`;

export default Wrapper;
