import axios from "axios";

export const getReviewKeywordListByCategorySeq = async (categorySeq) => {
  try {
    const response = await axios.get(`https://j9c109.p.ssafy.io/api/v1/review-keyword/${categorySeq}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createReview = async (storeSeq, selectedKeywords) => {

  const selectedKeywordsToQueryString = (selectedKeywords) => {
    return selectedKeywords.map(seq => `selectedKeywordSeqList=${seq}`).join('&');
  }
  const query = selectedKeywordsToQueryString(selectedKeywords);
  
  try {
    const response = await axios.post(`https://j9c109.p.ssafy.io/api/v1/review/create?storeSeq=${storeSeq}&${query}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
