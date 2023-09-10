import { View, Button, Text } from "react-native";
import styles from "./styles";

export default function Main({navigation}) {
    return (
      <View style={styles.container}>
        <Text>메인</Text>
        <Button
        title="장바구니"
        onPress={() => navigation.navigate("Cart")}
      />
        <Button
        title="너랑나랑"
        onPress={() => navigation.navigate("YouAndMe")}
      />
        <Button
        title="받은 선물함"
        onPress={() => navigation.navigate("MyGift")}
      />
        <Button
        title="마이페이지"
        onPress={() => navigation.navigate("MyPage")}
      />
      </View>
    );
  }
  
  