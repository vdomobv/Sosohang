import styles from "./styles";
import { ScrollView, View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";

export default function YouAndMe({ navigation }) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text>너랑나랑</Text>
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}

