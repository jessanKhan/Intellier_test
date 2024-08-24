import React, { type FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigators/AppStackNavigator';


const App: FC = () => {
  

  return (
    <NavigationContainer>
       <StackNavigator />
       </NavigationContainer>
  );
};

export default App;
