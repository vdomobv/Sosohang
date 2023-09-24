// components
import { View, } from "react-native";
import { useState } from "react";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import Loading from "../../Components/Loading/Loading";
import Tabs from "../../Components/Tabs/Tabs";

export default function LogIn({ navigation }) {
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
        <Title title={"로그인"} />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
