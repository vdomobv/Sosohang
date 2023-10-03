// components
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

import Title from "../../Components/Title/Title";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import Tabs from "../../Components/Tabs/Tabs";

export default function QrReader({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [balance, setBalance] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    setScanned(false);
  }, []);

  const handleBarCodeScanned = (qrData) => {
    try {
      console.log(JSON.parse(qrData.data));
      axios
        .get(
          `https://j9c109.p.ssafy.io/api/app/users/gift-cards/${
            JSON.parse(qrData.data).uuid
          }/balance`
        )
        .then((res) => {
          setScanned(true);
          setModalVisible(true);
          setBalance(res.data);
          setScannedData(JSON.parse(qrData.data).uuid)
          setWarningMessage("");
        })
        .catch((err) => {
          setScanned(true);
          setModalVisible(true);
          setWarningMessage("유효하지 않은 바코드입니다.");
        });
    } catch (err) {
      setScanned(true);
      setModalVisible(true);
      setWarningMessage("유효하지 않은 바코드입니다.");
    }
  };

  if (hasPermission === null) {
    return <Text>카메라 권한을 요청 중...</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라 접근 권한이 거부되었습니다.</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <Title title={"소소티콘 조회"} />

        <View style={styles.qrContainer}>
          <Text style={[styles.qrText, { fontSize: 20 }]}>
            오프라인 소소티콘 결제
          </Text>
          <View>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.qr}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
            />
          </View>
          <Text style={[styles.qrText, { fontWeight: "bold", fontSize: 24 }]}>
            QR코드를 스캔해주세요!
          </Text>
          {scanned && (
            <View style={styles.scanAgain}>
              <Text
                onPress={() => setScanned(false)}
                style={styles.scanAgainText}>
                다시 스캔
              </Text>
            </View>
          )}
        </View>

        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={
            warningMessage === "" ? `잔액 확인` : `바코드 유효성 검사`
          }
          alertText={
            warningMessage === ""
              ? balance === 0
                ? `사용완료된 쿠폰입니다.`
                : `현재 잔액 : ${balance
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원입니다.`
              : warningMessage
          }
          onPress={ warningMessage === ""
          ? balance === 0? () => setModalVisible(false) : () => {
            setModalVisible(false);
            navigation.navigate("InputPayment", {balance: balance, sosoticon: scannedData});
          } : () => setModalVisible(false)}
        />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
