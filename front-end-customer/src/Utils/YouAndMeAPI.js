import axios from "axios";

export const getYouList = (memberSeq) => {
  return axios
        .get(`/api/app/users/gift-cards/youandme?memberSeq=${memberSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            // console.error(error);
        });
};