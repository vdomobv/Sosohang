import styles from "./styles";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";

import CartDummy from "../../Dummys/Cart/CartDummy";

import Checkbox from "expo-checkbox";
import Tabs from "../../Components/Tabs/Tabs";
import CartShop from "../../Components/CartShop/CartShop";
import Title from "../../Components/Title/Title";

const dummy = CartDummy;

export default function Cart({ navigation }) {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(dummy.map(() => checkAll));
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  useEffect(() => {
    setCheckedItems(dummy.map(() => checkAll));
  }, [checkAll]);

  useEffect(() => {
    const allShopsChecked = checkedItems.every((val) => val === true);
    if (allShopsChecked) {
      setCheckAll(true);
    }
  }, [checkedItems]);

  const updateTotalPrice = (priceChange) => {
    setTotalPrice((prevTotal) => prevTotal + priceChange);
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"장바구니"} />
        <View style={styles.cartList}>
          <View style={styles.listHead}>
            <Text>
              {" "}
              <Checkbox
                style={styles.checkbox}
                value={checkAll}
                onValueChange={() => {
                  const newCheckAll = !checkAll;
                  setCheckAll(newCheckAll);
                  if (newCheckAll) {
                    const total = dummy.reduce((acc, shop) => {
                      return (
                        acc +
                        shop.products.reduce((shopAcc, product) => {
                          return shopAcc + product.count * product.price;
                        }, 0)
                      );
                    }, 0);
                    setTotalPrice(total);
                  } else {
                    setTotalPrice(0);
                  }
                }}
                color={checkAll ? "#4630EB" : undefined}
              />{" "}
              전체 선택
            </Text>
            <Text style={styles.delete}>선택 삭제</Text>
          </View>

          <View style={styles.listBody}>
            <ScrollView style={styles.scrollList}>
              {dummy.map((d, index) => {
                return (
                  <CartShop
                    totalPrice={totalPrice}
                    key={index}
                    checked={checkedItems[index]}
                    data={d}
                    updateTotalPrice={updateTotalPrice}
                    onCheckChange={(checked) => {
                      const newCheckedItems = [...checkedItems];
                      newCheckedItems[index] = checked;
                      setCheckedItems(newCheckedItems);
                    }}
                    setSelectedProducts={setSelectedProducts}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.total}>
          <View style={styles.price}>
            <Text style={styles.priceText}> 총 결제 금액</Text>
            <Text style={styles.priceText}>{totalPrice} 원</Text>
          </View>
          <TouchableOpacity
            style={styles.okay}
            onPress={() => {
              if (selectedProducts.size) {
                navigation.navigate("MakeCard", {
                  selectedProducts: selectedProducts,
                });
              } else {
                Alert.alert("선물을 선택해주세요.");
              }
            }}
          >
            <Text style={[styles.priceText, { color: "white" }]}>선물하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
