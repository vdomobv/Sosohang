import { Text } from "react-native";
import { Tooltip } from "@rneui/themed";
import { useState } from "react";
import { ScrollView } from "react-native";

const CustomTooltip = ({ openTooltip, contents, info }) => {
  const [open, setOpen] = useState(openTooltip);
  return (
    <Tooltip
      height={400}
      width={350}
      backgroundColor={"white"}
      overlayColor={"rgba(19, 12, 14, 0.31)"}
      onOpen={() => {
        setOpen(true);
      }}
      visible={open}
      popover={
        <>
          <Text
            style={{
              fontSize: 20,
              textAlign: "right",
              width: "100%",
              marginRight: 30,
            }}
            onPress={() => {
              setOpen(false);
            }}
          >
            닫기
          </Text>
          <ScrollView style={{ maxHeight: 340, zIndex: 100 }}>
            {contents}
          </ScrollView>
        </>
      }
    >
      {info}
    </Tooltip>
  );
};

export default CustomTooltip;
