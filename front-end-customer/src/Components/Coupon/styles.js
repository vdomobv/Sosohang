import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  count: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFBF46",
    marginRight: 10,
    color: "#AFAFAF",
  },

  image: {
    margin: 10,
    alignSelf: "center",
  },
});

export default styles;
