import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#E9EEE8",
    borderRadius : 10,
    padding : 5,
    marginHorizontal : 10,
    alignItems: 'center', 
  },

  imageContainer: {
    // width : "50%",
  },

  image: {
    // resizeMode: 'contain'
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
});

export default styles