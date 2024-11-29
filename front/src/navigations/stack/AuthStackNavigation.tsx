import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignUpScreen from '../../screens/auth/SignupScreen';
import { authNavigations } from '../../constants';
import AuthHomeScreen from '../../screens/auth/AuthHome';
import FindPasswordScreen from '../../screens/auth/FindPasswordScreen';



export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.FINDPASSWORD]:undefined; 
}
const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator({ }) {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          cardStyle: {
            backgroundColor: '#3F7CF7'
          },
          headerShown:false,
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        options={{
          title:'회원가입',
          cardStyle:{backgroundColor:'white'},
          headerTintColor:'black',
          headerPressOpacity:10,
          headerBackTitle:''
        }}
        component={SignUpScreen}
      />
       <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        options={{headerTitle:"로그인", headerBackTitle:'', headerTintColor:'black'}}
      />
      <Stack.Screen
        name={authNavigations.FINDPASSWORD}
        options={{
          title:'비밀번호 찾기',
          cardStyle:{backgroundColor:'white'},
          headerTintColor:'black',
          headerPressOpacity:10,
          headerBackTitle:''
        }}
        component={FindPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;