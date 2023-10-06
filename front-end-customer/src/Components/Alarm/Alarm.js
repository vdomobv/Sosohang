import styles from "./styles";
import { View, Text, Image } from "react-native";

export default function Alarm({ data }) {
  if (data.type === 0) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("assets/images/gift.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>From. {data.from}</Text>
          <Text style={styles.text}>
            {data.from}님이 {data.shopname} 가게의 {data.product} 쿠폰을
            선물했어요!
          </Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
      </View>
    );
  } else if (data.type === 1) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("assets/images/gift.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>From. {data.shopname}</Text>
          <Text style={styles.text}>
            {data.shopname} 가게의 {data.product} 사용기한이 일주일 남았어요!
          </Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
      </View>
    );
  } else if (data.type === 2) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("assets/images/gift.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>From. {data.shopname}</Text>
          <Text style={styles.text}>
            {data.shopname} 가게의 {data.product} 쿠폰 사용기한이 오늘까지에요!
          </Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
      </View>
    );
  } else if (data.type === 3) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("assets/images/promotion.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>From. 소소행</Text>
          <Text style={styles.text}>{data.notification}</Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
      </View>
    );
  }
}
