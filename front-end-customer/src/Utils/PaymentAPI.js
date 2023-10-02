import axios from "axios";

export const makeOrder = async (memberSeq, productList) => {
    try {
        const requestBody = {
            'memberSeq': memberSeq,
            'orderItems': productList
        }
        const response = await axios.post(
            `http://j9c109.p.ssafy.io:8081/api/v1/total-order/create`,
            requestBody
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching store data in makeOrder:", error);
    }
};

export const makeSosoticon = async (requestBody) => {
    try {
        const response = await axios.post(
            `http://j9c109.p.ssafy.io:8081/api/app/users/gift-cards/generateQR`,
            requestBody
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching store data in makesosoticon:", error);
    }
};
