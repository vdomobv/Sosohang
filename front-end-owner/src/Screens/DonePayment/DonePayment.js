import styles from "./styles";
import { View } from "react-native";

import SquareImage from "../../Components/SquareImage/SquareImage";
import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";

export default function DonePayment({ navigation }) {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.image}>
          <SquareImage imageSrc={require("assets/images/giftbox.gif")} />
        </View>
        <View style={styles.button}>
          <Title title={"결제가 완료 되었습니다!"} />
        </View>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
