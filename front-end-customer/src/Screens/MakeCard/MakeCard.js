import styles from "./styles";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";

import CartGift from "../../Components/CartGift/CartGift";

export default function MakeCard({ route, navigation }) {
  const { selectedProducts, totalPrice } = route.params;

  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 카드 이미지
  const [message, setMessage] = useState(""); // 입력된 텍스트를 관리
  const [contacts, setContacts] = useState([]); // 연락처 데이터를 저장
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");

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

  // 연락처 가져오기 함수
  const getContacts = async () => {
    // 연락처 액세스 권한 요청
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "연락처 접근 권한이 필요합니다.",
        "앱 설정에서 권한을 허용해주세요."
      );
      return;
    }
    const { data } = await Contacts.getContactsAsync();

    if (data.length > 0) {
      console.log(data);
      setContacts(data);
    } else {
      Alert.alert("연락처가 없습니다.");
    }
  };

  // 연락처 가져오기 버튼을 눌렀을 때 호출
  const handleGetContacts = () => {
    // getContacts();
    Linking.openURL("content://contacts/people/");
  };

  // 연락처 목록 보여주고 선택한 연락처 처리
  const handleContactSelection = (selectedContact) => {
    if (selectedContact) {
      const { name, phoneNumbers } = selectedContact;
      const phoneNumber = phoneNumbers[0]?.number || "";

      setContactName(name);
      setContactPhoneNumber(phoneNumber);
    }
  };

  // 상품을 storeSeq를 기준으로 그룹화
  const groupedByStore = selectedProducts.reduce((acc, product) => {
    const key = product.storeSeq;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(product);
    return acc;
  }, {});
  console.log(groupedByStore)


  // 그룹화된 상품을 렌더링
  const renderGroupedProducts = () => {
    return Object.keys(groupedByStore).map((storeSeq) => {
      const productsInShop = groupedByStore[storeSeq];
      return (
        <View key={storeSeq}>
          <Text style={styles.shopName}>
            {productsInShop[0].storeName} <Ionicons style={styles.shopIcon} name="home-outline" />
          </Text>
          <View style={styles.box}>
            {productsInShop.map((product, index) => {
              return (
                <CartGift
                  key={index}
                  product={product}
                  updateTotalPrice={(priceChange) => {
                    // 총 결제 금액을 업데이트하는 함수
                  }}
                  totalPrice={totalPrice}
                  setSelectedProducts={(newSelectedProducts) => {
                    // 선택한 상품을 업데이트하는 함수
                  }}
                  shopName={product.storeName}
                />
              )
            })}
          </View>
        </View>
      );
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>선물포장하기</Text>

          <View style={styles.subcontainer}>
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
                  onPress={() => {
                    if (button === "+") {
                      openImagePicker(); // "+" 버튼을 눌렀을 때 갤러리 열기
                    } else {
                      handleButtonClick(button);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>{button}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
              maxLength={100} // 최대 글자 수 제한
              multiline={true} // 여러 줄 입력 가능하도록 설정
            />
            <Text style={{ position: "absolute", bottom: 110 }}>
              ({message.length}/100자)
            </Text>
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>😊 보내는 사람 👉</Text>
            <TextInput
              style={[styles.input, { marginHorizontal: 40 }]}
              placeholder="상대방에게 표시되는 이름이에요."
            />
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>😍 받는 사람 🖐</Text>
            <TouchableOpacity
              style={[
                styles.button,
                { marginHorizontal: 40, marginBottom: 20 },
              ]}
              onPress={getContacts}
            >
              <Text style={styles.buttonText}>+ 연락처 가져오기</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginHorizontal: 40 }}>
              <TextInput
                style={[styles.input, { width: 100 }]}
                placeholder="이름"
                value={contactName}
                onChangeText={(text) => {
                  setContactName(text); // 이름 입력 시 상태 업데이트
                }}
              />
              <TextInput
                style={[styles.input, { width: 220, marginLeft: 10 }]}
                placeholder="전화번호"
                keyboardType="numeric"
                maxLength={13}
                value={contactPhoneNumber}
                onChangeText={(text) => {
                  setContactPhoneNumber(text); // 전화번호 입력 시 상태 업데이트
                }}
              />
            </View>
            <ScrollView style={{ marginLeft: 53, marginTop: 10 }}>
              {contacts.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleContactSelection(contact)}
                >
                  <Text style={{ marginVertical: 5, fontSize: 20 }}>
                    {contact.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>🎁 상품 내역</Text>
            {renderGroupedProducts()}

            <View style={styles.total}>
              <View style={styles.price}>
                <Text style={styles.priceText}> 총 결제 금액</Text>
                <Text style={styles.priceText}>{totalPrice} 원</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.okay}
            onPress={() => {
              if (contactName === "" || contactPhoneNumber === "") {
                Alert.alert("받는 사람을 선택해주세요.");
              } else {
                navigation.navigate("WaitingPayment", {
                  groupedByStore,
                  totalPrice,
                  result: false,
                  to: contactName,
                });
              }
            }}
          >
            <Text style={[styles.priceText, { color: "white" }]}>결제하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
