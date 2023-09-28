import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";
import { useState } from "react";
import { addDib, removeDib } from "../../Utils/DibAPI";

export default function Shop({ data, PressFunction, dibSeq }) {
  const [dibState, setDibState] = useState(dibSeq ? true : false);
  const tempUser = 1;
  

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
              if (dibState) {
                removeDib(tempUser, data.storeSeq);
              } else {
                addDib(tempUser, data.storeSeq);
              }
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
