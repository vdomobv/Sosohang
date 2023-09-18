import styles from "./styles";
import { View, Text, Image, ScrollView } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Line from "../../Components/Line/Line";
import SubTitle from "../../Components/SubTitle/SubTitle";
import Carousel from "../../Components/Carousel/Carousel";

import userDummy from "../../Dummys/MyPage/UserDummy";
import dibsDummy from "../../Dummys/MyPage/DibsDummy";
const user = userDummy;
const dibs = dibsDummy;

export default function MyPage({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Title title={"나의 소소행"} />
        
        <View style={styles.section1}>
          <View style={styles.profile}>
            <Image style={styles.profileImage} source={require("assets/images/bread.png")} />
            <View style={styles.user}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.name}>{user.name}</Text><Text onPress={() => { console.log('이름 수정') }}>  ✏️</Text>
              </View>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
          </View>
          <Image style={styles.stamp} source={require('assets/images/stamp.png')}></Image>
        </View>

        <Line />

        <View style={styles.section2}>
          <View style={styles.header}>
            <SubTitle subTitle={"❤️ 찜 목록"} />
            <Text>상세보기 > </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.carouselContainer]}
          >
            {
              dibs.map(d => <Carousel props={d} />)
            }
          </ScrollView>
        </View>
        <Line />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}

