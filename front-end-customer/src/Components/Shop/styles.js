import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
  },

  texts: {
    marginVertical: 5,
    marginHorizontal: 10
  },

  image: {
    width: 50,
    height: 50,
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },

  section: {
    flex: 1
  },

  more: {
    margin: 10,
    textAlign: 'right',
    alignSelf: 'bottom',
  }
});

export default styles