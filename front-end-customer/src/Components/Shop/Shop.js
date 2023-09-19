import styles from "./styles";
import { View, Text, Image } from "react-native";

import SqureImage from "../SquareImage/SqureImage";
import SubTitle from "../SubTitle/SubTitle";

export default function Shop({ data }) {
  return (
    <View style={styles.container}>
      <SqureImage imageSrc={data.image} />
      <View style={styles.section}>
        <View style={styles.content}>
          <View style={styles.texts}>
            <Text style={styles.category}>{data.category}</Text>
            <SubTitle subTitle={data.name} />
          </View>
          <Image style={styles.image} source={require('assets/images/heart.png')} />
        </View>
        <Text style={styles.more}>상세보기 ＞</Text>
      </View>
    </View>
  )
}
