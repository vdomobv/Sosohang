import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "white",
    height: "100%",
    marginTop: 25,
  },

  banner: {
    fontSize: "50px",
    backgroundColor: "#575761",
  },

  headBox: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  location: {
    alignItems: "center",
    flex: 2,
    flexDirection: "row",
  },

  alarm: {
    flex: 1,
    alignItems: "flex-end",
  },

  searchbar: {
    flex: 6,
  },

  categories: {
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  section: {
    margin: 10,
  },

  carouselContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },

  imageContainer: {
    width: 70,
    height: 70,
  },

  textConatiner: {
    justifyContent: "center",
  },

  text: {
    textAlign: "center",
  },

  intro: {
    marginVertical: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default styles;
