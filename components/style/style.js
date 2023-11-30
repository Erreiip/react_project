import { StyleSheet } from 'react-native';

export const header = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

export const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    paddingLeft: 0,
    width: 25,
    height: 25,
  }
})

export const stylesTDL = StyleSheet.create({
	container: {
		flex: 2,
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
    logo: {
        paddingLeft: 0,
        width: 25,
        height: 25,
    }
})

const RADIUS = 8;

export const modalS = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: RADIUS,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: '100%',
    borderRadius: RADIUS,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonSave: {
    backgroundColor: '#186CAB',
    marginBottom: '5%',
  },
  buttonClose: {
    backgroundColor: '#C73333',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});