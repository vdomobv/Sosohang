import styles from "./styles";
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import CartProduct from "../../Components/CartProduct/CartProduct";

export default function MakeCard({ route, navigation }) {
  const { selectedProducts, totalPrice } = route.params;
  const selectedProductsArray = Array.from(selectedProducts);



  const [selectedButton, setSelectedButton] = useState(null);
  const [message, setMessage] = useState(""); // 입력된 텍스트를 관리할 상태 변수
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태 변수

  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
      setSelectedImage(null); // 버튼이 선택 해제되면 이미지도 초기화
    } else {
      setSelectedButton(button);

      if (button === "+") {
        setSelectedImage(null); // 이미지 초기화
      } else {
        // 해당 버튼에 따라 이미지 업데이트
        switch (button) {
          case "생일":
            setSelectedImage(require('assets/images/Bday2.png'));
            break;
          case "감사":
            setSelectedImage(require('assets/images/Thx2.png'));
            break;
          case "응원":
            setSelectedImage(require('assets/images/Cheerup2.png'));
            break;
          default:
            setSelectedImage(null); // 다른 버튼인 경우 이미지 초기화
            break;
        }
      }
    }
  };

  // 상품을 상점 이름을 기준으로 그룹화
  const groupedProducts = selectedProductsArray.reduce((groups, product) => {
    const shopname = product.shopname;
    if (!groups[shopname]) {
      groups[shopname] = [];
    }
    groups[shopname].push(product);
    return groups;
  }, {});

  // 그룹화된 상품을 렌더링
  const renderGroupedProducts = () => {
    return Object.keys(groupedProducts).map((shopname) => {
      const productsInShop = groupedProducts[shopname];
      return (
        <View key={shopname}>
          <Text style={styles.shopName}>
            {shopname} <Ionicons style={styles.shopIcon} name="home-outline" />
          </Text>
          <View style={styles.box}>
            {productsInShop.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                productCheck={true}
                updateTotalPrice={(priceChange) => {
                  // 총 결제 금액을 업데이트하는 함수를 구현하세요.
                }}
                totalPrice={totalPrice}
                setSelectedProducts={(newSelectedProducts) => {
                  // 선택한 상품을 업데이트하는 함수를 구현하세요.
                }}
                shopname={product.shopname}
              />
            ))}
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

          <View style={styles.subcontainer} >
            <Text style={styles.subtitle}>📝 메시지카드 작성</Text>
            <View style={styles.buttonContainer}>
              {["+", "생일", "감사", "응원"].map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button, { width: 70 },
                    selectedButton === button ? styles.selectedButton : null,
                  ]}
                  onPress={() => handleButtonClick(button)}
                >
                  <Text style={styles.buttonText}>{button}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.cardimage}>
            <Image
              source={require('assets/images/greencard.png')} // 이미지 파일의 경로
              style={{ width: '95%', height: 550, }}
            />
            <View style={[styles.innerBox, { top: 35, height: 200 }]}>
              <Text style={styles.title}>카메라를 통해 사진을 찍거나, 앨범에서 사진을 선택하세요.</Text>
              <Image
                source={selectedImage} // 선택된 이미지 표시
                style={{ position: 'absolute', width: 330, height: 200 }}
              />
            </View>

            <TextInput
              style={[styles.innerBox, styles.innerInput]}
              placeholder="메시지를 입력하세요."
              onChangeText={(text) => setMessage(text)} // 텍스트 변경 시 호출되는 함수
              value={message}
              maxLength={100} // 최대 글자 수 제한
              multiline={true} // 여러 줄 입력 가능하도록 설정
            // keyboardType="default" // 한글 키보드
            />

            {/* 글자 수 표시 */}
            <Text style={{ position: 'absolute', bottom: 110 }}>
              ({message.length}/100자)
            </Text>

          </View>


          <View style={styles.subcontainer} >
            <Text style={styles.subtitle}>😊 보내는 사람 👉</Text>
            <TextInput
              style={[styles.input, { marginHorizontal: 40 }]}
              placeholder="상대방에게 표시되는 이름이에요."
            />
          </View>

          <View style={styles.subcontainer} >
            <Text style={styles.subtitle}>😍 받는 사람 🖐</Text>
            <TouchableOpacity style={[styles.button, { marginHorizontal: 40, marginBottom: 20 }]}
            // 연락처 가져오기 기능 구현
            // onPress={getPhoneNumber}
            >
              <Text style={styles.buttonText}>+ 연락처 가져오기</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
              <TextInput
                style={[styles.input, { width: 100 }]}
                placeholder="이름"
              // keyboardType="default" // 한글 키보드
              />
              <TextInput
                style={[styles.input, { width: 220, marginLeft: 10 }]}
                placeholder="전화번호"
                keyboardType="numeric"
                maxLength={11} // 이 부분을 추가하여 최대 길이를 11로 설정
                onChangeText={(text) => {
                  // 입력된 값이 숫자인지 확인
                  if (/^[0-9]*$/.test(text)) {
                    // 숫자인 경우에만 상태 업데이트
                    if (text.length <= 11) {
                      setPhoneNumber(text);
                    }
                  } else {
                    Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.subcontainer} >
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
          >
            <Text style={[styles.priceText, { color: "white" }]}>결제하기</Text>
          </TouchableOpacity>
        </View >

      </ScrollView>
    </>
  );
}