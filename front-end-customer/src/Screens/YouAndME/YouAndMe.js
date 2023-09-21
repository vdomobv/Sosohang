import styles from "./styles";
import { ScrollView, View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import YouList from "../../Components/YouList/YouList";

export default function YouAndMe({ navigation }) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>너랑나랑</Text>
        {/* YouList 컴포넌트 만들기 */}
        <YouList />
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}

