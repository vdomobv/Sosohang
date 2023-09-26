import styles from "./styles";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function ShopListItem({ navigation, data, PressFunction }) {
  // console.log(data);
  return (
    <TouchableOpacity onPress={PressFunction} style={styles.container}>
      <SquareImage imageSrc={data.imageUrl} />
      <View style={styles.content}>
        <SubTitle subTitle={data.shopName} />
        <Text>{data.keywords.map(d => {return '#'+d+"   "})}</Text>
        <SectionTitle content={data.address}/>
      </View>
    </TouchableOpacity>
  );
}
