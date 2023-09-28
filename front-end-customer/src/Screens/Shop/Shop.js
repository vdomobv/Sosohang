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

import ShopDummy from "../../Dummys/Shop/ShopDummy";
import ProductDummy from "../../Dummys/Shop/ProductDummy";
import SaleProductDummy from "../../Dummys/Shop/SaleProductDummy";
import shopDummy from "../../Dummys/Shop/ShopDummy";

import axios from "axios";

const Info = ({ logo, data }) => {
  return (
    <View style={{ marginVertical: 3, flexDirection: "row", width: "90%" }}>
      {logo}
      <Text> {data}</Text>
    </View>
  );
};

export default function Shop({ navigation, route }) {
  const storeData = route.params.data;
  const [keywords, setKeywords] = useState([])
  const [checkedProducts, setCheckedProducts] = useState(
    ProductDummy.map(() => false)
  );
  const [productsAmount, setProductsAmount] = useState(
    ProductDummy.map(() => 1)
  );
  const [checkedSaleProducts, setCheckedSaleProducts] = useState(
    SaleProductDummy.map(() => false)
  );
  const [saleProductAmount, setSaleProductAmount] = useState(
    SaleProductDummy.map(() => 1)
  );
  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // 상품 목록
  const productList = ProductDummy.map((data, index) => {
    return (
      <Product
        checked={checkedProducts[index]}
        onCheckChange={(checked) => {
          const newCheckedProducts = [...checkedProducts];
          newCheckedProducts[index] = checked;
          setCheckedProducts(newCheckedProducts);
        }}
        onAmountChange={(value) => {
          const newProductsAmount = [...productsAmount];
          newProductsAmount[index] = value;
          setProductsAmount(newProductsAmount);
        }}
        data={data}
        amount={productsAmount[index]}
        key={index}
      />
    );
  });

  // 할인 상품 목록
  const saleProductList = SaleProductDummy.map((data, index) => {
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

  // 주문할 상품
  const orderProducts = () => {
    const t1 = checkedProducts.every((val) => val === false);
    const t2 = checkedSaleProducts.every((val) => val === false);
    if (t1 && t2) {
      Alert.alert("메뉴 선택 후 선물할 수 있습니다.");
    } else {
      let newSelectedProducts = [];

      ProductDummy.forEach((data, index) => {
        if (checkedProducts[index]) {
          const temp = {
            ...data,
            count: productsAmount[index],
            shopName: shopDummy.shopName,
          };
          newSelectedProducts.push(temp);
        }
      });

      SaleProductDummy.forEach((data, index) => {
        if (checkedSaleProducts[index]) {
          const temp = {
            ...data,
            count: saleProductAmount[index],
            shopName: shopDummy.shopName,
          };
          newSelectedProducts.push(temp);
        }
      });

      setSelectedProducts(newSelectedProducts);
      setShouldNavigate(true);
    }
  };

  useEffect(() => {
    const getKeywords = async () => {
        console.log(storeData);
      try {
        const response = await axios.get(
          `http://j9c109.p.ssafy.io:8081/api/v1/store/keywordlist/${storeData.storeSeq}`
        );
        setKeywords(response.data);
        
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    getKeywords();
  }, []);

  // 페이지 이동
  useEffect(() => {
    if (shouldNavigate) {
      navigation.navigate("MakeCard", { selectedProducts });
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
        <Title title={storeData.storeName} />
        <Image source={ShopDummy.imageUrl} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.head}>
            <SectionTitle content={storeData.category.categoryName} />
            <View style={styles.keywords}>
              {ShopDummy.keywords.map((keyword, index) => {
                return (
                  <Text key={index} style={{ marginHorizontal: 3 }}>
                    # {keyword}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.body}>
            <Info
              logo={<Ionicons color={"#575761"} name="map-outline" size={20} />}
              data={storeData.storeLocation || "준비중이에요 :)"}
            />
            <Info
              logo={
                <Ionicons color={"#575761"} name="call-outline" size={20} />
              }
              data={storeData.storeTell || "준비중이에요 :)"}
            />
            <Info
              logo={
                <Ionicons color={"#575761"} name="calendar-outline" size={20} />
              }
              data={storeData.storeHoliday || "준비중이에요 :)"}
            />
            <Info
              logo={
                <Ionicons color={"#575761"} name="time-outline" size={20} />
              }
              data={storeData.storeWorkhour || "준비중이에요 :)"}
            />
            <Info
              logo={
                <Ionicons color={"#575761"} name="home-outline" size={20} />
              }
              data={storeData.storeUrl || "준비중이에요 :)"}
            />
            <Info
              logo={<Ionicons color={"#575761"} name="car-outline" size={20} />}
              data={storeData.storeParkinglot || "준비중이에요 :)"}
            />
            <Info
              logo={
                <Ionicons
                  color={"#575761"}
                  name="chatbox-ellipses-outline"
                  size={20}
                />
              }
              data={storeData.storeExtraInfo || "준비중이에요 :)"}
            />
          </View>
        </View>
        <Line />
        <View style={styles.content}>
          <SectionTitle content={"이때 아니면 못 사는 이벤트 선물! 🔔"} />
          {saleProductList}
        </View>
        <Line />
        <View style={styles.content}>
          <SectionTitle content={"선물 목록 🎁"} />
          {productList}
        </View>
        <View style={styles.blank}></View>
      </ScrollView>
      {showButton && (
        <View style={styles.button}>
          <CustomButton
            content={<Text style={styles.text}>선물하기</Text>}
            pressFuction={orderProducts}
          />
        </View>
      )}
    </>
  );
}
