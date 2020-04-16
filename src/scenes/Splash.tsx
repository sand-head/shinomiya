import React from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface SplashSceneProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>
}
const SplashScene: React.FunctionComponent<SplashSceneProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Shinomiya - the open source Funimation app</Text>
      <Button title="Login with Funimation" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SplashScene;