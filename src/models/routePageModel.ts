import { type ParamListBase } from '@react-navigation/native';
export interface RootStackParamList extends ParamListBase {
  SignIn: undefined;
  SignUp: undefined;
}

export interface AuthStackParamList extends ParamListBase {
  AccountVerification: undefined;
  OTPVerification: undefined;
  PhoneVerification: undefined;
  FAQ: undefined;
  SignUp: undefined;
  SignIn: undefined;
}

export interface AppStackParamList extends ParamListBase {
  QCLaunchPad: undefined;
  SetLineStyle: undefined;
  DefectEntry: { selectedButton: string };
  EndTableCheck: undefined;
}

export interface BottomTabParamList extends ParamListBase {
  TopTabs: undefined;
  UpcomingJobs: undefined;
  ActiveJobs: undefined;
  Chat: undefined;
  TaskJobs: undefined;
}
export interface HomePageTopStackParamList extends ParamListBase {
  Home: undefined;
  DeliveryStackScreen: undefined;
  UrgentDelivery: undefined;
}

export interface UpcomingJobStackParamList extends ParamListBase {
  UpcomingJobScreen: undefined;
  UpcomingJobDetailScreen: undefined;
}

export interface DeliveryPageStackParamList extends ParamListBase {
  Delivery: undefined;
  DeliveryJobs: undefined;
}

export interface DrawerParamList extends ParamListBase {
  BottomTabs: undefined;
  Profile: undefined;
  Settings: undefined;
}
