import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";
import DibButton from "../DibButton/DibButton";

import { useState } from "react";

export default function Shop({ data, PressFunction, dibSeq, tempUser }) {
  const [dibState, setDibState] = useState(dibSeq ? true : false);
  return (
    <View style={styles.container}>
      <SquareImage imageSrc={require("assets/dummyimages/anuek.jpg")} />
      <View style={styles.section}>
        <View style={styles.content}>
          <View style={styles.texts}>
            <Text style={styles.category}>{data.category.categoryName}</Text>
            <SubTitle subTitle={data.storeName} />
          </View>
          {
            tempUser!== undefined ?
              <DibButton dibState={dibState} setDibState={setDibState} userSeq={tempUser} storeSeq={data.storeSeq} />
              : undefined
          }
        </View>
        <Text onPress={PressFunction} style={styles.more}>
          상세보기 ＞
        </Text>
      </View>
    </View>
  );
}
