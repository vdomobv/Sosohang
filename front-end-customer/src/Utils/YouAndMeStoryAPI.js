import axios from "axios";

export const getYouAndMeStory = (mySeq, yourSeq) => {
  return axios
        .get(`/api/app/users/gift-cards/youandme/${mySeq}/${yourSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            // console.error(error);
        });
};