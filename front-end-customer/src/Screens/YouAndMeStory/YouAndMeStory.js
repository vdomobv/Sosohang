import styles from "./styles";
import { ScrollView, View, Text, Image } from "react-native";

// import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";
import { getYouAndMeStory } from "../../Utils/YouAndMeStoryAPI";
import { useEffect, useState } from "react";
import Give from "../../Components/YouAndMeStory/Give.js";
import Receive from "../../Components/YouAndMeStory/Receive";

// import GiftCardDummy from "../../Dummys/GiftCard/GiftCardDummy";
// const giftCardData = GiftCardDummy[0];
// const giftSendData = GiftCardDummy[1];

// from/to cardImage message shopname name

export default function YouAndMeStory({ route, navigation }) {
  const yourSeq = route.params.memberSeq;
  const mySeq = route.params.tempUser;
  const [sosoticonList, setSosoticonList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getYouAndMeStory(mySeq, yourSeq);
      setSosoticonList(result);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  return (
    <>
      <ScrollView>
        {sosoticonList.map((sosoticon) =>
          sosoticon.member.memberSeq === mySeq ? (
            <Give key={sosoticon.sosoticonSeq} data={sosoticon} />
          ) : (
            <Receive key={sosoticon.sosoticonSeq} data={sosoticon} />
          )
        )}
      </ScrollView>

      <Tabs navigation={navigation} />
    </>
  );
}
