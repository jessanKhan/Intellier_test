import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { DANDY_COLORS } from '../../utils/DefaultFormatting';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Define the interface for the props
interface ICustomButtonProps {
  label: string | null;
  onPress: () => void;
  image: any;
  buttonColor?: string;
  useColumn?: boolean;
  large?: boolean;
  elementColor?: string;
}

// Update the component with the correct type
export default function CustomButton({
  label,
  onPress,
  image,
  buttonColor,
  useColumn = false,
  large = false,
  elementColor,
}: ICustomButtonProps) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.buttonC,
          buttonColor ? styles.buttonShadow : undefined,
          {
            backgroundColor: buttonColor,
            flexDirection: useColumn ? 'column' : 'row',
            padding: 10,
          },
        ]}
      >
        <Image
          source={image}
          style={[
            styles.buttonImage,
            {
              tintColor: elementColor || DANDY_COLORS.navyBlueDefault,
            },
          ]}
        />
        {label !== null && (
          <Text
            style={[
              styles.titleTextStyle,
              {
                color: elementColor || DANDY_COLORS.navyBlueDefault,
                fontSize: 18,
                paddingHorizontal: useColumn ? 0 : 10,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonC: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    textAlign: 'center',
    color: '#D3D3D3',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  buttonImage: {
    width: windowWidth > 480 ? 35 : 25,
    height: windowHeight > 854 ? 30 : 20,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
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
  titleTextStyle: {
    fontSize: 25,
    color: DANDY_COLORS.navyBlueDefault,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
