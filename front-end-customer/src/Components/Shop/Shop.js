import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";
import { useState } from "react";

export default function Shop({ data, PressFunction }) {
  const [dibState, setDibState] = useState(data.dibSeq ? true : false);

  return (
    <View style={styles.container}>
      <SquareImage imageSrc={require("assets/dummyimages/anuek.jpg")} />
      <View style={styles.section}>
        <View style={styles.content}>
          <View style={styles.texts}>
            <Text style={styles.category}>{data.category.categoryName}</Text>
            <SubTitle subTitle={data.storeName} />
          </View>
          <TouchableOpacity
            onPress={() => {
              setDibState(!dibState);
            }}
          >
            <Image
              style={styles.image}
              source={
                dibState
                  ? require("assets/images/heart.png")
                  : require("assets/images/empty_heart.png")
              }
            />
          </TouchableOpacity>
        </View>
        <Text onPress={PressFunction} style={styles.more}>
          상세보기 ＞
        </Text>
      </View>
    </View>
  );
}
