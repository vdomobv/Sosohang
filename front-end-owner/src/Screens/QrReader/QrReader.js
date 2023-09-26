// components
import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { BarCodeScanner } from 'expo-barcode-scanner';

import Title from "../../Components/Title/Title";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import Tabs from "../../Components/Tabs/Tabs";

export default function QrReader({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(true);
    setScannedData({ type, data }); // 스캔한 데이터 업데이트
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

          <Text style={[styles.qrText, { fontSize: 20 }]}>오프라인 소소티콘 결제</Text>
          <View style={styles.qrBorder}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.qr}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
            />

          </View>
          <Text style={[styles.qrText, { fontWeight: 'bold', fontSize: 24 }]}>QR코드를 스캔해주세요!</Text>
          {scanned && (
            <View style={styles.scanAgain}>
              <Text onPress={() => setScanned(false)} style={styles.scanAgainText}>
                다시 스캔
              </Text>
            </View>
          )}
        </View>

        {/* 사용 중이라면 */}
        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={`잔액 확인`}
          alertText={`현재 잔액 : ${scannedData?.type} 원\n상품 금액: ${scannedData?.data} 원`}
          // alertText={`바코드 유형: ${scannedData?.type}\n바코드 데이터: ${scannedData?.data}`}
          targetScreen="InputPayment"
        />

        {/* 사용 완료용 모달 */}
        {/* <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={"사용 완료"}
          alertText={`2023.09.13 에\n사용되었어요.`}
          // ${사용일자}
          // alertText={`${scannedData?.type}에\n사용되었어요.`}
          targetScreen="InputPayment"
        /> */}

      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
