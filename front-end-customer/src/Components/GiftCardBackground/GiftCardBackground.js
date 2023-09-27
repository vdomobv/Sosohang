import styles from "./styles";
import { View, Image, Text } from "react-native";

export default function GiftCardBackground({ content }) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}> */}
      <Image source={require("assets/images/greencard.png")} 
      style={[styles.image, { resizeMode: 'contain' }]} 
      />
      {/* </View> */}
      {/* 첫 번째 박스 */}
      <View style={[styles.innerBox, styles.innerText, { marginTop: 30, height: 150 }]}>
        <Text>{content.cardImage}</Text>
      </View>
      {/* 두 번째 박스 */}
      <View style={[styles.innerBox, styles.innerText, { marginTop: 200, height: 150 }]}>
        <Text>{content.cardMessage}</Text>
      </View>
    </View>
  );
}
