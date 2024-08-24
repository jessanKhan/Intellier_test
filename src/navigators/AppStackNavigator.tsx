import React, { type FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { type AppStackParamList } from '@/models/routePageModel';
import { HomeScreen } from '../Screens/index';
import { Provider } from 'react-redux';
import { store } from '../redux/index';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStackNavigator: FC = () => {
  return (
    <Provider store={store}>
    <Stack.Navigator initialRouteName={'HomeScreen'}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} options={{ headerShown: false,
        title:"Home"
       }} />
    </Stack.Navigator>
    </Provider>
  );
};

export default AppStackNavigator;
