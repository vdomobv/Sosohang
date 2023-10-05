import styles from "./styles";
import { View, Text } from "react-native";

import SquareImage from "../SquareImage/SquareImage";
import SectionTitle from "../SectionTitle/SectionTitle";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import Amount from "../Amount/Amount";

export default function Product({
  data,
  checked,
  amount,
  onCheckChange,
  onAmountChange,
}) {
  const [isChecked, setIsChecked] = useState();
  const [productAmount, setProductAmount] = useState();
  console.log(data);

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    setIsChecked(checked);
    setProductAmount(amount);
  }, [amount]);

  useEffect(() => {
    onAmountChange(productAmount);
  }, [productAmount]);

  useEffect(() => {
    onCheckChange(isChecked);
  }, [isChecked]);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={() => {
          setIsChecked(!isChecked);
          onCheckChange(isChecked);
        }}
      />
      <SquareImage imageSrc={{ uri: data.productImage }} />
      <View style={styles.content}>
        <SectionTitle content={data.productName} />
        {data.productDcrate ? (
          <Text style={styles.prevPrice}>{`${numberWithCommas(
            data.productPrice
          )}원`}</Text>
        ) : null}
        <SectionTitle
          content={`${numberWithCommas(
            (1 - data.productDcrate) * data.productPrice
          )}원`}
          customStyles={{ color: "#FF4646" }}
        />
        <View style={styles.amount}>
          <Amount
            onCheckChange={(productAmount) => {
              setProductAmount(productAmount);
            }}
            productAmount={productAmount}
          />
        </View>
      </View>
    </View>
  );
}
