import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import Carousel from "../../Components/Carousel/Carousel"
import HashTag from "../../Components/HashTag/HashTag";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Shop from "../../Components/Shop/Shop";

import CategoryData from "../../Dummys/Main/CategoryData";


export default function Dibs({ route, navigation }) {
  const dibs = route.params.dibs || {};

  const allCategory = [{ name: '전체' }, ...CategoryData];

  return (
    <View style={styles.container}>
      <Title title={"찜 목록"} />
      <View>
        <Carousel content={allCategory.map((tag, index) => {
          return <HashTag key={index} props={tag} />
        })} />
      </View>
      <ScrollBox content={dibs.map((d, index) => {
        return (<Shop key={index} data={d.store} />)
      })} />
    </View>

  );
}

