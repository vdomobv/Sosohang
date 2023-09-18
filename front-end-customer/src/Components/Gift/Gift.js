import styles from "./styles";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";

export default function MyGift({ navigation }) {
  return (
    <View style={styles.container}>
      <Title title={"받은 선물함"} />

      <Tabs navigation={navigation} />
    </View>
  );
}
