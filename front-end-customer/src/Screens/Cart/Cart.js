import styles from "./styles";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";

import CartDummy from "../../Dummys/Cart/CartDummy";

import Checkbox from "expo-checkbox";
import Tabs from "../../Components/Tabs/Tabs";
import CartShop from "../../Components/CartShop/CartShop";
import Title from "../../Components/Title/Title";

import { getCartData } from "../../Utils/CartAPI";
const dummy = CartDummy;

export default function Cart({ navigation }) {
  const tempUser = 1;
  const [checkAll, setCheckAll] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState();
  const [checkedShop, setCheckedShop] = useState();
  const [checkedItems, setCheckedItems] = useState(dummy.map(() => checkAll));
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [cartData, setCartData] = useState([])
  const [groupedData, setGroupedData] = useState({})

  // 장바구니 데이터 조회
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCartData(tempUser);
      // console.log(result);
      setCartData(result);
    };

    fetchData();
  }, []);

  // 상점별로 그룹화
  useEffect(() => {
    if (Array.isArray(cartData)) {
      const temp = cartData.reduce((acc, item) => {
        const storeSeq = item.product.store.storeSeq;
        if (!acc[storeSeq]) {
          acc[storeSeq] = [];
        }
        acc[storeSeq].push(item);
        return acc;
      }, {});
      setGroupedData(temp);
    }
  }, [cartData]);

  // 체크 항목 생성
  useEffect(() => {
    const newCheckedShop = {};
    const newCheckedProduct = {};

    Object.keys(groupedData).forEach(key => {
      newCheckedShop[key] = false;
      newCheckedProduct[key] = groupedData[key].map(() => false);
    });

    setCheckedShop(newCheckedShop);
    setCheckedProduct(newCheckedProduct);

    console.log('check test: ', newCheckedShop);
  }, [groupedData]);

  // 전체 선택
  useEffect(() => {
    setCheckedItems(dummy.map(() => checkAll));
  }, [checkAll]);

  // 모두 선택했을 때, 전체 선택도 체크되도록
  useEffect(() => {
    const allShopsChecked = checkedItems.every((val) => val === true);
    if (allShopsChecked) {
      setCheckAll(true);
    }
  }, [checkedItems]);

  // 총 결제 금액 변경
  const updateTotalPrice = (priceChange) => {
    setTotalPrice((prevTotal) => prevTotal + priceChange);
  };

  const renderGroupedProducts = () => {
    console.log(groupedData)
    return Object.keys(groupedData).map((storeSeq) => {
      const storeCart = groupedData[storeSeq];
      console.log('test : ', storeCart[0])
      return (
        <CartShop
          key={storeSeq}
          data={storeCart}

          checkedShop={checkedShop}
          checked={checkedShop[storeSeq]}
          checkedProduct={checkedProduct[storeSeq]}
      
          // totalPrice={productPrice * storeCart.quantity}
          updateTotalPrice={updateTotalPrice}
          onCheckChange={(storeSeq, checked) => {
            const newCheckedProduct = [...checkedProduct];
            newCheckedProduct[storeSeq][cartSeq] = checked;
            setCheckedProduct(newCheckedProduct);
          }}
          setSelectedProducts={setSelectedProducts}
        />
      )

    })
  }

  return (
    <>
      <View style={styles.container}>
        <Title title={"장바구니"} />
        <View style={styles.cartList}>
          <View style={styles.listHead}>
            <Text>
              {" "}
              <Checkbox
                style={styles.checkBox}
                value={checkAll}
                onValueChange={() => {
                  const newCheckAll = !checkAll;
                  setCheckAll(newCheckAll);
                  if (newCheckAll) {
                    const total = groupedData.reduce((acc, store) => {
                      return (
                        acc +
                        store.products.reduce((storeAcc, product) => {
                          return storeAcc + store.quantity * product.productPrice;
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
              {renderGroupedProducts()}

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
              // selectedProducts를 배열로 변환하여 전달
              const selectedProductsArray = Array.from(selectedProducts);
              if (selectedProductsArray.length) {
                navigation.navigate("MakeCard", {
                  selectedProducts: selectedProductsArray,
                  totalPrice: totalPrice,
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
