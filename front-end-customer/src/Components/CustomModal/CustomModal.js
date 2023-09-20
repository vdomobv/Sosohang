import { useEffect, useState } from "react";
import styles from "./styles";
import { View, Modal, Text } from "react-native";

import Box from "../Box/Box";

export default function CustomModal({ modalState, content }) {
  const [isModalVisible, setIsModalVisible] = useState(modalState);

  useEffect(() => {
    setIsModalVisible(modalState);
  }, [modalState]);

  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };

  return (
    <Modal
      style={styles.container}
      visible={isModalVisible}
      presentationStyle="overFullScreen"
      transparent
    >
      <View style={styles.wrapper}>
        <View style={styles.content}>{content}</View>
      </View>
    </Modal>
  );
}
