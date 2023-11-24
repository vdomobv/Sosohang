import styles from "./styles";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../../Components/Title/Title";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Line from "../../Components/Line/Line";
import Product from "../../Components/Product/Product";
import CustomButton from "../../Components/CustomButton/CustomButton";
import DibButton from "../../Components/DibButton/DibButton";

import axios from "axios";
import { useEffect, useState } from "react";
import { getStoreDibData } from "../../Utils/DibAPI";
import { getProduct } from "../../Utils/ProductAPI";
import { getStoreData, getReviewData } from "../../Utils/StoreAPI";
import { addToCart } from "../../Utils/CartAPI";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { getMemberSeq } from "../../Utils/MemberAPI";
import SectionSubTitle from "../../Components/SectionSubTitle/SectionSubTitle";

const Info = ({ logo, data }) => {
  return (
    <View style={{ marginVertical: 3, flexDirection: "row", width: "90%" }}>
      {logo}
      <Text> {data}</Text>
    </View>
  );
};

export default function Shop({ navigation, route }) {
  const storeSeq = route.params.storeSeq;

  const [dibState, setDibState] = useState();
  const [product, setProduct] = useState([]);
  const [saleProduct, setSaleProduct] = useState([]);
  const [storeData, setStoreData] = useState();
  const [keywords, setKeywords] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [productsAmount, setProductsAmount] = useState([]);
  const [checkedSaleProducts, setCheckedSaleProducts] = useState([]);
  const [saleProductAmount, setSaleProductAmount] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [tempUser, setTempUser] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [toggleInfo, setToggleInfo] = useState(false);

  const getKeywords = async () => {
    try {
      const response = await axios.get(
        `/api/v1/store/keywordlist/${storeSeq}`
      );
      setKeywords(response.data);
    } catch (error) {
      // console.error("Error fetching store data:", error);
    }
  };

  const fetchData = async () => {
    const userData = await getMemberSeq();
    if (userData !== undefined) {
      setTempUser(userData);
    }

    const storeResult = await getStoreData(storeSeq);
    const result = await getProduct(storeSeq);
    const reviewData = await getReviewData(storeSeq);

    // 상품 데이터, 세일 상품 데이터 분리
    if (Array.isArray(result)) {
      const regularProducts = result.filter((data) => data.productDcrate === 0);
      const saleProducts = result.filter((data) => data.productDcrate !== 0);

      setProduct(regularProducts);
      setSaleProduct(saleProducts);
    }

    if (Array.isArray(reviewData)) {
      setReviews(reviewData);
    }

    setStoreData(storeResult);
    // console.log(storeResult);
  };

  useEffect(() => {
    const temp = reviews.reduce((acc, review) => {
      return acc + review.reviewKeywordCount;
    }, 0);

    setReviewTotalCount(temp);
  }, [reviews]);

  useEffect(() => {
    // 찜 상태 불러오기
    if (tempUser !== undefined) {
      const fetchDibData = async () => {
        const dibData = await getStoreDibData(tempUser, storeSeq);
        setDibState(dibData);
      };
      fetchDibData();
    }
  }, [tempUser]);

  useEffect(() => {
    // 키워드 불러오기
    getKeywords();
    // 상점, 상품 데이터 불러오기
    fetchData();
  }, []);

  // 상품 선택 배열, 상품 개수 배열 생성
  useEffect(() => {
    setCheckedProducts(product.map(() => false));
    setProductsAmount(product.map(() => 1));
  }, [product]);

  useEffect(() => {
    setCheckedSaleProducts(saleProduct.map(() => false));
    setSaleProductAmount(saleProduct.map(() => 1));
  }, [saleProduct]);

  // 상품 목록
  const productList = product.map((data, index) => {
    return (
      <Product
        checked={checkedProducts[index]}
        onCheckChange={(checked) => {
          const newCheckedProducts = [...checkedProducts];
          newCheckedProducts[index] = checked;
          setCheckedProducts(newCheckedProducts);
        }}
        amount={productsAmount[index]}
        onAmountChange={(value) => {
          const newProductsAmount = [...productsAmount];
          newProductsAmount[index] = value;
          setProductsAmount(newProductsAmount);
        }}
        data={data}
        key={index}
      />
    );
  });

  // 할인 상품 목록
  const saleProductList = saleProduct.map((data, index) => {
    // console.log(data);
    return (
      <Product
        checked={checkedSaleProducts[index]}
        onCheckChange={(checked) => {
          const newCheckedSaleProducts = [...checkedSaleProducts];
          newCheckedSaleProducts[index] = checked;
          setCheckedSaleProducts(newCheckedSaleProducts);
        }}
        onAmountChange={(value) => {
          const newSaleProductAmount = [...saleProductAmount];
          newSaleProductAmount[index] = value;
          setSaleProductAmount(newSaleProductAmount);
        }}
        data={data}
        amount={saleProductAmount[index]}
        key={index}
      />
    );
  });

  // 선택된 상품
  const getSelectedProduct = () => {
    let newSelectedProducts = [];
    setTotalPrice(0);

    product.forEach((data, index) => {
      if (checkedProducts[index]) {
        setTotalPrice(
          (prevTotal) => prevTotal + productsAmount[index] * data.productPrice
        );
        const temp = {
          ...data,
          count: productsAmount[index],
          storeName: storeData.storeName,
        };
        newSelectedProducts.push(temp);
      }
    });

    saleProduct.forEach((data, index) => {
      if (checkedSaleProducts[index]) {
        setTotalPrice(
          (prevTotal) =>
            prevTotal +
            saleProductAmount[index] *
              data.productPrice *
              (1 - data.productDcrate)
        );
        const temp = {
          ...data,
          count: saleProductAmount[index],
          storeName: storeData.storeName,
        };
        newSelectedProducts.push(temp);
      }
    });

    return newSelectedProducts;
  };

  // 장바구니에 담기
  const putInCart = () => {
    const t1 = checkedProducts.every((val) => val === false);
    const t2 = checkedSaleProducts.every((val) => val === false);
    if (t1 && t2) {
      Alert.alert("메뉴 선택 후 장바구니에 담을 수 있습니다.");
    } else {
      const newSelectedProducts = getSelectedProduct();
      newSelectedProducts.map((data) => {
        addToCart(tempUser, data.productSeq, data.count);
      });
      setModalState(true);
    }
  };

  // 주문할 상품
  const orderProducts = () => {
    // 상품 선택 여부 확인
    const t1 = checkedProducts.every((val) => val === false);
    const t2 = checkedSaleProducts.every((val) => val === false);
    if (t1 && t2) {
      Alert.alert("메뉴 선택 후 선물할 수 있습니다.");
    } else {
      const newSelectedProducts = getSelectedProduct();
      setSelectedProducts(newSelectedProducts);
      setShouldNavigate(true);
    }
  };

  // 리뷰목록
  const reviewList = () => {
    if (reviews.length > 0) {
      return reviews.map((data) => {
        return (
          <View style={styles.reviewItem} key={data.reviewSeq}>
            <Text style={styles.reviewLabel}>
              {data.reviewKeyword.reviewKeywordName}
            </Text>
            <View
              style={[
                {
                  width: `${
                    (data.reviewKeywordCount / reviewTotalCount) * 100
                  }%`,
                },
                styles.bar,
              ]}
            >
              <Text style={styles.reviewText}>{data.reviewKeywordCount}</Text>
            </View>
          </View>
        );
      });
    } else {
      return (
        <View style={styles.noReview}>
          <Text>아직 후기가 없는 상점이에요.</Text>
          <Text>소소티콘 사용 후, 후기를 남겨주세요. 😁</Text>
        </View>
      );
    }
  };

  // 페이지 이동
  useEffect(() => {
    if (shouldNavigate) {
      navigation.navigate("MakeCard", { selectedProducts, totalPrice });
      setShouldNavigate(false);
    }
  }, [shouldNavigate]);

  // 버튼 스크롤 시 표시
  // useEffect(() => {
  //   if (scrollY >= 60) {
  //     setShowButton(true);
  //   } else {
  //     setShowButton(false);
  //   }
  // }, [scrollY]);

  return (
    <>
      <ScrollView
        // onScroll={(e) => {
        //   setScrollY(e.nativeEvent.contentOffset.y);
        // }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.title}>
            <Title title={storeData ? storeData.storeName : "Loading..."} />
          </View>
          {tempUser !== undefined ? (
            <DibButton
              userSeq={tempUser}
              storeSeq={storeData ? storeData.storeSeq : null}
              dibState={dibState}
              setDibState={setDibState}
            />
          ) : undefined}
        </View>

        <Image
          source={
            storeData !== undefined && storeData.storeImage !== null
              ? { uri: storeData.storeImage }
              : require("assets/images/no_img.jpg")
          }
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.head}>
            <SectionTitle
              content={
                storeData ? storeData.category.categoryName : "Loading..."
              }
            />
            <View style={styles.keywords}>
              {keywords.map((keyword, index) => {
                return (
                  <Text key={index} style={{ marginHorizontal: 3 }}>
                    #{keyword.keywordName}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.body}>
            <Info
              logo={<Ionicons color={"#575761"} name="map-outline" size={20} />}
              data={storeData ? storeData.storeLocation : "Loading.. :)"}
            />
            {toggleInfo ? (
              <TouchableOpacity
                onPress={() => {
                  setToggleInfo(!toggleInfo);
                }}
              >
                <Info
                  logo={
                    <Ionicons color={"#575761"} name="call-outline" size={20} />
                  }
                  data={storeData ? storeData.storeTell : "Loading.. :)"}
                />
                <Info
                  logo={
                    <Ionicons
                      color={"#575761"}
                      name="calendar-outline"
                      size={20}
                    />
                  }
                  data={storeData ? storeData.storeHoliday : "Loading.. :)"}
                />
                <Info
                  logo={
                    <Ionicons color={"#575761"} name="time-outline" size={20} />
                  }
                  data={storeData ? storeData.storeWorkhour : "Loading.. :)"}
                />
                <Info
                  logo={
                    <Ionicons color={"#575761"} name="home-outline" size={20} />
                  }
                  data={storeData ? storeData.storeUrl : "Loading.. :)"}
                />
                <Info
                  logo={
                    <Ionicons color={"#575761"} name="car-outline" size={20} />
                  }
                  data={storeData ? storeData.storeParkinglot : "Loading.. :)"}
                />
                <Info
                  logo={
                    <Ionicons
                      color={"#575761"}
                      name="chatbox-ellipses-outline"
                      size={20}
                    />
                  }
                  data={storeData ? storeData.storeExtraInfo : "Loading.. :)"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setToggleInfo(!toggleInfo);
                }}
              >
                <Text style={styles.toggleInfo}>상점 정보 더보기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Line />
        <View style={styles.content}>
          <SectionTitle content={"여기는 어떤 곳이에요? 🤔"} />
          <Text>후기는 내 선물함의 사용완료 탭에서 남길 수 있어요.</Text>
          <View style={styles.reviewlist}>{reviewList()}</View>
        </View>
        <Line />
        {saleProduct.length > 0 ? (
          <>
            <View style={styles.content}>
              <SectionTitle content={"이때 아니면 못 사는 이벤트 선물! 🔔"} />
              {saleProductList}
            </View>
            <Line />
          </>
        ) : null}
        <View style={styles.content}>
          <SectionTitle content={"선물 목록 🎁"} />
          {productList}
        </View>
        <View style={styles.blank}></View>
      </ScrollView>
      {tempUser !== undefined ? (
        <View style={styles.buttons}>
          <CustomButton
            customStyles={{ backgroundColor: "#FFBF46" }}
            content={<Text style={styles.text}>장바구니</Text>}
            pressFuction={putInCart}
          />
          <CustomButton
            content={<Text style={styles.text}>선물하기</Text>}
            pressFuction={orderProducts}
          />
        </View>
      ) : (
        <View style={styles.buttons}>
          <CustomButton
            customStyles={{ backgroundColor: "#FFBF46" }}
            content={
              <Text style={styles.text}>선물 결제는 로그인 후 가능합니다.</Text>
            }
            pressFuction={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      )}

      <CustomModal
        modalState={modalState}
        content={
          <View>
            <View>
              <SectionTitle
                content={<Text>장바구니에 상품을 담았어요.</Text>}
              />
              <SectionTitle content={<Text>장바구니로 이동할까요?</Text>} />
              <Text></Text>
            </View>
            <View style={styles.modalButtons}>
              <CustomButton
                content={<Text style={styles.modalText}>계속 쇼핑하기</Text>}
                pressFuction={() => {
                  setModalState(false);
                }}
              />
              <CustomButton
                customStyles={{ backgroundColor: "#FFBF46" }}
                content={<Text style={styles.modalText}>이동하기</Text>}
                pressFuction={() => {
                  setModalState(false);
                  navigation.navigate("Cart");
                }}
              />
            </View>
          </View>
        }
      />
    </>
  );
}
