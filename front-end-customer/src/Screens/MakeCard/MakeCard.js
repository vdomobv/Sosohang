import styles from "./styles";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Contacts from "expo-contacts";
import { Ionicons } from "@expo/vector-icons";

import CartGift from "../../Components/CartGift/CartGift";
import SelectImage from "../../Components/SelectImage/SelectImage";
import { uploadImageToNCP } from '../../Utils/UploadImage.js';


export default function MakeCard({ route, navigation }) {
  const { selectedProducts, totalPrice } = route.params;
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 카드 이미지
  const [message, setMessage] = useState(""); // 입력된 텍스트를 관리
  const [contacts, setContacts] = useState([]); // 연락처 데이터를 저장
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [giverName, setGiverName] = useState("");
  const [contactStartIndex, setContactStartIndex] = useState(0);
  const [isContactBoxVisible, setIsContactBoxVisible] = useState(false);
  const [sosoStoreSeq, setSosostoreSeq] = useState("");

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
      setContacts(data);
    } else {
      Alert.alert("연락처가 없습니다.");
    }
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

  const renderContacts = () => {
    const visibleContacts = contacts.slice(contactStartIndex, contactStartIndex + 4);
    return (
      <View style={{ marginLeft: 20 }}>
        {visibleContacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleContactSelection(contact)}
          >
            <Text style={{ marginVertical: 4, fontSize: 20 }}>
              {contact.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
  console.log('groupedByStore : ', groupedByStore)


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

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };
  
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>선물포장하기</Text>

          <SelectImage
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setMessage={setMessage}
            message={message}
          />

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>😊 보내는 사람 👉</Text>
            <TextInput
              value={giverName}
              onChangeText={(text) => {
                setGiverName(text); // 이름 입력 시 상태 업데이트
              }}
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
              onPress={() => {
                getContacts();
                setIsContactBoxVisible(true);
              }}
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

            {/* 연락처 박스 */}
            {isContactBoxVisible && (
              <View style={styles.contactBox}>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => {
                    if (contactStartIndex > 0) {
                      setContactStartIndex(contactStartIndex - 4);
                    }
                  }}
                >
                  <Ionicons size={25} name="caret-up-outline" />
                </TouchableOpacity>
                {renderContacts()}
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => {
                    if (contactStartIndex + 4 < contacts.length) {
                      setContactStartIndex(contactStartIndex + 4);
                    }
                  }}
                >
                  <Ionicons size={25} name="caret-down-outline" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>🎁 상품 내역</Text>
            {renderGroupedProducts()}

            <View style={styles.total}>
              <View style={styles.price}>
                <Text style={styles.priceText}> 총 결제 금액</Text>
                <Text style={styles.priceText}>{numberWithCommas(totalPrice)} 원</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
  style={styles.okay}
  onPress={async () => {
    if (contactName === "" || contactPhoneNumber === "") {
      Alert.alert("받는 사람을 선택해주세요.");
    } else {
      let fileId = null;
      try {
        // NCP에 이미지를 업로드
        fileId = await uploadImageToNCP(selectedImage, `${Date.now()}test.jpg`);
        console.log("업로드되는 이미지URI 나오나??", fileId)
      } catch (error) {
        console.error("Error uploading image to NCP:", error);
        // 여기에 알림 추가하면 이미지 업로드 실패시 사용자에게 알림을 줄 수 있습니다.
        // Alert.alert("Image upload failed. Proceeding without image.");
      }
      navigation.navigate("WaitingPayment", {
        groupedByStore,
        totalPrice,
        result: false,
        to: contactName,
        sosoticonData: {
          sosoticonTakerName: contactName,
          sosoticonGiverName: giverName,
          sosoticonTaker: contactPhoneNumber.replaceAll("-", ""),
          sosoticonText: message,
          sosoticonStatus: 1,
          sosoticonImage: fileId,
          sosoticonValue:  50000,
          memberSeq: 10,
          orderSeq: 1,
          storeSeq: 7,
          sosoticonUrl: "string",

        },
      });
    }
  }}

  /*{
  "memberSeq": 0,*
  "orderSeq": 0,*
  "storeSeq": 0,*
  "sosoticonGiverName": "string",/
  "sosoticonTakerName": "string",/
  "sosoticonTaker": "string",/
  "sosoticonText": "string",/
  "sosoticonUrl": "string",*
  "sosoticonImage": "string",/
  "sosoticonStatus": 0,/
  "sosoticonValue": 0*
}*/
  
>
  <Text style={[styles.priceText, { color: "white" }]}>결제하기</Text>
</TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
