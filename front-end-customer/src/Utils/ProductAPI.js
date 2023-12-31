import axios from "axios";

export const getProduct = async (storeId) => {
    try {
        const response = await axios.get(
            `/api/v1/products/${storeId}`
        );
        return response.data;
    } catch (error) {
        // console.error("Error fetching store data:", error);
    }
};