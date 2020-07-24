import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Constants from 'expo-constants';
import { useFunimation } from '../../funimation/context';
import { Show } from '../../funimation/types';
import { useAuth } from '../../auth/context';
import ShowList from '../../components/show-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
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

const QueueScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  const client = useFunimation();
  const colorScheme = useColorScheme();
  const [queue, setQueue] = useState<Show[]>([]);

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;

  const onButtonPress = (id: number, title: string) => {
    navigation.navigate('Details', { id, title });
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      if (state.userToken) setQueue(await client.GetQueueAsync(state.userToken));
    };
    bootstrapAsync();
  }, []);

  return (
    <View style={[styles.container, backgroundStyle]}>
      <ShowList shows={queue} onShowPress={onButtonPress} />
    </View>
  );
};

export default QueueScreen;