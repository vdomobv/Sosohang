import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  title: {
    fontSize: 21,
    marginBottom: 10,
    fontWeight: 'bold', 
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    margin: 5,
    width: '80%',
  },
  
  minibutton: {
    width: '20%',
    borderRadius: 5,
    padding: 11,
    backgroundColor: '#46C27D',
    marginLeft: 5
  },

  button: {
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#46C27D',
  },

  buttonText: {
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },

  horizontalLine: {
    borderBottomWidth: 1, // 선 두께
    borderColor: 'gray',
    marginVertical: 13, // 위아래 여백 조정
    borderStyle: 'solid',
    borderleftWidth: 330, // 좌측 여백
    borderRightWidth: 330, // 우측 여백
  },

});

export default styles