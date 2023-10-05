import styles from "./styles";
import { Text, TouchableOpacity } from "react-native";

export default function ToShopButton({ navigation, storeSeq }) {
  return (
    <TouchableOpacity onPress={() => {navigation.navigate('Shop', {storeSeq})}}>
      <Ionicons style={styles.shopIcon} name="home-outline" />
    </TouchableOpacity>
  );
}
