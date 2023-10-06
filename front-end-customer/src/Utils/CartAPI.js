import axios from "axios"

export const getCartData = async (memberSeq) => {
    try {
        const response = await axios.get(
            `https://j9c109.p.ssafy.io/api/v1/cart/${memberSeq}`
        );

        return response.data;
    } catch (error) {
        // console.error("Error fetching store data in getCartData:", error);
    }
};

export const deleteCartData = async (memberSeq, productSeq) => {
    try {
        const response = await axios.delete(
            `https://j9c109.p.ssafy.io/api/v1/cart/delete?memberSeq=${memberSeq}&productSeq=${productSeq}`
        );
    } catch (error) {
        // console.error("Error fetching store data in deleteCartData:", error);
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
            `https://j9c109.p.ssafy.io/api/v1/cart/update`,
            requestBody
        );

    } catch (error) {
        // console.error("Error fetching store data in updateQuantity:", error);
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
            `https://j9c109.p.ssafy.io/api/v1/cart`,
            requestBody
        );

    } catch (error) {
        // console.error("Error fetching store data in addToCart:", error);
    }
};

