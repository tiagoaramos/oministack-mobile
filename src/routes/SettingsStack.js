import React from 'react'
import {
    createStackNavigator
} from 'react-navigation-stack';

import Settings from '../views/settings/Settings'
import Profile from '../views/settings/Profile'

const SettingsStack = createStackNavigator({
    SettingsList: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'Settings List',
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerTitle: 'Profile',
        },
    },
});

export default SettingsStack;