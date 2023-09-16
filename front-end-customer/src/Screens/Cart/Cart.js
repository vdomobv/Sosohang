import styles from "./styles";
import { View, Text, ScrollView } from "react-native";
import { useState } from "react";

import Checkbox from 'expo-checkbox';
import Tabs from "../../Components/Tabs/Tabs";
import CartShop from "../../Components/CartShop/CartShop";

const dummy = [
  {
    name: '프랭크커핀바',
    products: [
      { name: '브라운치즈 크로플', count: 2, price: 9000, image: require('assets/images/bread.png') },
      { name: '카페 라떼  & 타르트', count: 1, price: 10000, image: require('assets/images/bread.png') },
    ]
  },
  {
    name: '아이디얼',
    products: [
      { name: '아메리카노', count: 2, price: 4500, image: require('assets/images/bread.png') },
      { name: '카페라떼', count: 1, price: 5000, image: require('assets/images/bread.png') },
    ]
  },

]

export default function Cart({navigation}) {
  const [checkAll, setCheckAll] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cartList}>
          <View style={styles.listHead}>
            <Text> <Checkbox style={styles.checkbox}
              value={checkAll}
              onValueChange={() => setCheckAll(!checkAll)}
              color={checkAll ? '#4630EB' : undefined} />   전체 선택</Text>
            <Text style={styles.delete}>선택 삭제</Text>
          </View>

          <View style={styles.listBody}>
            <ScrollView style={styles.scrollList}>
              {
                dummy.map((d) => {
                  return <CartShop data={d}/>
                })
              }
            </ScrollView>
          </View>
        </View>
        <View style={styles.total}>
          <View style={styles.price}>
            <Text style={styles.priceText}> 총 결제 금액</Text>
            <Text style={styles.priceText}>28,000 원</Text>
          </View>
          <View style={styles.okay}>
            <Text style={[styles.priceText, { color: 'white' }]}>선물하기</Text>
          </View>
        </View>
      </View>
      <Tabs navigation={navigation}/>
    </>
  );
}

