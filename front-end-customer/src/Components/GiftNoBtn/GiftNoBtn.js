import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GiftNoBtn({ data, onPress }) {
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
              {"from. " + data.sosoticonGiverName}
            </Text>
            <Text style={styles.date}>{data.createdAt}</Text>
          </View>
          <View style={styles.body}>
            <Image style={styles.image} source={{uri : data.store.storeImage}} />
            <View style={styles.contents}>
              <Text style={styles.shopName}>{data.store.storeName}</Text>
              {/* <Text style={styles.shopName}>{data[0].storeName}</Text> */}
              <Text style={styles.price}>
                {"남은 금액 : " + numberWithCommas(data.sosoticonPrice)}원
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
