import styles from "./styles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function SelectImage({
  selectedButton,
  setSelectedButton,
  selectedImage,  // 여기에 추가
  setSelectedImage,  // 여기에 추가
  setMessage,
  message
}) {
  // const [selectedButton, setSelectedButton] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [message, setMessage] = useState(""); // 입력된 텍스트를 관리

  // "+" 버튼을 눌렀을 때 갤러리 열기
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "미디어 라이브러리 권한이 필요합니다.",
        "앱 설정에서 권한을 허용해주세요."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });

      if (!result.canceled) {
        setSelectedButton(null); // "+" 버튼 선택 해제
        setSelectedImage(result.assets); // 선택한 이미지를 selectedImage에 설정
      }
    }
  };

  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
      setSelectedImage(null); // 버튼이 선택 해제되면 이미지도 초기화
    } else {
      setSelectedButton(button);

      if (button === "+") {
        openImagePicker(); // "+" 버튼을 눌렀을 때 갤러리 열기
      } else {
        // 해당 버튼에 따라 이미지 업데이트
        switch (button) {
          case "생일":
            setSelectedImage(require("assets/images/bday.png"));
            break;
          case "감사":
            setSelectedImage(require("assets/images/thx.png"));
            break;
          case "응원":
            setSelectedImage(require("assets/images/cheerup.png"));
            break;
          default:
            setSelectedImage(null); // 다른 버튼인 경우 이미지 초기화
            break;
        }
      }
    }
  };
  // const messageValue = message || "";
  return (
    <View>
      <Text style={styles.subtitle}>📝 메시지카드 작성</Text>
      <View style={styles.buttonContainer}>
        {["+", "생일", "감사", "응원"].map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { width: 70 },
              selectedButton === button ? styles.selectedButton : null,
            ]}
            onPress={() => handleButtonClick(button)}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.cardImage}>
        <Image
          source={require("assets/images/greencard.png")}
          style={{ width: "95%", height: 550 }}
        />

        <View style={[styles.innerBox, { top: 35, height: 200 }]}>
          <Text style={styles.title}>
            + 버튼을 눌러 핸드폰 앨범의 사진을 선택할 수 있어요.
          </Text>
          <Image
            source={selectedImage} // 선택된 이미지 표시
            style={{ position: "absolute", width: 330, height: 200 }}
          />
        </View>
        <TextInput
          style={[styles.innerBox, styles.innerInput]}
          placeholder="메시지를 입력하세요."
          onChangeText={(text) => setMessage(text)} // 텍스트 변경 시 호출되는 함수
          value={message}
          maxLength={50} // 최대 글자 수 제한
          multiline={true} // 여러 줄 입력 가능하도록 설정
        />
        <Text style={{ position: "absolute", bottom: 110 }}>
          ({message.length}/50자)
        </Text>
      </View>
    </View>
  );
}
