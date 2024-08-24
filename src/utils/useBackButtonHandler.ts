import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
const useBackButtonHandler = (): void => {
  useEffect(() => {
    const handleBackPress = (): boolean => {
      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Exit',
            onPress: () => {
              BackHandler.exitApp();
            }
          }
        ],
        {
          cancelable: false
        }
      );
      return true; // Prevent default behavior and stay in the app
    };

    // Add event listener for hardwareBackPress
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup: remove event listener
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []); // Empty dependency array means this useEffect will run once when component mounts and cleanup when component unmounts
};

export default useBackButtonHandler;
