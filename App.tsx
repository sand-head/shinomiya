import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import withFunimation from './src/funimation/context';
import withAuth, { useAuth } from './src/auth/context';
import LoginScreen from './src/screens/Login';
import SplashScreen from './src/screens/Splash';
import MainScreen from './src/screens/authenticated/Main';
import DetailsScreen, { DetailsModalProps } from './src/screens/authenticated/Details';

export type RootStackParamList = {
  Main: undefined;
  Details: { id: number, title: string };
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const colorScheme = useColorScheme();
  const { state } = useAuth();
  const { width } = Dimensions.get('window');
  const itemSize = width - 150;

  if (state.isLoading) {
    return <SplashScreen />
  }
  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {state.userToken != undefined ? (
          <Stack.Navigator mode="modal">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={DetailsScreen}
              options={({ route }: DetailsModalProps) => ({
                title: route.params.title,
                headerTitleStyle: {
                  maxWidth: itemSize
                },
                headerBackTitle: "Close",
              })} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default withAuth(withFunimation()(App));