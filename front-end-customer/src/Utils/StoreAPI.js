import axios from "axios";

export const getStoreData = async (storeSeq) => {
    try {
        const response = await axios.get(
            `https://j9c109.p.ssafy.io/api/v1/store/${storeSeq}`
        );
        return response.data;

    } catch (error) {
        console.error("Error fetching store data in getStoreData:", error);
    }
};

export const getAllStoreData = async () => {
    try {
      const response = await axios.get(
        "https://j9c109.p.ssafy.io/api/v1/store"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

export const getRecentStoreByLocation = async (latitute, longitude) => {
    try {
        const response = await axios.get(
            `https://j9c109.p.ssafy.io/api/v1/store/nearby?latitude=${latitute}&longitude=${longitude}`
        );

        const result = response.data.sort((a, b) => b.storeSeq - a.storeSeq);
        return result;

    } catch (error) {
        console.error("Error fetching store data in getStoreByLocation:", error);
    }
};

export const getStoreByLocation = async (latitute, longitude) => {
    try {
        const response = await axios.get(
            `https://j9c109.p.ssafy.io/api/v1/store/nearby?latitude=${latitute}&longitude=${longitude}`
        );

        return response.data;

    } catch (error) {
        console.error("Error fetching store data in getStoreByLocation:", error);
    }
};

export const getKeywordStoreByLocation = async (latitute, longitude, keywordSeq) => {
    try {
        const response = await axios.get(
            `https://j9c109.p.ssafy.io/api/v1/store/nearby/keyword?latitude=${latitute}&longitude=${longitude}&keywordSeq=${keywordSeq}`
        );

        return response.data;

    } catch (error) {
        console.error("Error fetching store data in getKeywordStoreByLocation:", error);
    }
};

export const getKeywords = async () => {
    try {
        const response = await axios.get(
            `https://j9c109.p.ssafy.io/api/v1/keywords`
        );

        const temp = response.data;
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // swap
            }
        }
        shuffleArray(temp);
        const randomTenItems = response.data.slice(0, 10);
        return randomTenItems;
    } catch (error) {
        console.error("Error fetching store data in getKeywordStoreByLocation:", error);
    }
}
