import styles from "./styles";
import { View, Text, Image } from "react-native";

import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";

export default function Shop({ data }) {
  return (
    <View style={styles.container}>
      <SquareImage imageSrc={require("assets/dummyimages/anuek.jpg")} />
      <View style={styles.section}>
        <View style={styles.content}>
          <View style={styles.texts}>
            <Text style={styles.category}>{data.category.categoryName}</Text>
            <SubTitle subTitle={data.storeName} />
          </View>
          <Image
            style={styles.image}
            source={require("assets/images/heart.png")}
          />
        </View>
        <Text style={styles.more}>상세보기 ＞</Text>
      </View>
    </View>
  );
}
