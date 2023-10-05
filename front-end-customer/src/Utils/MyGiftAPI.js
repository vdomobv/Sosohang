import axios from "axios";

export const getMyGiftList = (memberSeq) => {
  return axios
        .get(`https://j9c109.p.ssafy.io/api/app/users/gift-cards/received?memberSeq=${memberSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            console.error(error);
        });
};