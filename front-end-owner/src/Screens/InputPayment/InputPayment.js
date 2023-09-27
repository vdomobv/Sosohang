// components
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";

export default function InputPayment({ navigation }) {

  const handlePayment = function () {
    navigation.navigate("DonePayment")
  }

  return (
    <>
      <View style={styles.container}>
        <Title title={"소소티콘 결제"} />

        <View style={[styles.inputContainer, { marginTop: 50 }]}>
          <Text style={styles.text}>잔액</Text>
          <TextInput
            style={[styles.textInput, { width: 200 }]}
            keyboardType="numeric"
            // placeholder="QR data 넣기"
          ></TextInput>
          <Text style={styles.text}>원</Text>
        </View>


        <Text style={[styles.text, { marginTop: 50 }]}>결제 금액을 입력해 주세요!</Text>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            style={[styles.textInput, { width: 240 }]}
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.text}>원</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
        onPress={handlePayment}
        >
          <Text style={styles.buttonText}>
            결제하기
          </Text>
        </TouchableOpacity>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
