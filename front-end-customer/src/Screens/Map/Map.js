import styles from "./styles";
import { View, Text } from "react-native";

export default function Map() {
    return (
      <View style={styles.container}>
        <Text>지도</Text>
        
      <Tabs navigation={navigation}/>
      </View>

    );
  }
  
  