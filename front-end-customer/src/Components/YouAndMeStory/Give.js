import { View, Text, Image } from "react-native";
import styles from "../../Screens/YouAndMeStory/styles"
export default function Give(props) {
  const giftSendData = props.data;
  return (
    <>
      {/* 보낸 선물 */}
      <View style={styles.dayLine}>
        <View style={styles.horizontalLine} />
        {/* 선물 날짜 */}
        <Text style={styles.day}>{giftSendData.createdAt.slice(0, 10)}</Text>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.top}>
        {/* 선물 시간 */}
        {/* <Text style={styles.time}>{giftSendData.createdAt}</Text> */}
        <View style={styles.you}>
          <Text style={[styles.name, { marginRight: 15 }]}>나</Text>
          <Image
            style={styles.profileImage}
            source={require("assets/images/bread.png")}
          />
        </View>
      </View>
      <Text style={[styles.toolTip, { marginLeft: 100 }]}>
        선물과 메세지를 보냈어요! 💌
      </Text>
      {/* 선물 포장지 */}
      <View style={styles.cardImage}>
        <Image
          source={require("assets/images/greencard.png")}
          style={{ width: "70%", height: 400 }}
        />
        <View style={[styles.innerBox, { top: 20, height: 150 }]}>
          {/* 선물 카드 */}
          <Image
            source={{uri: giftSendData.sosoticonImage}}
            style={{ position: "absolute", width: 250, height: 150 }}
          />
        </View>
        {/* 메시지 내용 */}
        <Text style={[styles.innerBox, styles.innerInput]}>
          {giftSendData.sosoticonText}
        </Text>
      </View>
    </>
  );
}
