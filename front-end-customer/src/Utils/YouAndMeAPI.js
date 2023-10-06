import axios from "axios";

export const getYouList = (memberSeq) => {
  return axios
        .get(`https://j9c109.p.ssafy.io/api/app/users/gift-cards/youandme?memberSeq=${memberSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            // console.error(error);
        });
};