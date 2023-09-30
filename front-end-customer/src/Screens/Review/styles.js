import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },

  scrollBoxContainer: {
    padding: 20,
  },

  title: {
    fontSize: 21,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  reviewBox: {
    backgroundColor: "#fff",
    margin: 5,
    marginHorizontal: 22,
    padding: 30,
    borderRadius: 10,
    textAlign: "center",
  },

  reviewInfo: {
    textAlign: "center",
    fontSize: 20,
  },

  shopname: {
    // backgroundColor: '#E6FEDA',
    backgroundColor: '#46C27D',
    height: 40,
    padding: 5,
    borderRadius: 30,
    margin: 10,
    marginHorizontal: 40,
    marginVertical: 20
    // elevation: 5, // Android shadow
  },

  shopnameText: {
    textAlign: 'center',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white'
  },

  reviewKeyword: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  keywordButton: {
    // backgroundColor: '#E6FEDA', 
    borderColor: '#46C27D',
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    margin: 5,
    marginHorizontal: 5,
    fontSize: 16
  },

});

export default styles