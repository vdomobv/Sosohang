import styles from "./styles";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";
import YouList from "../../Components/YouList/YouList";
import { getYouList } from "../../Utils/YouAndMeAPI";
import { getMemberSeq } from "../../Utils/MemberAPI";
import LoginRequired from "../../Components/LoginRequired/LoginRequired";

export default function YouAndMe({ navigation }) {
  const [tempUser, setTempUser] = useState();
  const [toNameData, setToNameData] = useState();

  const fetchData = async () => {
    const memberSeq = await getMemberSeq();
    if (memberSeq !== undefined) {
      setTempUser(memberSeq);
    }
  };

  useEffect(() => {
    if (tempUser !== undefined) {
      fetchMemberData();
    }
  }, [tempUser]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const result = await getYouList(tempUser);
      console.log("여기", result);
      setToNameData(result);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleYouListClick = (memberSeq) => {
    navigation.navigate("YouAndMeStory", { memberSeq, tempUser });
  };

  if (tempUser) {
    return (
      <>
        <ScrollView>
          {toNameData ? (
            <View style={styles.container}>
              <Title title={"너랑나랑"} />
              <View>
                {toNameData.map((data, index) => {
                  return (
                    <View key={data.memberSeq}>
                      <View style={styles.horizontalLine} />
                      <TouchableOpacity
                        style={styles.youList}
                        onPress={() => {
                          console.log(data);
                          handleYouListClick(data.memberSeq, tempUser);
                        }}
                      >
                        <YouList props={data} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
        <Tabs navigation={navigation} />
      </>
    );
  } else {
    return <LoginRequired navigation={navigation} />;
  }
}
