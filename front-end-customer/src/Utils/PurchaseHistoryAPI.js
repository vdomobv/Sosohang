import axios from "axios";

export const getPurchaseHistory = (memberSeq) => {
  return axios
        .get(`/api/v1/total-order-detail/${memberSeq}`)
        .then((response) => {
          return response.data;   
        })
        .catch((error) => {
            // console.error(error);
        });
};