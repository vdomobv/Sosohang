import styles from "./styles";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { uploadImageToS3, uploadImageToNCP } from "../../Utils/UploadImage.js";
import * as ImageManipulator from "expo-image-manipulator";

export default function SelectImage({
  selectedButton,
  setSelectedButton,
  selectedImage, // 여기에 추가
  setSelectedImage, // 여기에 추가
  setMessage,
  message,
}) {
  // console.log("Props - selectedButton:", selectedButton);
  // console.log("Props - selectedImage:", selectedImage);
  // console.log("Props - setSelectedImage:", setSelectedImage);
  // const [selectedButton, setSelectedButton] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [message, setMessage] = useState(""); // 입력된 텍스트를 관리
  const uriToBase64 = async (uri) => {
    const byteCharacters = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return byteCharacters;
  };
  const resizeImage = async (uri) => {
    const photo = { uri: uri, width: 500, height: 500 }; // 예시로 width와 height를 설정했습니다.
    const resizedPhoto = await resizePhotoToMaxDimensionsAndCompressAsJPEG({
      photo: photo,
    });
    console.log("resizeImage - Resized Image URI:", resizedPhoto.uri);
    return resizedPhoto.uri;
  };
  const resizePhotoToMaxDimensionsAndCompressAsJPEG = async ({ photo }) => {
    const largestDimension = photo.width > photo.height ? "width" : "height";
    const initialValueOfLargestDimension = photo[largestDimension];
    const maximalAllowedValueOfLargestDimension = 500; // 여기서 최대 허용 크기를 설정하면 됩니다.
    const targetValueOfLargestDimension =
      initialValueOfLargestDimension > maximalAllowedValueOfLargestDimension
        ? maximalAllowedValueOfLargestDimension
        : initialValueOfLargestDimension;
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { [largestDimension]: targetValueOfLargestDimension } }],
      { compress: 0.7, format: "jpeg" }
    );
    return resizedPhoto;
  };
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
        // console.log("Image Picker Result:", result);
        // console.log("openImagePicker - Resized Image URI:", resizedImageUri);
        // console.log("openImagePicker - Base64 Image:", base64Image);
        // console.log("openImagePicker - Final Assets:", result.assets);
        // console.log("openImagePicker - Final Assets에서 uri:", result.assets[0].uri);

        // const base64Image = await uriToBase64(result.assets[0].uri);
        // console.log("Base64 이미지값 : ", base64Image);
        // const resizedImageUri = await resizeImage(result.assets[0].uri);
        // console.log("리사이즈드이미지??", resizedImageUri);
        // const base64Image = await uriToBase64(resizedImageUri);
        // console.log("유알아이투베이스???", base64Image);

        // // 이미지의 base64 값을 result.assets의 첫 번째 아이템에 할당
        // result.assets[0].base64 = base64Image;
        // console.log("Final Assets with Base64:", result.assets);
        // console.log("할당되었나?", base64Image);

        // setSelectedButton(null);
        // setSelectedImage(result.assets);
        // console.log("3번 result.assets : ", result.assets);
        const resizedImageUri = await resizeImage(result.assets[0].uri);
        const uploadedImageUrl = await uploadImageToS3(
          resizedImageUri,
          "your-file-name.jpg"
        );
        console.log("S3 Uploaded Image URL:", uploadedImageUrl);
        setSelectedImage({ uri: uploadedImageUrl }); // 업로드된 이미지의 URL을 사용하여 화면에 표시
      }
      // if (!result.canceled) {
      //   console.log("result.assets : ", result.assets);
      //   console.log("result.base64 : ", result.base64);
      //   // const base64Image = await encodeImageToBase64(result.uri);
      //   setSelectedButton(null); // "+" 버튼 선택 해제
      //   // setSelectedImage(result.assets); // 선택한 이미지를 selectedImage에 설정
      //   // selectedImage(result.base64) // Base64로 인코딩된 이미지를 상태로 저장
      //   setSelectedImage(result.assets)
      //   console.log("이미지값 : ", result.assets)
      // }
    }
  };

  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
      setSelectedImage(null); // 버튼이 선택 해제되면 이미지도 초기화
    } else {
      setSelectedButton(button);

      // if (button === "+") {
      //   openImagePicker(); // "+" 버튼을 눌렀을 때 갤러리 열기
      // } else {
      // 해당 버튼에 따라 이미지 업데이트
      switch (button) {
        case "안녕":
          setSelectedImage(require("assets/images/hello.png"));
          break;
        case "감사":
          setSelectedImage(require("assets/images/thx.png"));
          break;
        case "응원":
          setSelectedImage(require("assets/images/cheerup.png"));
          break;
        case "위로":
          setSelectedImage(require("assets/images/encourage.png"));
          break;
        default:
          setSelectedImage(null); // 다른 버튼인 경우 이미지 초기화
          break;
      }
      // }
    }
  };
  // const messageValue = message || "";
  return (
    <View>
      <Text style={styles.subtitle}>📝 메시지카드 작성</Text>
      <View style={styles.buttonContainer}>
        {["안녕", "감사", "응원", "위로"].map((button, index) => (
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
            상단의 이미지 카드 키워드를 {"\n"}선택해 주세요.
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
