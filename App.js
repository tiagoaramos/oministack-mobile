import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import AuthStack from './src/routes/AuthStack'
import AppStack from './src/routes/AppStack'

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppStack,
  },
});

export default createAppContainer(App);