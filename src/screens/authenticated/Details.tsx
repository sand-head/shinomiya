import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { useColorScheme } from 'react-native-appearance';

interface DetailsModalProps {
  route: RouteProp<RootStackParamList, 'Details'>
}

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

const DetailsScreen = ({ route }: DetailsModalProps) => {
  const colorScheme = useColorScheme();
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
  return (
    <View>
      <Text style={textStyle}>hi yes this is details for item {route.params.id}</Text>
    </View>
  );
};

export default DetailsScreen;