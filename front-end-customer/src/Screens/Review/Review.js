import styles from "./styles";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Box from "../../Components/Box/Box";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
// import ReviewBar from "../../Components/ReviewBar/ReviewBar";
import CategoryData from "../../Dummys/Main/CategoryData";

export default function Review({ route, navigation }) {
  const { giftData } = route.params;
  const categorySeq = 5;

  // 선택된 카테고리의 리뷰 키워드 가져오기
  const selectedCategory = CategoryData.find(
    (category) => category.categorySeq === categorySeq
  );
  const reviewKeyword = selectedCategory ? selectedCategory.review : [];

  return (
    <>
      <View style={styles.container}>
        <Title title={"후기 남기기"}></Title>
        <ScrollBox style={styles.scrollBoxContainer}
          content={
            <>
              <Box content={<Gift data={giftData} />} />
              <View style={styles.reviewBox}>
                <Text style={[styles.reviewInfo, { fontWeight: 'bold' }]}>선물은 만족스러우셨나요?{'\n'}</Text>
                <Text style={styles.reviewInfo}>
                  선물에 대한 후기를 남겨주세요.
                  리뷰는 상점 사장님들에게
                  소중한 의견으로 전달됩니다.</Text>
                <TouchableOpacity
                  style={[styles.button,
                  { marginHorizontal: 40, marginVertical: 20 }]}
                // 클릭시 각 상점 상세페이지로 이동?
                >
                  <Text style={styles.buttonText}>{giftData.shopname}</Text>
                </TouchableOpacity>

                {/* 카테고리 별로 다른 review 키워드 나오게 */}
                {/* <ReviewBar content={ */}

                {/* <View style={styles.reviewKeyword}>
                  <Text> #편안해요</Text>
                </View> */}

                <View style={styles.reviewKeyword}>
                  {reviewKeyword.map((keyword, index) => (
                    <Text style={{ backgroundColor: '#E6FEDA', padding:10, borderRadius:20, margin: 5 }}
                    key={index}> {keyword}</Text>
                  ))}
                </View>

                {/* } /> */}
              </View>
            </>
          } />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}