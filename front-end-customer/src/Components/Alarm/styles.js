import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },

  image: {
    width: 60,
    height: 60,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 50,
  },

  text: {
    fontSize: 16,
  },

  textContainer: {
    marginHorizontal: 10,
    width: "75%",
  },

  date: {
    textAlign: "right",
  },
});

export default styles;
