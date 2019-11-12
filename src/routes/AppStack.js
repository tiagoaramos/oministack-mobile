import React from 'react';
import {
    createDrawerNavigator
} from 'react-navigation-drawer';

import MainTabsStack from './MainTabsStack'
import SettingsStack from './SettingsStack'

const AppStack = createDrawerNavigator({
    MainTabs: MainTabsStack,
    Settings: SettingsStack,
});

export default AppStack;