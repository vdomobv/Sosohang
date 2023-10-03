import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

import CustomButton from "../../Components/CustomButton/CustomButton";
import Title from "../../Components/Title/Title";
import SquareImage from "../../Components/SquareImage/SquareImage";
import Gift from "../../Components/Gift/Gift";
import Box from "../../Components/Box/Box";
import { useEffect, useState } from "react";
import { getMemberSeq } from "../../Utils/MemberAPI";
import { makeOrder } from "../../Utils/PaymentAPI";

export default function PaymentResult({ navigation, route }) {
  const paymentData = route.params.paymentData;
  const productList = route.params.productList;
  const to = route.params.to;
  const [orderList, setOrderList] = useState([])
  const [tempUser, setTempUser] = useState()

  useEffect(() => {
    const fetchMemberSeq = async () => {
      const memberSeq = await getMemberSeq();

      if (memberSeq !== undefined) {
        console.log(memberSeq);
        setTempUser(memberSeq);
      }
    };

    fetchMemberSeq();
  }, [])

  useEffect(() => {
    const fetchOrderData = async () => {
      let temp = [];

      Object.keys(productList).map((key) => {
        productList[key].map((d) => {
          console.log('데이터 리스트', d)
          temp.push({
            'productSeq': d.productSeq,
            'count': d.count
          })
        })
      })

      if (temp.length > 0) {
        setOrderList(temp);
      }
    }

    fetchOrderData();
  }, [tempUser])

  useEffect(() => {
    if (orderList.length > 0) {
      console.log('되라되라 :', orderList)
      makeOrder(tempUser, orderList)
    }
  }, [orderList])

  const gifts = Object.keys(productList).map((storeSeq) => {
    const productsInShop = productList[storeSeq];
    if (productsInShop.length == 1) {
      productsInShop['name'] = productsInShop[0].productName;
    } else if (productsInShop.length > 1) {
      productsInShop['name'] = productsInShop[0].storeName + '선물 꾸러미'
    }

    const totalProductPrice = productsInShop.reduce((acc, product) => {
      return acc + product.productPrice * product.count;
    }, 0);

    productsInShop["to"] = to;
    productsInShop["totalPrice"] = totalProductPrice;
    productsInShop["currentPrice"] = totalProductPrice;

    return (
      <View style={{ marginVertical: 5 }}>
        <Box key={storeSeq} content={<Gift data={productsInShop} key={storeSeq} navigation={navigation} />} />
      </View>
    );
  });

  //   console.log("paymentResult : ", paymentResult, data, productList);
  return (
    <ScrollView style={styles.container}>
      <Title title={"결제 완료"} />
      <View style={styles.image}>
        <SquareImage imageSrc={require("assets/images/giftbox.gif")} />
      </View>
      <View style={styles.gift}>{gifts}</View>

      <View style={styles.button}>
        <CustomButton
          pressFuction={() => {
            navigation.navigate("MyPage");
          }}
          customStyles={{
            justifyContent: "center",
            backgroundColor: "#E9EEE8",
          }}
          content={<Text style={styles.text}>결제 내역 보러가기</Text>}
        />
      </View>
      <View style={[styles.button, { marginBottom: 100 }]}>
        <CustomButton
          pressFuction={() => {
            navigation.navigate("YouAndMe");
          }}
          customStyles={{
            justifyContent: "center",
            backgroundColor: "#E9EEE8",
          }}
          content={<Text style={styles.text}>친구와 추억 보러가기</Text>}
        />
      </View>
    </ScrollView>
  );
}
