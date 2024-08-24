import React, { type FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStackNavigator from './AppStackNavigator';


const Navigator: FC = () => {

  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
