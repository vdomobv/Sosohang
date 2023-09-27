import styles from "./styles";
import { View, Image, Text } from "react-native";

export default function GiftCardBackground({ content }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("assets/images/greencard_qr.png")}
        style={styles.image}
      />
      {/* 이미지 카드 박스 */}
      <View style={[
        styles.innerBox, {
          marginTop: '4%',
          height: '35%',
        }]}>
        <Image
          source={content.cardImage}
          style={{ width: '135%', height: '120%' }}
        />
      </View>
      {/* 메시지 박스 */}
      <View style={[
        styles.innerBox, {
          marginTop: '64%', height: '8%',
          // marginTop: 240, height: 110,
          backgroundColor: '#F8F2CA',

        }]}>
        <Text>{content.cardMessage}</Text>
      </View>
      {/* QR코드 이미지 */}
      <View style={[
        styles.innerBox, {
          marginTop: '115%', height: '18%',
          // marginTop: 440, height: 240,
        }]}>
        <Image
          source={{ uri: content.cardQr }}
          style={{ width: '100%', height: '120%' }}
        />
      </View>
    </View>
  );
}
