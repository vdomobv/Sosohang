import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "white",
  },

  image: {
    width: '100%',
    height: 250,
    objectFit: 'fill'
  },

  head: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  keywords: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  content: {
    marginHorizontal: 15,
    marginVertical: 10,
  }

});

export default styles