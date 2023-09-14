import { View, Button, Text } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function Main({ navigation }) {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box]}>
        <View style={[styles.box, { flexDirection: "row" }]}>
          <View style={[styles.location]}>
            <Ionicons name="location-sharp" color={"#BFBFBF"} size={40} />
          </View>
          <View style={{ flex: 6 }}>
            
          </View>
        </View>
        <View style={[styles.box, { backgroundColor: "purple" }]}></View>
        <View style={[styles.box, { backgroundColor: "black" }]}></View>
        {/* <Button title="장바구니" onPress={() => navigation.navigate("Cart")} />
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
        /> */}
      </View>
      <View style={[styles.box, { backgroundColor: "blue" }]}></View>
      <View style={[styles.box, { backgroundColor: "yellow" }]}></View>
      <View style={[styles.box, { backgroundColor: "green" }]}></View>
    </View>
  );
}
