import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height : 130,
    borderColor: "white",
    margin: 5,
    marginLeft: 45,
  },

  youContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  imageContainer: {
    height : 90,
    width: 90,
    borderStyle: "solid",
    borderRadius: 100,
    borderColor: "lightgrey",
    borderWidth: 1,
  },

  image: {
    height: 85,
    width: 85,
    borderRadius: 100,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 25,
  },

});

export default styles;
