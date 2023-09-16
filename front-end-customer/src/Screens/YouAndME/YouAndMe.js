import styles from "./styles";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";

export default function YouAndMe({navigation}) {
  return (
    <View style={styles.container}>
      <Text>너랑나랑</Text>
      <Tabs navigation={navigation} />
    </View>
  );
}

