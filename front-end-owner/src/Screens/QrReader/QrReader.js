// components
import { Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { BarCodeScanner } from 'expo-barcode-scanner';

import Title from "../../Components/Title/Title";
// import Loading from "../../Components/Loading/Loading";
import Tabs from "../../Components/Tabs/Tabs";

export default function QrReader({ navigation }) {
  // const [waiting, setWaiting] = useState(true);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`바코드 유형: ${type}\n바코드 데이터: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>카메라 권한을 요청 중...</Text>;

  }
  if (hasPermission === false) {
    return <Text>카메라 접근 권한이 거부되었습니다.</Text>;
  }


  // const fetchLocation = async () => {
  //   const resultCoords = await initializeCoords();
  //   setCoords(resultCoords);

  //   const resultLocation = await initializeLocation(
  //     resultCoords.latitude,
  //     resultCoords.longitude
  //   );
  //   setLocation(resultLocation);
  //   setWaiting(false);
  // };

  return (
    // waiting ? (
    //   <Loading />
    // ) : (
    <>
      <View style={styles.container}>
        <Title title={"소소티콘 결제"} />
        {/* <Text>오프라인 소소티콘 결제</Text> */}
        {/* <Text>QR코드를 스캔해주세요!</Text> */}
        <View style={styles.qrContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <View style={styles.scanAgain}>
              <Text onPress={() => setScanned(false)} style={styles.scanAgainText}>
                다시 스캔
              </Text>
            </View>
          )}
        </View>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
