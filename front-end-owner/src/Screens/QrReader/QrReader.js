// components
import { View, } from "react-native";
import { useState } from "react";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import Loading from "../../Components/Loading/Loading";
import Tabs from "../../Components/Tabs/Tabs";

export default function QrReader({ navigation }) {
  const [waiting, setWaiting] = useState(false);

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

  return waiting ? (
    <Loading />
  ) : (
    <>
      <View style={styles.container}>
        <Title title={"소소티콘 결제"} />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
