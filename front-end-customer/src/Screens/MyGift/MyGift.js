import styles from "./styles";
import React, { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";

import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import ReceivedGift from "../../Components/Gift/ReceivedGift";
import Tabs from "../../Components/Tabs/Tabs";
import { getMyGiftList } from "../../Utils/MyGiftAPI";
import { getMemberSeq } from "../../Utils/MemberAPI";
import LoginRequired from "../../Components/LoginRequired/LoginRequired";
import { useFocusEffect } from "@react-navigation/native";

export default function MyGift({ navigation, route }) {
  // console.log("여기", route.params.activatedTabValue)
  const [activatedTab, setActivatedTab] = useState(route.params ? false : true);
  // const [activatedTab, setActivatedTab] = useState(true);

  // 더미 아님. 찐임.
  const [dummy, setDummy] = useState([]);
  const [tempUser, setTempUser] = useState();

  const fetchData = async () => {
    const memberSeq = await getMemberSeq();
    if (memberSeq !== undefined) {
      setTempUser(memberSeq);
      fetchMemberData(memberSeq);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      console.log(tempUser);
    }, [])
  );


  useEffect(() => {
    fetchData();
  }, []);

  const fetchMemberData = async (user) => {
    try {
      const result = await getMyGiftList(user);
      setDummy(result);
      console.log("여기", result);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleGiftClick = (giftData) => {
    navigation.navigate("MyGiftDetail", { giftData });
  };

  // useEffect(() => {
  //   if (tempUser !== undefined) {
  //     fetchMemberData();
  //   }
  // }, [tempUser]);

  const usableGifts = dummy
    .filter((d) => (d.sosoticonStatus === 1) === true)
    .map((d, index) => {
      return (
        <ReceivedGift
          onPress={() => handleGiftClick(d)}
          data={d}
          key={index}
          usable={true}
        />
      );
    });

  const unusableGifts = dummy
    .filter((d) => (d.sosoticonStatus === 2) === true)
    .map((d, index) => {
      return (
        <ReceivedGift
          onPress={() => handleGiftClick(d)}
          data={d}
          key={index}
          usable={false}
        />
      );
    });

  if (tempUser) {
    return (
      <>
        <View style={styles.container}>
          <Title title={"받은 선물함"}></Title>
          <View style={styles.giftTabs}>
            <TouchableOpacity
              onPress={() => {
                if (!activatedTab) {
                  setActivatedTab(!activatedTab);
                }
              }}
              style={[activatedTab ? styles.tab : styles.deactivated]}
            >
              <SubTitle subTitle={"사용가능"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (activatedTab) {
                  setActivatedTab(!activatedTab);
                }
              }}
              style={[!activatedTab ? styles.tab : styles.deactivated]}
            >
              <SubTitle subTitle={"사용완료"} />
            </TouchableOpacity>
          </View>
          <View style={styles.tabPage}>
            <ScrollBox content={activatedTab ? usableGifts : unusableGifts} />
          </View>
        </View>
        <Tabs navigation={navigation} />
      </>
    );
  } else {
    return <LoginRequired navigation={navigation} />;
  }
}
