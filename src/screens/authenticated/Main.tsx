import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Queue" component={QueueScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;