import styles from "./styles";
import { View, Text } from "react-native";

import SquareImage from "../SquareImage/SquareImage";
import SubTitle from "../SubTitle/SubTitle";
import DibButton from "../DibButton/DibButton";

import { useState, useEffect, useCallback } from "react";
import { getStoreDibData } from "../../Utils/DibAPI";

import { useFocusEffect } from "@react-navigation/native";

export default function Shop({ data, PressFunction, dibSeq, tempUser }) {
  const [dibState, setDibState] = useState(dibSeq ? true : false);

  const fetchData = async () => {
    if (tempUser && data.storeSeq) {
      try {
        const result = await getStoreDibData(tempUser, data.storeSeq);
        setDibState(result);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [data, tempUser])
  );

  useEffect(() => {
    fetchData();
  }, [data, tempUser]);

  return (
    <View style={styles.container}>
      <SquareImage
        imageSrc={
          data.storeImage === undefined || data.storeImage === null
            ? require("assets/images/no_img.jpg")
            : { uri: data.storeImage }
        }
      />
      <View style={styles.section}>
        <View style={styles.content}>
          <View style={styles.texts}>
            <Text style={styles.category}>{data.category.categoryName}</Text>
            <SubTitle subTitle={data.storeName} />
          </View>
          {tempUser !== undefined ? (
            <DibButton
              dibState={dibState}
              setDibState={setDibState}
              userSeq={tempUser}
              storeSeq={data.storeSeq}
            />
          ) : undefined}
        </View>
        <Text onPress={PressFunction} style={styles.more}>
          상세보기 ＞
        </Text>
      </View>
    </View>
  );
}
