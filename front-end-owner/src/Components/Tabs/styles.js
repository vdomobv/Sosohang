import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection : "row",
    justifyContent : "space-evenly",
    paddingVertical : 7,
    backgroundColor : "white",
    borderColor : '#C6C2C2',
    borderTopWidth : .5
  },

  subContainer: {
    alignItems : 'center',
  },

  name: {
    fontSize : 13,
    color : 'gray'
  }
});

export default styles