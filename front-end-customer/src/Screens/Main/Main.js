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

import Category from "../../Components/Category/Category";
import Line from "../../Components/Line/Line";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import HashTag from "../../Components/HashTag/HashTag";
import Tabs from "../../Components/Tabs/Tabs";
import CategoryData from "../../Dummys/Main/CategoryData";
import MainDummy from "../../Dummys/Main/MainDummy";
import HashTagData from "../../Dummys/Main/HashTagData";
import Carousel from "../../Components/Carousel/Carousel";
import CustomSearchBar from "../../Components/CustomSearchBar/CustomSearchBar";
import Loading from "../../Components/Loading/Loading";

import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import {
  initializeCoords,
  initializeLocation,
  removeData,
} from "../../Utils/Location";

const categoryData = CategoryData;
const dummydata = MainDummy;
const hashTags = HashTagData;

export default function Main({ navigation }) {
  const windowHeight = Dimensions.get("window").height;

  const [waiting, setWaiting] = useState(true);
  const [coords, setCoords] = useState({});
  const [location, setLocation] = useState({});
  const isFocused = useIsFocused();
  const fetchLocation = async () => {
    const resultCoords = await initializeCoords();
    setCoords(resultCoords);

    const resultLocation = await initializeLocation(
      resultCoords.latitude,
      resultCoords.longitude
    );
    setLocation(resultLocation);
    setWaiting(false);
  };

  useEffect(() => {
    fetchLocation();
  }, [isFocused]);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      const routeName = e.data.state.routeNames[e.data.state.index];
    });

    return unsubscribe;
  }, [navigation]);

  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  // console.log(coords, location)
  return waiting ? (
    <Loading />
  ) : (
    <>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.headBox]}>
          <View style={[styles.location]}>
            <Ionicons
              onPress={() => {
                navigation.navigate("Map", { coords, location });
              }}
              name="location-sharp"
              color={"#BFBFBF"}
              size={40}
            />
          </View>
          <View style={{ flex: 6 }}>
            <CustomSearchBar placeholderText={"원하는 상점을 검색해보세요."} />
          </View>
          <View style={[styles.alarm]}>
            <Ionicons
              onPress={() => {
                // 테스트용으로 만들어둔 것입니당
                removeData("location");
                removeData("coords");
              }}
              name="notifications"
              color={"gold"}
              size={40}
            />
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
              return <CarouselItem key={data.name} props={data} />;
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
          <Carousel
            content={hashTags.map((data) => {
              return <HashTag key={data.name} props={data} />;
            })}
          />
          <Carousel
            content={dummydata.map((data) => {
              return <CarouselItem key={data.name} props={data} />;
            })}
          />
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
