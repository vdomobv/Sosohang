import styles from "./styles";
import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Box from "../../Components/Box/Box";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import CategoryData from "../../Dummys/Main/CategoryData";

export default function Review({ route, navigation }) {
  const { giftData } = route.params;
  console.log(giftData)
  const categorySeq = 5;

  const selectedCategory = CategoryData.find(
    (category) => category.categorySeq === categorySeq
  );

  const reviewKeyword = selectedCategory ? selectedCategory.review : [];
  const initialKeywordsState = selectedCategory ? selectedCategory.review.map(() => false) : [];
  const [selectedKeywords, setSelectedKeywords] = useState(initialKeywordsState);

  const toggleKeyword = (index) => {
    const newSelectedKeywords = [...selectedKeywords];
    const selectedCount = newSelectedKeywords.filter((isSelected) => isSelected).length;
    
    if (selectedCount < 3 || newSelectedKeywords[index]) {
      newSelectedKeywords[index] = !newSelectedKeywords[index];
      setSelectedKeywords(newSelectedKeywords);
    } else {
      Alert.alert("알림", "최대 3개의 키워드까지 선택할 수 있습니다.");
    }
  };


  return (
    <>
      <View style={styles.container}>
        <Title title={"후기 남기기"}></Title>
        <ScrollBox style={styles.scrollBoxContainer}
          content={
            <>
              <Box content={<Gift data={giftData} />} />
              <View style={styles.reviewBox}>
                <Text style={[styles.reviewInfo, { fontSize: 21, fontWeight: 'bold' }]}>선물은 만족스러우셨나요?{'\n'}</Text>
                <Text style={[styles.reviewInfo, { fontSize: 18, padding: 5 }]}>
                  이용 후기를 선택해주세요.{'\n'}
                  해당 후기는 상점 사장님들에게{'\n'}
                  소중한 의견으로 전달됩니다.</Text>
                <TouchableOpacity style={styles.shopname}
                // 클릭시 각 상점 상세페이지로 이동?
                >
                  <Text style={styles.shopnameText}>{giftData.shopname}</Text>
                </TouchableOpacity>
                <Text style={[styles.reviewInfo, { fontSize: 15, marginBottom: 8 }]}>
                  최대 3개까지 선택 가능합니다.</Text>
                <View style={styles.reviewKeyword}>
                  {reviewKeyword.map((keyword, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toggleKeyword(index)}
                    >
                      <Text
                        style={[
                          styles.keywordButton,
                          selectedKeywords[index] && styles.selectedKeywordButton
                        ]}
                      >
                        {keyword}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.reviewButton}>
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