import axios from "axios";

export const makeOrder = async (memberSeq, productList) => {
    try {
        const requestBody = {
            'memberSeq': memberSeq,
            'orderItems': productList
        }
        console.log('요청 데이터 ' , requestBody)
        const response = await axios.post(
            `http://j9c109.p.ssafy.io:8081/api/v1/total-order/create`,
            requestBody
        );
        console.log('성공 :', response)
    } catch (error) {
        console.error("Error fetching store data in makeOrder:", error);
    }
};