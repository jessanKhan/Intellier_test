import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

const Styles = ScaledSheet.create({
  header: {
    width: '100%',
    height: verticalScale(120),
    alignItems: 'center',
    justifyContent: 'center'
  },
  syncButton: {
    backgroundColor: '#fff',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 5,
    borderRadius: 6
  },
  customDivider: {
    width: '100%',
    height: 10
  },
  drawerButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  drawerDivider: {
    width: '100%',
    height: scale(15),
    backgroundColor: '#d3d3d3'
  }
});

export default Styles;
