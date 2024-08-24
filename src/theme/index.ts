import { Dimensions } from 'react-native';
import { createTheme } from '@shopify/restyle';

import { colors } from './colors';
import { fontFamily, fontSizes, fontWeights, textVariants } from './text-variants';

const { width, height } = Dimensions.get('window');

// custom
const sizes = {
  // app dimensions
  full: '100%',
  width,
  height,
  pageWidth: 16,
  safeWidth: width - 16 - 16,
  activeOpacity: 0.8,
  minHeaderHeight: 60
};

const boxShadow = {
  small: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5
  }
};

const spacing = {
  none: 0,
  ma: 1,
  mc: 2,
  xxs: 4,
  xs: 6,
  sm: 8,
  smm: 12,
  rg: 14,
  md: 16,
  lg: 20,
  xl: 24,
  hu: 32
};

const borderRadii = {
  none: 0,
  rounded: 8,
  'rounded-md': 16,
  'rounded-lg': 24,
  'rounded-xl': 32,
  'rounded-full': 9999
};

const zIndices = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50
};

const theme = createTheme({
  breakpoints: {},
  colors,
  borderRadii,
  textVariants,
  spacing,
  boxShadow,
  fontWeights,
  fontFamily,
  fontSizes,
  sizes,
  zIndices
});

export type Theme = typeof theme;

export default theme;
