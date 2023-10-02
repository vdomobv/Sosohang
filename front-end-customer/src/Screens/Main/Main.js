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

// utils
import axios from "axios";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { initializeCoords, initializeLocation } from "../../Utils/Location";
import { getRecentStoreByLocation, getAllStoreData, getStoreByLocation, getKeywords, getKeywordStoreByLocation } from "../../Utils/StoreAPI";
import { getMemberSeq } from "../../Utils/MemberAPI";

const categoryData = CategoryData;
const alarmDummy = AlarmDummy;

export default function Main({ navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const [tempUser, setTempUser] = useState();
  const [waiting, setWaiting] = useState(true);
  const [coords, setCoords] = useState({});
  const [location, setLocation] = useState({});
  const [openTooltip, setOpenTooltip] = useState(false);
  const isFocused = useIsFocused();
  const [storeData, setStoreData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [locationStore, setLocationStore] = useState([]);
  const [keywordStore, setKeywordStore] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState();

  // 사용자 로그인 여부 확인
  const fetchData = async () => {
    const memberSeq = await getMemberSeq();
    if (memberSeq !== undefined) {
      setTempUser(memberSeq);
    }
  };

  // 좌표, 위치(동 이름)
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

  // 모든 가게 정보 가져오기 (for 검색)
  const fetchAllStoreData = async () => {
    const result = await getAllStoreData();
    if (result !== undefined) {
      setStoreData(result);
    }
  }

  // 키워드 가져오기
  const fetchKeywords = async () => {
    const result = await getKeywords();
    if (result !== undefined) {
      setKeywords(result);
    }
  }

  // 키워드에 해당하는 상점만 가져오기
  const fetchKewordStore = async (keywordSeq) => {
    const result = await getKeywordStoreByLocation(coords.latitude, coords.longitude, keywordSeq);
    if (result !== undefined) {
      setKeywordStore(result);
      setSelectedKeyword(keywordSeq)
    }
  }

  // 화면 렌더링 전 실행
  useEffect(() => {
    fetchData();
    fetchAllStoreData();
    fetchLocation();
    fetchKeywords();
  }, []);

  // 메인으로 다시 돌아오면 다시 좌표 정보 가져오기
  useEffect(() => {
    fetchLocation();
  }, [isFocused]);

  // 좌표 정보가 바뀌면 해당 좌표 주변 가게 정보 가져오기
  useEffect(() => {
    const fetchStoreByLocation = async () => {
      const recentStores = await getRecentStoreByLocation(coords.latitude, coords.longitude);
      setLocationStore(recentStores);
      const stores = await getStoreByLocation(coords.latitude, coords.longitude);
      setKeywordStore(stores);
    }

    if (coords.latitude !== undefined) {
      fetchStoreByLocation();
    }
  }, [coords])

  // 검색창 입력 저장
  useEffect(() => {
    if (search) {
      setSearchState(true);
    } else {
      setSearchState(false);
    }
  }, [search]);

  // 키보드 바깥 클릭하면 닫히도록
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

  // 검색
  const updateSearch = (data) => {
    setSearch(data);
    updateSearchResult(data);
  };

  // 검색창 상태
  const updateSearchState = () => {
    setSearchState(true);
  };

  // 검색 내용 삭제
  const cancelSearchState = () => {
    setSearchState(false);
    setSearchResult([]);
    setSearch("");
  };

  // 검색 미리 보기
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

  const hashTagItems = keywords.map((data, index) => {
    return <HashTag pressFucntion={() => {
      fetchKewordStore(data.keywordSeq)
    }}
      key={data.keywordSeq} props={data} selectedKeyword={selectedKeyword} />;
  });

  const shopCarousel = locationStore.map((data) => {
    return (
      <CarouselItem
        navigation={navigation}
        onPressFunction={() => {
          navigation.navigate("Shop", { storeSeq: data.storeSeq });
        }}
        key={data.storeSeq}
        props={data}
      />
    );
  });

  const keywordShopCarousel = keywordStore.map((data) => {
    return (
      <CarouselItem
        navigation={navigation}
        onPressFunction={() => {
          navigation.navigate("Shop", { storeSeq: data.storeSeq });
        }}
        key={data.storeSeq}
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
                    navigation.navigate("Map", { coords, location, storeData });
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
            {
              tempUser !== undefined ?
                <Button
                  title="로그인 / 회원가입"
                  onPress={() => navigation.navigate("SignUp")}
                />
                : null
            }
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
              <Carousel content={shopCarousel} />
            </View>

            <Line />
            <View style={[styles.section]}>
              <SectionTitle
                content={"선물 받을 친구의 취향으로 골라보세요! 😘"}
              />
              <Carousel content={hashTagItems} />
              {
                keywordStore.length > 0 ?
                  <Carousel content={keywordShopCarousel} />
                  : <View>
                    <Text style={styles.nothing}>
                      아직 키워드에 해당하는 상점이 없어요 🥲
                    </Text>
                  </View>
              }
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Tabs navigation={navigation} />
    </>
  );
}
