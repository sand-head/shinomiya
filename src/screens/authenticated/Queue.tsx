import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFunimation } from '../../funimation/context';
import { Show } from '../../funimation/types';
import { useAuth } from '../../auth/context';
import ShowList from '../../components/show-list';

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

const QueueScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  const client = useFunimation();
  const colorScheme = useColorScheme();
  const [queue, setQueue] = useState<Show[]>([]);

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

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
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <Text style={textStyle}>My Queue</Text>
      <ShowList shows={queue} onShowPress={onButtonPress} />
    </SafeAreaView>
  );
};

export default QueueScreen;