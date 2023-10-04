import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "white",
  },

  title: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  dibButton: {
    justifyContent: "flex-end",
  },

  image: {
    width: "100%",
    height: 250,
    objectFit: "fill",
  },

  head: {
    flexDirection: "row",
    marginVertical: 10,
  },

  keywords: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  content: {
    marginHorizontal: 15,
    marginVertical: 10,
  },

  buttons: {
    flexDirection: "row",
    position: "absolute",
    width: "95%",
    bottom: 0,
    marginVertical: 10,
    alignSelf: "center",
  },

  blank: {
    height: 60,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },

  modalButtons: {
    flexDirection: "row",
  },

  bar: {
    backgroundColor: "lightblue",
    height: 20,
    margin: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  reviewText: {
    textAlign: "right",
    marginRight: 10,
  },

  reviewItem: {
    flexDirection: "row",
  },

  reviewLabel: {
    textAlignVertical: "center",
    width: "20%",
    textAlign: "center",
  },

  noReview: {
    height: 100,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  reviewlist: {
    margin: 10,
  },

  toggleInfo: {
    width: "100%",
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default styles;
