import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },

  price: {
    fontSize: 15,
  },

  counter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },

  count: {
    fontSize: 16,
  },

  textBold: {
    fontWeight: "bold",
    fontSize: 19,
  },

  textSamll: {
    marginTop: 2,
    fontSize: 16,
  }

});

export default styles;
