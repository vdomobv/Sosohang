import styles from "./styles";
import { ScrollView, View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import YouList from "../../Components/YouList/YouList";

// import CategoryData from "../../Dummys/Main/CategoryData";


const youListData = [{name: "SSAFY 9기 정빈"}, {name: "민규"}, {name: "지혜"}, {name: "효선"}, {name: "지은"}];

export default function YouAndMe({ navigation }) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.title}>너랑나랑</Text>
        <View style={[styles.categories]}>
          {youListData.map((data) => {
            return <YouList key={data.name} props={data} />;
          })}
        </View>
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}

