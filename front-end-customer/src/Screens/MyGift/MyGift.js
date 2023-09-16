import styles from "./styles";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";

export default function MyGift({navigation}) {
    return (
      <View style={styles.container}>
        <Text>받은 선물함</Text>
        
      <Tabs navigation={navigation}/>
      </View>
    );
  }
  
  