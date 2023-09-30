import styles from "./styles";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useEffect, useState } from "react";

import Title from "../../Components/Title/Title";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Line from "../../Components/Line/Line";
import Product from "../../Components/Product/Product";
import CustomButton from "../../Components/CustomButton/CustomButton";
import DibButton from "../../Components/DibButton/DibButton"
import Loading from "../../Components/Loading/Loading"

import ShopDummy from "../../Dummys/Shop/ShopDummy";

import axios from "axios";
import { getStoreDibData } from "../../Utils/DibAPI";
import { getProduct } from "../../Utils/ProductAPI";
import { getStoreData } from "../../Utils/StoreAPI";
import { addToCart } from "../../Utils/CartAPI";

const Info = ({ logo, data }) => {
  return (
    <View style={{ marginVertical: 3, flexDirection: "row", width: "90%" }}>
      {logo}
      <Text> {data}</Text>
    </View>
  );
};

export default function Shop({ navigation, route }) {
  const tempUser = 1;
  const storeSeq = route.params.storeSeq;
  const [dibState, setDibState] = useState();
  const [product, setProduct] = useState([]);
  const [saleProduct, setSaleProduct] = useState([]);
  const [storeData, setStoreData] = useState();
  const [keywords, setKeywords] = useState([])
  const [checkedProducts, setCheckedProducts] = useState([])
  const [productsAmount, setProductsAmount] = useState([]);
  const [checkedSaleProducts, setCheckedSaleProducts] = useState([]);
  const [saleProductAmount, setSaleProductAmount] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const getKeywords = async () => {
    try {
      const response = await axios.get(
        `http://j9c109.p.ssafy.io:8081/api/v1/store/keywordlist/${storeSeq}`
      );
      setKeywords(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  const fetchData = async () => {
    const storeResult = await getStoreData(storeSeq)
    const result = await getProduct(storeSeq);
    // 찜 상태 불러오기
    const dibData = await getStoreDibData(tempUser, storeSeq);
    setDibState(dibData);

    // 상품 데이터, 세일 상품 데이터 분리
    if (Array.isArray(result)) {
      const regularProducts = result.filter(data => data.productDcrate === null);
      const saleProducts = result.filter(data => data.productDcrate !== null);

      setProduct(regularProducts);
      setSaleProduct(saleProducts);
    }

    setStoreData(storeResult);
  };


  useEffect(() => {
    // 키워드 불러오기
    getKeywords();
    // 상점, 상품 데이터 불러오기
    fetchData();
  }, []);

  // 상품 선택 배열, 상품 개수 배열 생성
  useEffect(() => {
    setCheckedProducts(product.map(() => false))
    setProductsAmount(product.map(() => 1))
    setCheckedSaleProducts(saleProduct.map(() => false))
    setSaleProductAmount(saleProduct.map(() => 1))
  }, [product])


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

    product.forEach((data, index) => {
      if (checkedProducts[index]) {
        setTotalPrice(totalPrice + productsAmount[index] * data.productPrice)
        const temp = {
          ...data,
          count: productsAmount[index],
          storeName: storeData.storeName
        };
        newSelectedProducts.push(temp);
      }
    });

    saleProduct.forEach((data, index) => {
      if (checkedSaleProducts[index]) {
        setTotalPrice(totalPrice + saleProductAmount[index] * data.productPrice)
        const temp = {
          ...data,
          count: saleProductAmount[index],
          storeName: storeData.storeName
        };
        newSelectedProducts.push(temp);
      }
    });

    return newSelectedProducts
  }

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
      })
    }
  }

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

  // 페이지 이동
  useEffect(() => {
    if (shouldNavigate) {
      navigation.navigate("MakeCard", { selectedProducts, totalPrice });
      setShouldNavigate(false);
    }
  }, [shouldNavigate]);

  // 버튼 스크롤 시 표시
  useEffect(() => {
    if (scrollY >= 250) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [scrollY]);

  return (
    <>
      <ScrollView
        onScroll={(e) => {
          setScrollY(e.nativeEvent.contentOffset.y);
        }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.title}>
            <Title title={storeData ? storeData.storeName : 'Loading...'} />
          </View>
          <DibButton userSeq={tempUser} storeSeq={storeData ? storeData.storeSeq : null} dibState={dibState} setDibState={setDibState} />
        </View>

        <Image source={require("assets/images/bread.png")} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.head}>
            <SectionTitle content={storeData ? storeData.category.categoryName : 'Loading...'} />
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
            <Info
              logo={
                <Ionicons color={"#575761"} name="call-outline" size={20} />
              }
              data={storeData ? storeData.storeTell : "Loading.. :)"}
            />
            <Info
              logo={
                <Ionicons color={"#575761"} name="calendar-outline" size={20} />
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
              logo={<Ionicons color={"#575761"} name="car-outline" size={20} />}
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
              data={storeData ? storeData.storeExtraInfo : "준비중이에요 :)"}
            />
          </View>
        </View>
        <Line />
        {saleProduct.length > 0 ?
          <>
            <View style={styles.content}>
              <SectionTitle content={"이때 아니면 못 사는 이벤트 선물! 🔔"} />
              {saleProductList}
            </View>
            <Line />
          </> : null
        }
        <View style={styles.content}>
          <SectionTitle content={"선물 목록 🎁"} />
          {productList}
        </View>
        <View style={styles.blank}></View>
      </ScrollView>
      {showButton && (
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
      )}
    </>
  );
}
