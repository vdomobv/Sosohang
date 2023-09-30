import axios from "axios"

export const getCartData = async (memberSeq) => {
    try {
        const response = await axios.get(
            `http://j9c109.p.ssafy.io:8081/api/v1/cart/${memberSeq}`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};

export const deleteCartData = async (memberSeq, productSeq) => {
    try {
        const response = await axios.delete(
            `http://j9c109.p.ssafy.io:8081/api/v1/cart/delete?memberSeq=${memberSeq}&productSeq=${productSeq}`
        );
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};

export const updateQuantity = async (memberSeq, productSeq, quantity) => {
    try {
        const requestBody = {
            memberSeq: memberSeq,
            productSeq: productSeq,
            quantity: quantity
        };

        const response = await axios.post(
            `http://j9c109.p.ssafy.io:8081/api/v1/cart/update`,
            requestBody
        );

    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};

export const addToCart = async (memberSeq, productSeq, quantity) => {
    try {
        const requestBody = {
            memberSeq: memberSeq,
            productSeq: productSeq,
            quantity: quantity
        };

        const response = await axios.post(
            `http://j9c109.p.ssafy.io:8081/api/v1/cart`,
            requestBody
        );

    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};

