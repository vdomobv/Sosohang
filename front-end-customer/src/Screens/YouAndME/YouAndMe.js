import styles from "./styles";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";
import YouList from "../../Components/YouList/YouList";

import BuyDummy from "../../Dummys/MyPage/BuyDummy";
const toNameData = BuyDummy

export default function YouAndMe({ navigation }) {

  const handleYouListClick = (toName) => {
    navigation.navigate("YouAndMeStory", { toName: toName });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
        <Title title={"너랑나랑"} />
          <View>
          {toNameData.map((data, index) => {
              return (
                <View key={data.to}>
                  <View style={styles.horizontalLine} />
                  <TouchableOpacity
                    style={styles.youList}
                    onPress={() => handleYouListClick(data.to)}>
                    <YouList props={data} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}

