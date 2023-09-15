import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 21,
    marginBottom: 10,
    fontWeight: 'bold', 
  },

  input: {
    borderWidth: 1, // 테두리 두께
    borderColor: 'gray', // 테두리 색상
    borderRadius: 5, // 테두리 둥글기
    padding: 8, // 내부 패딩
    margin: 5,
    width: '80%',
  },

  button: {
    width: '80%', // 버튼 너비를 80%로 설정
    borderRadius: 5, // 버튼 둥글게
    padding: 12, // 내부 패딩
    marginTop: 15,
    backgroundColor: '#46C27D',
  },

  buttonText: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },

  horizontalLine: {
    borderBottomWidth: 1, // 선 두께
    borderColor: 'gray',
    marginVertical: 22, // 위아래 여백 조정
    borderStyle: 'solid',
    borderleftWidth: 330, // 좌측 여백
    borderRightWidth: 330, // 우측 여백
  },

});

export default styles