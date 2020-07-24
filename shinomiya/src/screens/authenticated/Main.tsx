import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Home';
import SearchScreen from './Search';
import QueueScreen from './Queue';

export type MainTabParamList = {
  Queue: undefined;
  Home: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={({route}) => ({
      tabBarIcon: ({ focused, color, size }) => {
        switch (route.name) {
          case 'Home':
            return <Ionicons name='ios-home' size={size} color={color} />
          case 'Queue':
            return <Ionicons name='ios-albums' size={size} color={color} />
          case 'Search':
            return <Ionicons name='ios-search' size={size} color={color} />
        }
      }
    })}>
      <Tab.Screen name="Queue" component={QueueScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;