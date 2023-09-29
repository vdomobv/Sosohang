import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

import CustomButton from "../../Components/CustomButton/CustomButton";
import Title from "../../Components/Title/Title";
import SquareImage from "../../Components/SquareImage/SquareImage";
import Gift from "../../Components/Gift/Gift";
import Box from "../../Components/Box/Box";

export default function PaymentResult({ navigation, route }) {
  const paymentData = route.params.paymentData;
  const productList = route.params.productList;
  const to = route.params.to;

  const gifts = Object.keys(productList).map((storeSeq) => {
    const productsInShop = productList[storeSeq];
    if (productsInShop.length == 1) {
      productsInShop['name'] = productsInShop[0].productName;
    } else if (productsInShop.length > 1){
      productsInShop['name'] = productsInShop[0].storeName + '선물 꾸러미'
    }

    const totalProductPrice = productsInShop.reduce((acc, product) => {
      return acc + product.productPrice * product.count;
    }, 0);

    productsInShop["to"] = to;
    productsInShop["totalPrice"] = totalProductPrice;
    productsInShop["currentPrice"] = totalProductPrice;

    console.log("newDate: ", productsInShop);
    
    return (
      <View style={{marginVertical : 5}}>
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
      <View style={[styles.button,{marginBottom : 100}]}>
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
