import axios from "axios";

export const getPurchaseHistory = (memberSeq) => {
  return axios
        .get(`http://localhost:8081/api/v1/total-order-detail/${memberSeq}`)
        .then((response) => {
          console.log(response.data);
          return response.data;   
        })
        .catch((error) => {
            console.error(error);
        });
};