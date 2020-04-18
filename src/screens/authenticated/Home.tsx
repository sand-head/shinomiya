import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
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

const HomeScreen = ({ navigation }: any) => {
  const [shows, setShows] = useState<Show[]>([]);
  const colorScheme = useColorScheme();
  const client = useFunimation();
  const { signOut } = useAuth();

  const logOut = async () => {
    await client.LogOutAsync();
    await signOut();
  };

  const onShowPress = (id: number, title: string) => {
    navigation.navigate('Details', { id, title });
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      setShows(await client.GetShowsAsync());
    };
    bootstrapAsync();
  }, []);

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <ShowList shows={shows} onShowPress={onShowPress} />
      <Button title="Log out" onPress={logOut} />
    </SafeAreaView>
  );
};

export default HomeScreen;