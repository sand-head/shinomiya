import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScene from './src/scenes/Splash';
import LoginScene from './src/scenes/Login';
import withFunimation from './src/funimation/context';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScene} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScene} options={{title: 'Login with Funimation'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withFunimation()(App);