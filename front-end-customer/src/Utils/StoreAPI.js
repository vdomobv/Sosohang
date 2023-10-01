import axios from "axios";

export const getStoreData = async (storeSeq) => {
    try {
        const response = await axios.get(
            `http://j9c109.p.ssafy.io:8081/api/v1/store/${storeSeq}`
        );
        return response.data;

    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};