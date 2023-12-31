import axios from "axios";

export const getDibData = async (memberSeq) => {
    try {
        const response = await axios.get(
            `/api/v1/dib/${memberSeq}`
        );

        return response.data;
    } catch (error) {
        // console.error("Error fetching store data in getDibData:", error);
    }
};

export const getStoreDibData = async (memberSeq, storeSeq) => {
    try {
        const response = await axios.get(
            `/api/v1/dib/${memberSeq}/${storeSeq}`
        );

        if (response.data.length > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        // console.error("Error fetching store data in getStoreDibData:", error);
    }
}

export const removeDib = async (memberSeq, storeSeq) => {
    try {
        const response = await axios.delete(
            `/api/v1/dib/remove?memberSeq=${memberSeq}&storeSeq=${storeSeq}`
        );
    } catch (error) {
        // console.error("Error fetching store data in removeDib:", error);
    }
};

export const addDib = async (memberSeq, storeSeq) => {
    try {
        const response = await axios.post(
            `/api/v1/dib/add?memberSeq=${memberSeq}&storeSeq=${storeSeq}`
        );
    } catch (error) {
        // console.error("Error fetching store data in addDib:", error);
    }
}