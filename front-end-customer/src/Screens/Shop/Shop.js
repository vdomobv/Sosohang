import styles from "./styles";
import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ShopDummy from "../../Dummys/Shop/ShopDummy";
import Title from "../../Components/Title/Title";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Line from "../../Components/Line/Line";
import ProductDummy from "../../Dummys/Shop/ProductDummy";
import Product from "../../Components/Product/Product";

const shopDummy = ShopDummy;
const productDummy = ProductDummy;

const Info = ({ logo, data }) => {
    return (
        <View style={{ marginVertical: 3, flexDirection: 'row', width: '90%' }}>
            {logo}<Text>  {data}</Text>
        </View>
    )
}

export default function Shop({ navigation }) {
    return <ScrollView style={styles.container}>
        <Title title={shopDummy.shopName} />
        <Image source={shopDummy.imageUrl} style={styles.image} />
        <View style={styles.content}>
            <View style={styles.head}>
                <SectionTitle content={shopDummy.category} />
                <View style={styles.keywords}>
                    {shopDummy.keywords.map((keyword, index) => {
                        return <Text key={index} style={{ marginHorizontal: 3 }}># {keyword}</Text>
                    })}
                </View>
            </View>
            <View style={styles.body}>
                <Info logo={<Ionicons color={'#575761'} name="map-outline" size={20} />} data={shopDummy.address || "준비중이에요 :)"} />
                <Info logo={<Ionicons color={'#575761'} name="call-outline" size={20} />} data={shopDummy.phone || "준비중이에요 :)"} />
                <Info logo={<Ionicons color={'#575761'} name="time-outline" size={20} />} data={shopDummy.workHours || "준비중이에요 :)"} />
                <Info logo={<Ionicons color={'#575761'} name="home-outline" size={20} />} data={shopDummy.homepage || "준비중이에요 :)"} />
                <Info logo={<Ionicons color={'#575761'} name="chatbox-ellipses-outline" size={20} />} data={shopDummy.extraInfo || "준비중이에요 :)"} />
            </View>

        </View>
        <Line />
        <View style={styles.content}>
            <SectionTitle content={'이때 아니면 못 사는 이벤트 선물! 🔔'} />
            {
                productDummy.map((data, index) => {
                    <Product data={data} key={index} />
                })
            }
        </View>
    </ScrollView>;
}
