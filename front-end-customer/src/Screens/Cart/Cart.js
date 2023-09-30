import styles from "./styles";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";

import Checkbox from "expo-checkbox";
import Tabs from "../../Components/Tabs/Tabs";
import CartShop from "../../Components/CartShop/CartShop";
import Title from "../../Components/Title/Title";

import { getCartData, deleteCartData } from "../../Utils/CartAPI";

export default function Cart({ navigation }) {
  const tempUser = 1;
  const [checkAll, setCheckAll] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState({});
  const [checkedShop, setCheckedShop] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([])
  const [groupedData, setGroupedData] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])


  // 장바구니 데이터 조회
  const fetchData = async () => {
    const result = await getCartData(tempUser);
    setCartData(result);
  };

  useEffect(() => {
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

  }, [groupedData]);

  // 전체 선택
  useEffect(() => {
    const newCheckedShop = { ...checkedShop };
    const newCheckedProduct = { ...checkedProduct };
    Object.keys(newCheckedShop).forEach((key) => {
      newCheckedShop[key] = checkAll;
      newCheckedProduct[key] = newCheckedProduct[key].map(() => checkAll);
    });
    setCheckedShop(newCheckedShop);
    setCheckedProduct(newCheckedProduct);
  }, [checkAll]);

  // 총 결제 금액, 선택 상품 변경
  useEffect(() => {
    Object.keys(checkedProduct).map((storeSeq) => {
      const temp = checkedProduct[storeSeq];
      temp.map((value, index) => {
        if (value) {
          const tempProductData = groupedData[storeSeq][index].product;
          console.log(tempProductData);
          tempProductData['storeSeq'] = storeSeq
          tempProductData['count'] = groupedData[storeSeq][index].quantity;

          const newSelectedProduct = [...selectedProducts, tempProductData]
          setSelectedProducts(newSelectedProduct);
          const tempPrice = newSelectedProduct.reduce((acc, item) => {
            console.log(item.product)
            return acc + item.productPrice * item.count;
          }, 0);
          setTotalPrice(tempPrice);
          console.log(newSelectedProduct);
        } else {
          setTotalPrice(0)
          setSelectedProducts([]);
        }
      })
    })
  }, [checkedProduct])

  const renderGroupedProducts = () => {
    return Object.keys(groupedData).map((storeSeq) => {
      const storeCart = groupedData[storeSeq];
      return (
        <CartShop
          key={storeSeq}
          storeSeq={storeSeq}
          data={storeCart}
          checkedShop={checkedShop}
          checked={checkedShop[storeSeq]}
          checkedProduct={checkedProduct}
          setCheckedProduct={setCheckedProduct}
          onShopCheckChange={() => {
            const newCheckedShop = { ...checkedShop };
            newCheckedShop[storeSeq] = !checkedShop[storeSeq];
            setCheckedShop(newCheckedShop);
            const newCheckedProduct = { ...checkedProduct };
            newCheckedProduct[storeSeq] = newCheckedProduct[storeSeq].map(() => newCheckedShop[storeSeq]);
            setCheckedProduct(newCheckedProduct);
          }}
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
                  const newCheck = !checkAll;
                  setCheckAll(newCheck);
                }}
              />{" "}
              전체 선택
            </Text>
            <TouchableOpacity onPress={() => {
              if (selectedProducts.length > 0) {
                selectedProducts.map((data) => {
                  console.log(data.productSeq)
                  deleteCartData(tempUser, data.productSeq)
                })
                fetchData();
              } else {
                Alert.alert('삭제할 상품을 선택해주세요.')
              }
            }}>
              <Text style={styles.delete}>선택 삭제</Text>
            </TouchableOpacity>
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
              if (selectedProducts.length) {
                navigation.navigate("MakeCard", {
                  selectedProducts: selectedProducts,
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
