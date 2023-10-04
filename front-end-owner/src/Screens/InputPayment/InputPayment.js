// components
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import Tabs from "../../Components/Tabs/Tabs";

export default function InputPayment({ navigation, route }) {
  const { balance, sosoticon, storeSeq } = route.params;
  const [payment, setPayment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = function () {
    if (payment !== "") {
      if (parseInt(payment.toString().replace(/[^0-9]/g, "")) > balance) {
        return setModalVisible(true);
      }
      axios
        .put(
          "https://j9c109.p.ssafy.io/api/app/users/gift-cards/deductAmount",
          {
            sosoticonCode: sosoticon,
            amount: parseInt(payment.toString().replace(/[^0-9]/g, "")),
          }
        )
        .post("https://j9c109.p.ssafy.io/app/settlement/create", {
          storeSeq: storeSeq,
          settlementPrice: parseInt(payment.toString().replace(/[^0-9]/g, "")),
        })
        .then(() => {
          navigation.navigate("DonePayment", { storeSeq: storeSeq });
        })
        .catch((err) => {
          console.error(err);
        });

      axios.post("https://j9c109.p.ssafy.io/app/settlement/create", {});
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"소소티콘 결제"} />

        <View style={[styles.inputContainer, { marginTop: 50 }]}>
          <Text style={styles.text}>잔액</Text>
          <TextInput
            style={[styles.textInput, { width: 200, color: "black" }]}
            keyboardType="numeric"
            value={balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            editable={false}
            // placeholder="QR data 넣기"
          ></TextInput>
          <Text style={styles.text}>원</Text>
        </View>

        <Text style={[styles.text, { marginTop: 50 }]}>
          결제 금액을 입력해 주세요!
        </Text>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            style={[styles.textInput, { width: 240 }]}
            keyboardType="numeric"
            value={payment
              .toString()
              .replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => setPayment(e.nativeEvent.text)}></TextInput>
          <Text style={styles.text}>원</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>결제하기</Text>
        </TouchableOpacity>

        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={"결제금액오류"}
          alertText={"사용금액이 잔액보다 많습니다."}
          onPress={() => setModalVisible(false)}
        />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
