import styles from "./styles";
import { Modal, Text, Pressable, View, TouchableOpacity } from "react-native";
import React from 'react'; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function ModalCustom({ visible, onClose, alertTitle, alertText, onPress }) {
  const navigation = useNavigation();

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
          {/* 모달 창 제목 */}
          <Text style={[styles.modalText, styles.alertTitle]}>{alertTitle}</Text>
          {/* <Text style={[styles.modalText, styles.alertTitle]}>{`< ${alertTitle} >`}</Text> */}
          {/* 모달 창 내용 */}
          <Text style={[styles.modalText, styles.alertText]}>{alertText}</Text>
          <Pressable
            style={styles.button}
            onPress={onPress}>
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};