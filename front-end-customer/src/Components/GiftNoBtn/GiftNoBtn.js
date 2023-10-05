import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function Gift({ data, onPress }) {
  const navigation = useNavigation();
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
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
            <Text style={styles.shopName}>{data.storeName}</Text>
              {/* <Text style={styles.shopName}>{data[0].storeName}</Text> */}
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.price}>
                {data["from"]
                  ? "남은 금액 : " + numberWithCommas(data.currentPrice)
                  : numberWithCommas(data.totalPrice)}{" "}
                원
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
