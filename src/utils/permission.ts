import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App needs access to your location',
        buttonPositive: 'OK',  // Add this line
        buttonNegative: 'Cancel',  // Optional: You can add this too
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
    } else {
      console.log("Location permission denied");
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
