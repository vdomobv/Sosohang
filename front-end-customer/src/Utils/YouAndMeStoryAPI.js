import axios from "axios";

export const getYouAndMeStory = (mySeq, yourSeq) => {
  return axios
        .get(`https://j9c109.p.ssafy.io/api/app/users/gift-cards/youandme/${mySeq}/${yourSeq}`)
        .then((response) => {
          return response.data;     
        })
        .catch((error) => {
            console.error(error);
        });
};