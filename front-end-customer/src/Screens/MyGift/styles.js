import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },

  title: {
    fontSize: 21,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  giftTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginHorizontal: 10
  },

  tab: {
    backgroundColor: 'white',
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#C6C2C2',
    borderWidth: .5,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  tabPage: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#C6C2C2',
    borderWidth: .5,
    borderTopWidth: 0,
    padding: 5,
    paddingTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  deactivated: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#C6C2C2',
    borderWidth: .5,
    borderBottomWidth: 0,
    backgroundColor: '#C6C2C2',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default styles