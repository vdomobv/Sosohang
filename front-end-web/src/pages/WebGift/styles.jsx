import styled from "styled-components";

const Wrapper = styled.div`

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.logo {
    width: 300px;
    margin: 5px;
}

.imgCenter {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.cardBackground {
    z-index: 10;
}

.cardImage {
    z-index: 20;
    position: absolute;
    top: 260px;
}

.messageBox {
    z-index: 20;
    position: absolute;
    top: 750px;
    background-color: #F8F2CA;
    width: 700px;
    height: 300px;
    border-radius: 30px;
    text-align: center;
}

p {
    font-size: 40px;
    margin: 60px;
}

.qrImage {
    z-index: 20;
    position: absolute;
    bottom: 200px;
}
`;

export default Wrapper;
