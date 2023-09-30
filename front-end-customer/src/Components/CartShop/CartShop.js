import styles from "./styles";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

import CartProduct from "../CartProduct/CartProduct";

export default function CartShop({
  data,
  checked,
  onShopCheckChange,
  checkedProduct,
  setCheckedProduct,
  storeSeq,
  fetchData,
  tempUser
}) {
  if (checkedProduct !== undefined) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.shopName}>
            <Checkbox
              style={styles.checkBox}
              value={checked}
              onValueChange={onShopCheckChange}
            />{" "}
            {data[0].product.store.storeName} <Ionicons style={styles.shopName} name="home-outline" />
          </Text>
          <View style={styles.products}>
            {data.map((d, index) => {
              if (checkedProduct[storeSeq] !== undefined) {
                return (
                  <CartProduct
                    tempUser={tempUser}
                    key={d.cartSeq}
                    data={d}
                    checked={checkedProduct[storeSeq][index]}
                    onProductCheckChange={() => {
                      const newValue = !checkedProduct[storeSeq][index]
                      const newCheckedProduct = { ...checkedProduct }
                      newCheckedProduct[storeSeq][index] = newValue;
                      setCheckedProduct(newCheckedProduct)
                    }}
                    fetchData={fetchData}
                  />
                );
              }
            })}
          </View>
        </View>
      </View>
    );
  }

}
