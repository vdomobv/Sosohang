import styles from "./styles";
import { Modal, Text, Pressable, View, TouchableOpacity } from "react-native";
import React, { useState } from 'react'; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function PlusMinusModal({ visible, onClose, alertTitle, onPress }) {
  const navigation = useNavigation();
  const [number, setNumber] = useState(1);

  const decrementNumber = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const incrementNumber = () => {
    setNumber(number + 1);
  };

  const handlePress = () => {
    // 변경된 값을 onPress 함수로 전달
    onPress(number);
    onClose(); 
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={[styles.modalText, styles.alertTitle]}>{alertTitle}</Text>

          <View style={styles.numberContainer}>
            <TouchableOpacity onPress={decrementNumber}>
            <Ionicons name="remove-circle-outline" style={styles.icons}/>
            </TouchableOpacity>
            <Text style={styles.alertText}>{number}</Text>
            <TouchableOpacity onPress={incrementNumber}>
            <Ionicons name="add-circle-outline" style={styles.icons}/>
            </TouchableOpacity>
          </View>

          <Pressable
            style={styles.button}
            onPress={handlePress}>
            <Text style={styles.buttonText}>적립</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};