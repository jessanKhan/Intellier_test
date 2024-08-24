import { ToastAndroid } from 'react-native';

const ToastPopUp = (msg: string): void => {
  ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
};

export default ToastPopUp;
