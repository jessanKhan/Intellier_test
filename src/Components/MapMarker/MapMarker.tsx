// import { Image, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { Marker } from 'react-native-maps';
// import Svg from 'react-native-svg';

// function MapMarker({ image, small, anchorMiddle, ...props }) {
//   const size = small ? 15 : 30;
//   const anchorPoint = anchorMiddle ? { x: 0.5, y: 0.5 } : { x: 0.5, y: 1.0 };
//   return (
//     <Marker
//       {...props}
//       anchor={anchorPoint}
//       style={{ width: size, height: size }}
//     >
//       <Svg width={size} height={size}>
//         <Image
//           style={[styles.markerImageStyle, { width: size, height: size }]}
//           source={image}
//         />
//       </Svg>
//     </Marker>
//   );
// }

// export default MapMarker;

// const styles = StyleSheet.create({
//   markerImageStyle: {
//     resizeMode: 'contain',
//     alignSelf: 'center',
//   },
// });
import { Image, ImageSourcePropType, StyleSheet, ViewStyle, ImageURISource } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import Svg from 'react-native-svg';
import { MapMarkerProps as OriginalMapMarkerProps } from 'react-native-maps';

interface MapMarkerProps extends OriginalMapMarkerProps {
  image: ImageURISource | number;
  small?: boolean;
  anchorMiddle?: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({ image, small = false, anchorMiddle = false, ...props }) => {
  const size = small ? 15 : 30;
  const anchorPoint = anchorMiddle ? { x: 0.5, y: 0.5 } : { x: 0.5, y: 1.0 };
  
  return (
    <Marker
      {...props}
      anchor={anchorPoint}
      style={{ width: size, height: size } as ViewStyle}
    >
      <Svg width={size} height={size}>
        <Image
          style={[styles.markerImageStyle, { width: size, height: size }]}
          source={image}
        />
      </Svg>
    </Marker>
  );
};

export default MapMarker;

const styles = StyleSheet.create({
  markerImageStyle: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
