import styles from "./styles";
import { View, Text, Image } from "react-native";


export default function YouList({ props }) {

  return (
    <View style={styles.container}>

      <Text>YouList 컴포넌트</Text>
      <View style={styles.youContainer}>
        {/* 스타일로 이미지 동그랗게 만들기 */}
        <Image
          style={styles.image}
          source={require('assets/images/bread.png')}
        />

        <Text style={styles.name}>사람 이름</Text>
      </View>
      {/* <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={props.image}
        />
      </View>
      <Text>{props.name}</Text> */}
    </View>
  );
}
