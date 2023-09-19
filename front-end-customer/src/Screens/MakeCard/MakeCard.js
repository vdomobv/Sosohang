import styles from "./styles";
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

export default function MakeCard({ route, navigation }) {
  console.log(route.params.selectedProducts);

  const [selectedButton, setSelectedButton] = useState(null);
  const [message, setMessage] = useState(""); // 입력된 텍스트를 관리할 상태 변수

  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
      setSelectedButton(button);
    }
  };

  return (
    <>
      <ScrollView>
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

          <View style={styles.cardimage}>
            <Image
              source={require('assets/images/greencard.png')} // 이미지 파일의 경로
              style={{ width: '95%', height: 550,}}
            />
        <View style={[styles.innerBox, { top: 35, height: 200 }]}>
          {/* 작은 박스 내용: 이미지 카드 */}
          <Text style={styles.title}>카메라를 통해 사진을 찍거나, 앨범에서 사진을 선택하세요.</Text>
        </View>

        <TextInput
              style={[styles.innerBox, styles.innerInput]}
              placeholder="메시지를 입력하세요."
              onChangeText={(text) => setMessage(text)} // 텍스트 변경 시 호출되는 함수
              value={message}
              maxLength={100} // 최대 글자 수 제한
              multiline={true} // 여러 줄 입력 가능하도록 설정
            />

            {/* 글자 수 표시 */}
            <Text style={{ position: 'absolute', bottom: 110 }}>
              ({message.length}/100자)
            </Text>

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
        </View >
      </ScrollView>
    </>
  );
}

