import React, { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Constants from 'expo-constants';
import { useFunimation } from '../../funimation/context';
import { Show } from '../../funimation/types';
import { useAuth } from '../../auth/context';
import ShowList from '../../components/show-list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

interface ShowState {
  shows: Show[];
  isLoading: boolean;
}
const HomeScreen = ({ navigation }: any) => {
  const [state, setState] = useState<ShowState>({
    shows: [],
    isLoading: true
  });
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
  const loadMoreShowsAsync = async () => {
    console.log('ok loading more show');
    setState({...state, isLoading: true});
    const moreShows = await client.GetShowsAsync({offset: state.shows.length});
    setState({
      shows: [...state.shows, ...moreShows],
      isLoading: false
    });
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      setState({
        shows: await client.GetShowsAsync(),
        isLoading: false
      });
    };
    bootstrapAsync();
  }, []);

  const backgroundStyle = colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;

  return (
    <View style={[styles.container, backgroundStyle]}>
      <ShowList shows={state.shows}
        onShowPress={onShowPress}
        isLoading={state.isLoading} // this is probably bad and should be changed
        onLoadMoreAsync={loadMoreShowsAsync}
      />
    </View>
  );
};

export default HomeScreen;