import Title from "../../Components/Title/Title";
import ListItem from "../../Components/ListItem/ListItem";
import styles from "./styles";
import { ScrollView, Text, View } from "react-native";

import shopListDummy from "../../Dummys/Shop/ShopListDummy";

export default function List({ navigation, route }) {
  const category = route.params.category;
  const shops = shopListDummy.map((d, index) => {
    return (
      <ListItem
        PressFunction={() => {
          navigation.navigate("Shop");
        }}
        key={index}
        data={d}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Title title={category} />
      <ScrollView>{shops}</ScrollView>
    </View>
  );
}
