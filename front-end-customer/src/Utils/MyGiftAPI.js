import axios from "axios";

export const getMyGiftList = (memberSeq) => {
  return axios
        .get(`/api/app/users/gift-cards/received?memberSeq=${memberSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            // console.error(error);
        });
};