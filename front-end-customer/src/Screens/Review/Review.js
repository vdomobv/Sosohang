import styles from "./styles";
import React, { useState, useEffect } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Box from "../../Components/Box/Box";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import GiftNoBtn from "../../Components/GiftNoBtn/GiftNoBtn";

// 카테고리에 해당하는 추천 리뷰 키워드 가져오기, 리뷰 생성하기
import { getReviewKeywordListByCategorySeq, createReview } from "../../Utils/ReviewAPI";


export default function Review({ route, navigation }) {
  const { giftData } = route.params;
  const [reviewKeywordList, setReviewKeywordList] = useState([]);
  const sosoticonSeq = giftData.sosoticonSeq
  // console.log("데이타", giftData.sosoticonSeq);
  const [storeSeq, setStoreSeq] = useState(0);

  useEffect(() => {
    fetchReviewKeywordData();
    setStoreSeq(giftData.store.storeSeq)
  }, [giftData]);

  const fetchReviewKeywordData = async () => {
    try {
      const categorySeq = giftData.store.category.categorySeq;
      const result = await getReviewKeywordListByCategorySeq(categorySeq);
      setReviewKeywordList(result);
    } catch (error) {
      // console.error("Error fetching member data:", error);
    }
  };

  // const categorySeq = 5;
  // const selectedCategory = CategoryData.find(
  //   (category) => category.categorySeq === categorySeq
  // );

  // const reviewKeyword = selectedCategory ? selectedCategory.review : [];
  // const initialKeywordsState = selectedCategory ? selectedCategory.review.map(() => false) : [];
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const toggleKeyword = (keywordSeq) => {
    const newSelectedKeywords = [...selectedKeywords];
  
    if (newSelectedKeywords.includes(keywordSeq)) {
      const index = newSelectedKeywords.indexOf(keywordSeq);
      if (index > -1) {
          newSelectedKeywords.splice(index, 1);
      }
    } else {
      if (newSelectedKeywords.length < 3) {
        newSelectedKeywords.push(keywordSeq);
      } else {
        Alert.alert("알림", "최대 3개의 키워드까지 선택할 수 있습니다.");
        return; 
      }
    }

    setSelectedKeywords(newSelectedKeywords);
};

  const submitReview = (storeSeq, sosoticonSeq, selectedKeywords) => {
    // console.log("여기", selectedKeywords);
    try {
      const result = createReview(storeSeq, sosoticonSeq, selectedKeywords);
      Alert.alert("알림", "리뷰가 생성되었습니다", [
        {
          text: "확인",
          onPress: async () => {
            navigation.replace("MyGift", { activatedTabValue : false});
          }
        }
      ]);
    } catch (e) {
      // console.log(e);
    }
  }


  return (
    <>
      <View style={styles.container}>
        <Title title={"후기 남기기"}></Title>
        <ScrollBox style={styles.scrollBoxContainer}
          content={
            <>
              <Box content={<GiftNoBtn data={giftData}/>} />
              <View style={styles.reviewBox}>
                <Text style={[styles.reviewInfo, { fontSize: 21, fontWeight: 'bold' }]}>선물은 만족스러우셨나요?{'\n'}</Text>
                <Text style={[styles.reviewInfo, { fontSize: 18, padding: 5 }]}>
                  이용 후기를 선택해주세요.{'\n'}
                  해당 후기는 상점 사장님들에게{'\n'}
                  소중한 의견으로 전달됩니다.</Text>
                <TouchableOpacity style={styles.shopname}
                // 클릭시 각 상점 상세페이지로 이동?
                >
                  <Text style={styles.shopnameText}>{giftData.store.storeName}</Text>
                </TouchableOpacity>
                <Text style={[styles.reviewInfo, { fontSize: 15, marginBottom: 8 }]}>
                  최대 3개까지 선택 가능합니다.</Text>
                <View style={styles.reviewKeyword}>
                  {reviewKeywordList.map((keyword, index) => (
                    <TouchableOpacity
                      key={keyword.reviewKeywordSeq}
                      onPress={() => toggleKeyword(keyword.reviewKeywordSeq)}
                    >
                      <Text
                        style={[
                          styles.keywordButton,
                          selectedKeywords.includes(keyword.reviewKeywordSeq) && styles.selectedKeywordButton
                        ]}
                      >
                        {keyword.reviewKeywordName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* 버튼 클릭 시, 리뷰 키워드 저장되도록 */}
                <TouchableOpacity style={styles.reviewButton} onPress={() => submitReview(storeSeq, sosoticonSeq, selectedKeywords)}>
                  <Text style={styles.buttonText}>후기 남기기</Text>
                </TouchableOpacity>
              </View>
            </>
          } />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}