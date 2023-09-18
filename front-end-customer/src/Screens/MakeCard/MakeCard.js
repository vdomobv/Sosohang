import styles from "./styles";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

export default function MakeCard({ route, navigation }) {
console.log(route.params.selectedProducts);

const [selectedButton, setSelectedButton] = useState(null);

const handleButtonClick = (button) => {
  if (selectedButton === button) {
    setSelectedButton(null);
  } else {
    setSelectedButton(button);
  }
};

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>선물포장하기</Text>
        <View style={styles.subcontainer} >
        <Text style={styles.subtitle}>📝 메시지카드 작성</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "+" ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonClick("+")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "생일" ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonClick("생일")}
          >
            <Text style={styles.buttonText}>생일</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "감사" ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonClick("감사")}
          >
            <Text style={styles.buttonText}>감사</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "응원" ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonClick("응원")}
          >
            <Text style={styles.buttonText}>응원</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.subcontainer} >
        <Text style={styles.subtitle}>😊 보내는 사람 👉</Text>

        <TextInput
        style={styles.input}
        placeholder="상대방에게 표시되는 이름이에요."

        // onChangeText={(text) => setPassword(text)}
        // value={sendname}
      />
      </View>
      <View style={styles.subcontainer} >
        <Text style={styles.subtitle}>😍 받는 사람 🖐</Text>
        </View>
        <View style={styles.subcontainer} >
        <Text style={styles.subtitle}>🎁 상품 내역</Text>
        </View>
      </View>
    </>
  );
}

