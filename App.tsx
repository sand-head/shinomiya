import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import withFunimation from './src/funimation/context';
import withAuth, { useAuth } from './src/auth/context';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/authenticated/Home';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const colorScheme = useColorScheme();
  const { token } = useAuth();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          {token != undefined ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default withAuth(withFunimation()(App));