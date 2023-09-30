// components
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

import Category from "../../Components/Category/Category";
import Line from "../../Components/Line/Line";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import HashTag from "../../Components/HashTag/HashTag";
import Tabs from "../../Components/Tabs/Tabs";
import Carousel from "../../Components/Carousel/Carousel";
import CustomSearchBar from "../../Components/CustomSearchBar/CustomSearchBar";
import Loading from "../../Components/Loading/Loading";
import CustomTooltip from "../../Components/CustomTooltips/CustomTooltips";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Alarm from "../../Components/Alarm/Alarm";
import SectionSubTitle from "../../Components/SectionSubTitle/SectionSubTitle";

// dummys
import AlarmDummy from "../../Dummys/Main/AlarmDummy";
import CategoryData from "../../Dummys/Main/CategoryData";
import MainDummy from "../../Dummys/Main/MainDummy";
import HashTagData from "../../Dummys/Main/HashTagData";

// utils
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { initializeCoords, initializeLocation } from "../../Utils/Location";

const categoryData = CategoryData;
const dummydata = MainDummy;
const hashTags = HashTagData;
const alarmDummy = AlarmDummy;

export default function Main({ navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const [waiting, setWaiting] = useState(true);
  const [coords, setCoords] = useState({});
  const [location, setLocation] = useState({});
  const [openTooltip, setOpenTooltip] = useState(false);
  const isFocused = useIsFocused();
  const [storeData, setStoreData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

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
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://j9c109.p.ssafy.io:8081/api/v1/store"
        );
        setStoreData(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    getData();
    fetchLocation();
  }, []);

  useEffect(() => {
    if (search) {
      setSearchState(true);
    } else {
      setSearchState(false);
    }
  }, [search]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        cancelSearchState();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const updateSearch = (data) => {
    setSearch(data);
    // console.log(search);
    updateSearchResult(data);
  };

  const updateSearchState = () => {
    setSearchState(true);
  };

  const cancelSearchState = () => {
    setSearchState(false);
    setSearchResult([]);
    setSearch("");
  };

  const updateSearchResult = (currentSearch) => {
    let result = storeData
      .filter((data) => data.storeName.includes(currentSearch) === true)
      .slice(0, 10);
    setSearchResult(result);
  };

  const alarms = alarmDummy.map((data, index) => (
    <Alarm key={index} data={data} />
  ));

  const category = categoryData.map((data, index) => {
    return (
      <Category
        key={index}
        props={data}
        PressFunction={() => {
          navigation.navigate("List", { category: data.name, categorySeq: data.categorySeq });
        }}
      />
    );
  });

  const hashTagItems = hashTags.map((data, index) => {
    return <HashTag key={index} props={data} />;
  });

  const carouselDummy = dummydata.map((data) => {
    return (
      <CarouselItem
        navigation={navigation}
        onPressFunction={() => {
          navigation.navigate("Shop");
        }}
        key={data.name}
        props={data}
      />
    );
  });

  return waiting ? (
    <Loading />
  ) : (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
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
                  size={30}
                />
                <Text style={styles.subtitle}>{location}</Text>
              </View>
              <View style={styles.searchbar}>
                <CustomSearchBar
                  updateSearch={updateSearch}
                  cancelSearchState={cancelSearchState}
                  updateSearchState={updateSearchState}
                  placeholderText={"원하는 상점을 검색해보세요."}
                  search={search}
                />
              </View>
              <CustomTooltip
                info={
                  <Ionicons name="notifications" color={"gold"} size={35} />
                }
                contents={alarms}
                openTooltip={openTooltip}
              />
            </View>

            {searchState && (
              <View style={styles.serachResult}>
                {searchResult.map((data) => {
                  return (
                    <TouchableOpacity
                      key={data.storeSeq}
                      onPress={() => {
                        navigation.navigate("Shop", { data });
                      }}
                      style={styles.searchList}
                    >
                      <Text>{data.storeName}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <View style={[styles.section]}>
              <SectionTitle content={"소소행이 뭐에요? 🧐"} />
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
            </View>
            <Button
              title="회원가입"
              onPress={() => navigation.navigate("SignUp")}
            />

            {/* <View style={[styles.banner, { height: windowHeight * 0.12 }]}>
              <Title title={"배너 광고 자리입니다."} />
            </View> */}
            <View style={[styles.categories]}>{category}</View>
            <Line />
            <View style={[styles.section]}>
              <View>
                <SectionTitle
                  content={"새로운 곳을 경험해보는 것은 어때요? 🆕"}
                />
                <SectionSubTitle
                  content={"친구에게 새로운 곳에 가볼 경험을 선물해주세요."}
                />
              </View>
              <Carousel content={carouselDummy} />
            </View>

            <Line />
            <View style={[styles.section]}>
              <SectionTitle
                content={"선물 받을 친구의 취향으로 골라보세요! 😘"}
              />
              <Carousel content={hashTagItems} />
              <Carousel content={carouselDummy} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Tabs navigation={navigation} />
    </>
  );
}
