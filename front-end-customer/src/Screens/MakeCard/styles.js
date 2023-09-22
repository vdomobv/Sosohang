import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white',
    marginTop: 25,
  },

  // subcontainer: {
  //   marginVertical: 12,
  // },

  title: {
    fontSize: 21,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    marginHorizontal: 30,
  },

  button: {
    backgroundColor: '#E9EEE8',
    height: 45,
    padding: 8,
    borderRadius: 15,
    margin: 10,
    elevation: 5, // Android shadow
  },

  selectedButton: {
    backgroundColor: '#E6FEDA',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  cardimage: {
    alignItems: 'center', // 가로 중앙 정렬
    marginTop: 10,
  },

  innerBox: {
    position: 'absolute',
    backgroundColor: '#F8F2CA',
    width: '80%',
    borderRadius: 8,
    marginBottom: 50,
    padding: 30,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  innerInput: { top: 250, 
    height: 150, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold'
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    paddingLeft: 15,
  },

  shopName: {
    marginLeft: 30,
    marginVertical: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  
  box: {
    marginHorizontal: 20,
    backgroundColor : '#E9EEE8',
    borderRadius : 10,
    padding : 5,
    marginBottom: 10,
  },

  
  total: {
    flex: 1,
    marginHorizontal: 20,
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
    backgroundColor: "#FFBF46",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },

});

export default styles