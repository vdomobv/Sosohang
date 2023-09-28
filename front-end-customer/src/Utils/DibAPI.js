import axios from "axios";

export const getDibData = async (memberSeq) => {
    try {
        const response = await axios.get(
            `http://j9c109.p.ssafy.io:8081/api/v1/dib/${memberSeq}`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};

export const getStoreDibData = async (memberSeq, storeSeq) => {
    try {
        const response = await axios.get(
            `http://j9c109.p.ssafy.io:8081/api/v1/dib/${memberSeq}/${storeSeq}`
        );

        if (response.data.length > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error("Error fetching store data:", error);
    }
}

export const removeDib = async (memberSeq, storeSeq) => {
    try {
        const response = await axios.delete(
            `http://j9c109.p.ssafy.io:8081/api/v1/dib/remove?memberSeq=${memberSeq}&storeSeq=${storeSeq}`
        );
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
};

export const addDib = async (memberSeq, storeSeq) => {
    try {
        const response = await axios.post(
            `http://j9c109.p.ssafy.io:8081/api/v1/dib/add?memberId=${memberSeq}&storeId=${storeSeq}`
        );
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
}