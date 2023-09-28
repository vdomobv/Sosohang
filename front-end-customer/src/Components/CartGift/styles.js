import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor : 'white',
    padding : 5,
    margin : 5,
    borderRadius : 10,
  },

  price: {
    fontSize : 15,
  },

  counter : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-evenly',
  },
  
  count: {
    fontSize : 16,
  },
  
  textBold : {
    fontWeight : 'bold',
    fontSize : 18,
  }

});

export default styles