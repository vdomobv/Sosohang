import axios from "axios";

export const getPurchaseHistory = (memberSeq) => {
  return axios
        .get(`https://j9c109.p.ssafy.io/api/v1/total-order-detail/${memberSeq}`)
        .then((response) => {
          return response.data;   
        })
        .catch((error) => {
            // console.error(error);
        });
};