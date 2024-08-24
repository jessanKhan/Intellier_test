import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  image: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  imageModal: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
  },
  text: {
    padding: 10,
    textAlign: 'center',
    color: 'grey',
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
