// components
import { View, } from "react-native";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";

export default function AddStamp({ navigation }) {

  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
