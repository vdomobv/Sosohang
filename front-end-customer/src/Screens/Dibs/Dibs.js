import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import Carousel from "../../Components/Carousel/Carousel"
import HashTag from "../../Components/HashTag/HashTag";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Shop from "../../Components/Shop/Shop";

import CategoryData from "../../Dummys/Main/CategoryData";
import { getDibData } from "../../Utils/DibAPI";
import { useEffect, useState } from "react";

export default function Dibs({ navigation }) {
  const allCategory = [{ name: '전체' }, ...CategoryData];

  const [dibData, setDibData] = useState([]);
  const tempUser = 1;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDibData(tempUser);
      setDibData(result);
    };

    fetchData();
  }, [dibData]);


  return (
    <View style={styles.container}>
      <Title title={"찜 목록"} />
      <View>
        <Carousel content={allCategory.map((tag, index) => {
          return <HashTag key={index} props={tag} />
        })} />
      </View>
      <ScrollBox content={dibData.map((d, index) => {
        return (<Shop key={index} data={d.store} dibSeq={d.dibSeq}
          PressFunction={() => {
            navigation.navigate('Shop', { data : d.store})
        }}/>)
      })} />
    </View>

  );
}

