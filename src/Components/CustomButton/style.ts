import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  buttonProperties: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10)
  }
});

export default styles;
