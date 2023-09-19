import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";

import Category from "../../Components/Category/Category";
import Line from "../../Components/Line/Line";
import Carousel from "../../Components/Carousel/Carousel";
import HashTag from "../../Components/HashTag/HashTag";
import Tabs from "../../Components/Tabs/Tabs";

import CategoryData from "../../Dummys/Main/CategoryData";
import MainDummy from "../../Dummys/Main/MainDummy";
import HashTagData from "../../Dummys/Main/HashTagData";

const categoryData = CategoryData;
const dummydata = MainDummy;
const hashTags = HashTagData;

export default function Main({ navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const windwoWidth = Dimensions.get("window").width;

  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  return (
    <>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.headBox]}>
          <View style={[styles.location]}>
            <Ionicons
              onPress={() => {
                navigation.navigate("Map");
              }}
              name="location-sharp"
              color={"#BFBFBF"}
              size={40}
            />
          </View>
          <View style={{ flex: 6 }}>
            <SearchBar
              style={[styles.searchbar]}
              lightTheme
              platform="android"
              searchIcon={false}
              clearIcon={false}
              cancelIcon={false}
              placeholder="원하는 상점을 검색해보세요."
              inputStyle={{ marginHorizontal: 0, width: "100%" }}
            ></SearchBar>
          </View>
          <View style={[styles.alarm]}>
            <Ionicons name="notifications" color={"gold"} size={40} />
          </View>
        </View>
        <View style={[styles.banner, { height: windowHeight * 0.12 }]}>
          <Text style={{ color: "white", textAlign: "center" }}>
            배너 광고 자리입니다.
          </Text>
        </View>
        <View style={[styles.categories]}>
          {categoryData.map((data) => {
            return <Category key={data.name} props={data} />;
          })}
        </View>
        <Line />
        <View style={[styles.section]}>
          <View>
            <Text style={[styles.title]}>
              새로운 곳을 경험해보는 것은 어때요?
              <Image
                source={require("assets/images/new.png")}
                style={{ height: 30, width: 30 }}
              />
            </Text>
            <Text style={[styles.subtitle]}>
              친구에게 새로운 곳에 가볼 경험을 선물해주세요.
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.carouselContainer]}
          >
            {dummydata.map((data) => {
              return <Carousel key={data.name} props={data} />;
            })}
          </ScrollView>
        </View>

        <Line />
        <View style={[styles.section]}>
          <View>
            <Text style={[styles.title]}>
              선물 받을 친구의 취향으로 골라보세요! 😘
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.hashtagConatiner]}
          >
            {hashTags.map((data) => {
              return <HashTag key={data.name} props={data} />;
            })}
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.carouselContainer]}
          >
            {dummydata.map((data) => {
              return <Carousel key={data.name} props={data} />;
            })}
          </ScrollView>
          <Line />
        </View>

        <View style={[styles.section]}>
          <Text style={[styles.title]}>소소행이 뭐에요? 🧐</Text>
          <View style={[styles.intro]}>
            <Image
              style={styles.imageContainer}
              source={require("assets/images/gift.png")}
            />
            <View style={styles.textConatiner}>
              <Text style={styles.text}>사용자에게는</Text>
              <Text style={styles.text}>특별한 선물을</Text>
            </View>

            <Image
              style={styles.imageContainer}
              source={require("assets/images/promotion.png")}
            />
            <View style={styles.textConatiner}>
              <Text style={styles.text}>사장님에게는</Text>
              <Text style={styles.text}>간편한 홍보를</Text>
            </View>
          </View>
          <Button
            title="회원가입"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}
