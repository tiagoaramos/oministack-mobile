import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '../views/auth/SignIn'
import CreateAccount from '../views/auth/CreateAccount'
import ForgotPassword from '../views/auth/ForgotPassword'

const AuthStack = createStackNavigator({
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerTitle: 'Sign In',
      },
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: {
        headerTitle: 'Create Account',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerTitle: 'Forgot Password',
      },
    },
  });


  export default AuthStack;