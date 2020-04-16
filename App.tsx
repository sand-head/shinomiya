import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import SplashScene from './src/scenes/Splash';
import LoginScene from './src/scenes/Login';
import withFunimation from './src/funimation/context';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScene} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={LoginScene} options={{title: 'Login with Funimation'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default withFunimation()(App);