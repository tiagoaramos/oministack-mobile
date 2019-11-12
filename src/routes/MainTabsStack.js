import React from 'react';

import {
    createBottomTabNavigator
} from 'react-navigation-tabs'

import Home from '../views/main/Home'
import Receipts from '../views/main/Receipts'

const MainTabsStack = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
        },
    },
    Receipts: {
        screen: Receipts,
        navigationOptions: {
            tabBarLabel: 'Receipts',
        },
    }
}, { }
)

export default MainTabsStack