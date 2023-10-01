import styles from "./styles";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";

import Checkbox from "expo-checkbox";
import Tabs from "../../Components/Tabs/Tabs";
import CartShop from "../../Components/CartShop/CartShop";
import Title from "../../Components/Title/Title";
import LoginRequired from "../../Components/LoginRequired/LoginRequired";

import { getCartData, deleteCartData } from "../../Utils/CartAPI";
import { getMemberSeq, setMemberSeq } from "../../Utils/MemberAPI";
import SectionSubTitle from "../../Components/SectionSubTitle/SectionSubTitle";
import Loading from "../../Components/Loading/Loading";

export default function Cart({ navigation }) {
  const [tempUser, setTempUser] = useState();
  const [checkAll, setCheckAll] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState({});
  const [checkedShop, setCheckedShop] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([])
  const [groupedData, setGroupedData] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true);

  // 장바구니 데이터 조회
  const fetchData = async () => {
    setLoading(true);
    const memberSeq = await getMemberSeq();

    if (memberSeq !== undefined) {
      setTempUser(memberSeq);

      const result = await getCartData(memberSeq);
      setCartData(result);
    }
    setLoading(false);
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

  // 선택 상품 변경
  useEffect(() => {
    let newSelectedProducts = [];

    Object.keys(checkedProduct).forEach((storeSeq) => {
      const temp = checkedProduct[storeSeq];
      temp.forEach((value, index) => {
        if (value) {
          const tempProductData = groupedData[storeSeq][index].product;
          tempProductData['storeSeq'] = storeSeq;
          tempProductData['count'] = groupedData[storeSeq][index].quantity;
          newSelectedProducts.push(tempProductData);
        }
      });
    });

    setSelectedProducts(newSelectedProducts);

  }, [checkedProduct])

  // 총 결제 금액 변경
  useEffect(() => {
    const tempPrice = selectedProducts.reduce((acc, item) => {
      console.log('test: ', item)
      return acc + item.productPrice * item.count;
    }, 0);
    setTotalPrice(tempPrice);
  }, [selectedProducts])

  const renderGroupedProducts = () => {
    return Object.keys(groupedData).map((storeSeq) => {
      const storeCart = groupedData[storeSeq];
      return (
        <CartShop
          key={storeSeq}
          storeSeq={storeSeq}
          data={storeCart}
          tempUser={tempUser}
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
          fetchData={fetchData}
        />
      )
    })
  }

  if (loading) {
    return <Loading />
  } else if (tempUser) {
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
              <TouchableOpacity onPress={async () => {
                if (selectedProducts.length > 0) {
                  for (let data of selectedProducts) {
                    await deleteCartData(tempUser, data.productSeq);
                  }
                  await fetchData();
                } else {
                  Alert.alert('삭제할 상품을 선택해주세요.');
                }
              }}
              >
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
  } else {
    return (<>
      <LoginRequired navigation={navigation} />
    </>)
  }
}
