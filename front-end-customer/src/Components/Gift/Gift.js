import styles from "./styles";
import { View, Text, Image } from "react-native";

export default function Gift({ navigation, data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>from. {data.from} </Text>
      <View style={styles.body}>
        <Image style={styles.image} source={data.image} />
        <View style={styles.contents}>
          <Text style={styles.shopName}>{data.shopname}</Text>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>남은 금액 : {data.price} 원</Text>
        </View>
      </View>
      <Text style={styles.date}>{data.createdAt}</Text>
    </View>
  );
}
