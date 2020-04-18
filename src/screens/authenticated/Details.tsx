import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { useColorScheme } from 'react-native-appearance';
import { useFunimation } from '../../funimation/context';
import { Show, ShowDetails } from '../../funimation/types';

export interface DetailsModalProps {
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
  const [showDetails, setShowDetails] = useState<ShowDetails>();
  const client = useFunimation();
  const colorScheme = useColorScheme();
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  useEffect(() => {
    const bootstrapAsync = async () => {
      setShowDetails(await client.GetShowDetailAsync(route.params.id));
    };
    bootstrapAsync();
  }, []);

  return (
    <View>
      {showDetails && (
        <Text style={textStyle}>{showDetails.description}</Text>
      )}
    </View>
  );
};

export default DetailsScreen;