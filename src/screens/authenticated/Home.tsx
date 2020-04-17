import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFunimation } from '../../funimation/context';
import { useColorScheme } from 'react-native-appearance';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 24,
    width: '80%',
    fontSize: 18,
    borderBottomColor: '#888',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  lightBackground: {
    backgroundColor: '#fff',
  },
  darkBackground: {
    backgroundColor: '#000',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const client = useFunimation();
  const user = client.GetUser();

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Text style={textStyle}>Your name is {user.displayName}.</Text>
      <Text style={textStyle}>You joined Funimation on {user.date_joined}.</Text>
    </View>
  );
};

export default HomeScreen;