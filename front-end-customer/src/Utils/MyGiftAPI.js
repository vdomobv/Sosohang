import axios from "axios";

export const getMyGiftList = (memberSeq) => {
  return axios
        .get(`http://j9c109.p.ssafy.io:8081/api/app/users/gift-cards/received?memberSeq=${memberSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            console.error(error);
        });
};