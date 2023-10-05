import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 25,
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
  },

  shopname: {
    backgroundColor: '#575761',
    height: 40,
    padding: 5,
    borderRadius: 30,
    margin: 10,
    marginHorizontal: 40,
    marginVertical: 30,
  },

  shopnameText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },

  reviewKeyword: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  
  keywordButton: {
    elevation: 2, // Android shadow
    backgroundColor: '#fff',
    borderColor: '#46C27D',
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    margin: 5,
    marginHorizontal: 5,
    fontSize: 17
  },

  selectedKeywordButton: {
    backgroundColor: '#E6FEDA', // 선택된 키워드의 배경색
    borderColor: '#ffffff',
    elevation: 2, // Android shadow

  },

  reviewButton: {
    backgroundColor: '#46C27D',
    marginTop: 20,
    marginHorizontal: 60,
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 20,
    elevation: 5, // Android shadow
  },

  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  }

});

export default styles