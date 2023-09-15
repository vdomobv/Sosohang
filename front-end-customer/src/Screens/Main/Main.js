import { View, Image, Text, ScrollView, Dimensions } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";

import Category from "../../Components/Category/Category";
import Line from "../../Components/Line/Line";
import Carousel from "../../Components/Carousel/Carousel";
import HashTag from "../../Components/HashTag/HashTag";

const categoryData = [
  { name: "카페/제과", image: require("assets/images/bread.png") },
  { name: "음식점", image: require("assets/images/noodle.png") },
  { name: "생활/소품", image: require("assets/images/necessaries.png") },
  { name: "여가/체험", image: require("assets/images/palette.png") },
  { name: "건강/뷰티", image: require("assets/images/health_beauty.png") },
];

const dummydata = [
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
  {
    name: "아늑",
    address: "광주 광산구 수완로 50번길 34-4 1층",
    image: require("assets/dummyimages/아늑.jpg"),
  },
];

const hashTags = [
  { name: "#아늑한" },
  { name: "#감성적인" },
  { name: "#아기자기한" },
  { name: "#맛잘알" },
  { name: "#커피장인" },
  { name: "#넓은" },
];

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
            <Ionicons name="location-sharp" color={"#BFBFBF"} size={40} />
          </View>
          <View style={{ flex: 6 }}>
            <SearchBar
              style={[styles.searchbar]}
              lightTheme
              platform="android"
              searchIcon={null}
              clearIcon={null}
              cancelIcon={null}
              placeholder="원하는 상점을 검색해보세요."
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
            return <Category props={data} />;
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
              return <Carousel props={data} />;
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
              return <HashTag props={data} />;
            })}
          </ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.carouselContainer]}
          >
            {dummydata.map((data) => {
              return <Carousel props={data} />;
            })}
          </ScrollView>
          <Line />
        </View>

        <View style={[styles.section]}>
          <Text style={[styles.title]}>소소행이 뭐에요? 🧐</Text>
          <View style={{ flexDirection: "row", justifyContent:"space-evenly" }}>
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
        </View>
      </ScrollView>
      <View></View>
    </>
  );
}
