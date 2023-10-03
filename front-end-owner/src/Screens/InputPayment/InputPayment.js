// components
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";
import axios from "axios";

export default function InputPayment({ navigation, route }) {
  const { balance, sosoticon } = route.params;
  const [payment, setPayment] = useState("");
  const handlePayment = function () {
    if (payment !== "") {
      axios
        .put("/api/app/users/gift-cards/deductAmount", {
          sosoticonCode: sosoticon,
          amount: payment,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      navigation.navigate("DonePayment");
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
            value={payment}
            onChange={(e) => setPayment(e.target.value)}></TextInput>
          <Text style={styles.text}>원</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>결제하기</Text>
        </TouchableOpacity>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
