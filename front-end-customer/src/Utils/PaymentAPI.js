import axios from "axios";

export const makeOrder = async (memberSeq, productList) => {
    try {
        const requestBody = {
            'memberSeq': memberSeq,
            'takerName' : "되라",
            'orderItems': productList
        }
        const response = await axios.post(
            `/api/v1/total-order/create`,
            requestBody
        );
        return response.data;
    } catch (error) {
        // console.error("Error fetching store data in makeOrder:", error);
    }
};

export const makeSosoticon = async (requestBody) => {
    console.log("bovdy", requestBody);
    try {
        const response = await axios.post(
            'api/app/users/gift-cards/generateQR',
            // `http://localhost:8081/api/app/users/gift-cards/generateQR`,
            requestBody
        );
        // console.log(response, "hhh")
        return response.data;
    } catch (error) {
        // console.error("Error fetching store data in makesosoticon:", error);
    }
};
