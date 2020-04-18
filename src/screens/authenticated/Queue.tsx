import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useFunimation } from '../../funimation/context';
import { Show } from '../../funimation/types';
import { useAuth } from '../../auth/context';
import { useColorScheme } from 'react-native-appearance';

interface QueueScreenProps {

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

const QueueScreen = ({ navigation }: any) => {
  const { state } = useAuth();
  const client = useFunimation();
  const colorScheme = useColorScheme();
  const [queue, setQueue] = useState<Show[]>([]);

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  const onButtonPress = (id: number) => {
    navigation.navigate('Details', { id });
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      if (state.userToken) setQueue(await client.GetQueueAsync(state.userToken));
    };
    bootstrapAsync();
  }, []);

  return (
    <View style={[styles.container, backgroundStyle]}>
      {queue.map(show => (
        <Button title={show.title} onPress={_ => onButtonPress(show.id)} key={show.id} />
      ))}
    </View>
  );
};

export default QueueScreen;