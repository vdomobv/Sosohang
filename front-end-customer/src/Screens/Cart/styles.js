import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 25,
  },

  cartList: {
    flex: 4,
  },

  listHead: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 26,
  },

  delete: {
    textDecorationLine: "underline",
  },

  listBody: {
    flex: 10,
  },

  total: {
    flex: 1,
  },

  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginHorizontal : 10,
  },

  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  okay: {
    backgroundColor: "gold",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
});

export default styles;
