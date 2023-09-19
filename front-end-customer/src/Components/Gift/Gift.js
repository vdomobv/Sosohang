import styles from "./styles";
import { View, Text, Image } from "react-native";

import CustomButton from "../../Components/CustomButton/CustomButton";

export default function Gift({ navigation, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.person}>
          {data["from"] ? " from. " + data.from : " to. " + data.to}{" "}
        </Text>
        <Text style={styles.date}>{data.createdAt}</Text>
      </View>
      <View style={styles.body}>
        <Image style={styles.image} source={data.image} />
        <View style={styles.contents}>
          <Text style={styles.shopName}>{data.shopname}</Text>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>
            {data["from"] ? "남은 금액 : " + data.price : data.price} 원
          </Text>
        </View>
      </View>
      {data.to ? (
        <View style={styles.buttons}>
          <CustomButton content={"취소하기"} bgcolor="#FFBF46" />
          <CustomButton content={"재주문"} />
        </View>
      ) : undefined}
    </View>
  );
}
