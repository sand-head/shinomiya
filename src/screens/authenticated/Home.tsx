import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useFunimation } from '../../funimation/context';
import { FunimationUser, Show } from '../../funimation/types';
import { useAuth } from '../../auth/context';

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
  const [user, setUser] = useState<FunimationUser>({} as FunimationUser);
  const [shows, setShows] = useState<Show[]>([]);
  const colorScheme = useColorScheme();
  const client = useFunimation();
  const { signOut } = useAuth();

  const logOut = async () => {
    await client.LogOutAsync();
    await signOut();
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      setUser(await client.GetUserAsync());
      setShows(await client.GetShowsAsync());
    };
    bootstrapAsync();
  }, []);

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  return (
    <View style={[styles.container, backgroundStyle]}>
      {shows.length > 0 && shows.map(show => (
        <Text style={textStyle} key={show.id}>{show.title}</Text>
      ))}
      <Button title="Log out" onPress={logOut} />
    </View>
  );
};

export default HomeScreen;