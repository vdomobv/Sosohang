import axios from "axios";

export const getDibData = async (userSeq) => {
    try {
      const response = await axios.get(
        `http://j9c109.p.ssafy.io:8081/api/v1/dib/${userSeq}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

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
            `http://j9c109.p.ssafy.io:8081/api/v1/dib/add?memberId=${memberSeq}&storeSeq=${storeSeq}`
        );
    } catch (error) {
        console.error("Error fetching store data:", error);
    }
}