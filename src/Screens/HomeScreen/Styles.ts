import { StyleSheet } from 'react-native';
import { DANDY_COLORS } from '../../utils/DefaultFormatting';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    resizeMode: 'contain',
    height: 30,
    width: 40,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  bottomContainerTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(10,10,10,0.5)',
    alignItems: 'center',
  },
  bottomContainerMain: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapItemBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonContainerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  bubbleC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: DANDY_COLORS.paleGreenDefault,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  normalTextStyle: {
    fontSize: 15,
    color: DANDY_COLORS.navyBlueDefault,
  },
  normalBoldTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: DANDY_COLORS.navyBlueDefault,
  },
  subtitleTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: DANDY_COLORS.navyBlueDefault,
  },
  titleTextStyle: {
    fontSize: 25,
    color: DANDY_COLORS.navyBlueDefault,
    textTransform: 'capitalize',
  },
  titleBoldTextStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: DANDY_COLORS.navyBlueDefault,
    textTransform: 'capitalize',
  },
  scrollSideBar: {
    flexGrow: 0,
    marginRight: 5,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    borderRadius: 20,
    backgroundColor: DANDY_COLORS.paleGreenDefault,
  },
});

export default styles;
