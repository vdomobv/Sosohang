import axios from "axios";

export const getProduct = async (storeId) => {
    try {
        const response = await axios.get(
            `http://j9c109.p.ssafy.io:8081/api/v1/${storeId}/products`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};