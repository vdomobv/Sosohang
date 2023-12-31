import styles from "./styles";
import { View, Text, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { updateQuantity } from "../../Utils/CartAPI";

export default function CartProduct({
  data,
  checked,
  onProductCheckChange,
  callbackUpdateQuantity,
  tempUser,
  fetchData,
}) {
  const fetchUpdateQuantity = async (productSeq, quantity) => {
    await updateQuantity(tempUser, productSeq, quantity);
    fetchData();
  };
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        value={checked}
        onValueChange={onProductCheckChange}
      />
      <Image
        style={{ flex: 2, marginHorizontal: 10, borderRadius: 10 }}
        src={data.product.productImage}
      ></Image>
      <View style={{ flex: 4 }}>
        <Text style={[styles.textBold, { marginTop: 5 }]}>
          {data.product.productName}
        </Text>
        <Text style={styles.price}>
          {numberWithCommas(data.product.productPrice * (1 - data.product.productDcrate))} 원
        </Text>

        <View style={styles.counter}>
          <Ionicons
            name="remove-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
              if (data.quantity > 1) {
                fetchUpdateQuantity(data.product.productSeq, -1);
              } else {
                Alert.alert("수량은 한개 미만으로 설정할 수 없습니다.");
              }
            }}
          />
          <Text style={styles.count}>{data.quantity}</Text>
          <Ionicons
            name="add-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
              fetchUpdateQuantity(data.product.productSeq, 1);
            }}
          />
        </View>
        <Text
          style={[styles.textBold, { textAlign: "right", marginRight: 10 }]}
        >
          {numberWithCommas(data.quantity * data.product.productPrice * (1 - data.product.productDcrate))} 원
        </Text>
      </View>
    </View>
  );
}
