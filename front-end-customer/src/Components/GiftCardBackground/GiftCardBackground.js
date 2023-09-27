import styles from "./styles";
import { View, Image, Text } from "react-native";

export default function GiftCardBackground({ content }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("assets/images/greencard.png")}
        style={styles.image}
      />
      {/* 이미지 카드 박스 */}
      <View style={[
        styles.innerBox, {
          marginTop: '10%',
          height: '38%',
        }]}>
        <Image
          source={content.cardImage}
          style={{ width: '135%', height: '150%' }}
        />
      </View>
      {/* 메시지 박스 */}
      <View style={[
        styles.innerBox, {
          marginTop: 230, height: 110
        }]}>
        <Text>{content.cardMessage}</Text>
      </View>
    </View>
  );
}
