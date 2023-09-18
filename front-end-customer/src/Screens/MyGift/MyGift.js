import styles from "./styles";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Box from "../../Components/Box/Box";

export default function MyGift({ navigation }) {
  return (
    <>Box
      <View style={styles.container}>
        <Title title={"받은 선물함"} />
        <Box>
          
        </Box>

      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
