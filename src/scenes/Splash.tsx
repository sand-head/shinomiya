import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useColorScheme } from 'react-native-appearance';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

interface SplashSceneProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>
}
const SplashScene: React.FunctionComponent<SplashSceneProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Text style={textStyle}>Shinomiya - the open source Funimation app</Text>
      <Button title="Login with Funimation" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SplashScene;