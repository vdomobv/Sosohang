import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin : 10,
    padding : 10,
    borderRadius : 10,
  },

  header : {
    fontSize : 18,
    fontWeight : 'bold',
  },

  body : {
    flexDirection : 'row',
  },

  image: {
    height: 100,
    width: 100,
    borderRadius : 10,
  },

  contents : {
    marginLeft : 10,
    justifyContent: 'space-evenly'
  },

  shopName: {
    fontSize : 16,
  },

  name : {
    fontSize : 20,
    fontWeight : 'bold',
  },

  price : {
    fontSize : 16,
    fontWeight : 'bold'
  },

  date : {
    textAlign : 'right'
  }
});

export default styles