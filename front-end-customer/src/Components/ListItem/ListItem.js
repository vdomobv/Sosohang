import styles from "./styles";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function ListItem({ navigation, data, PressFunction }) {
  // console.log(data);
  return (
    <TouchableOpacity onPress={PressFunction} style={styles.container}>
      <SquareImage imageSrc={require('assets/images/bread.png')} />
      <View style={styles.content}>
        <SubTitle subTitle={data.storeName} />
        <Text>{"#임시   #해시태그   #입니다."}</Text>
        <SectionTitle content={data.storeLocation}/>
      </View>
    </TouchableOpacity>
  );
}
