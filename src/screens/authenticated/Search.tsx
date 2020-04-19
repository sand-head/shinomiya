import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Show } from '../../funimation/types';
import { useFunimation } from '../../funimation/context';
import ShowList from '../../components/show-list';
import { useColorScheme } from 'react-native-appearance';

const SearchScreen = ({navigation}: any) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Show[]>();
  const client = useFunimation();
  const colorScheme = useColorScheme();

  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;

  const onSearch = () => {
    (async () => {
      if (query.length > 3) {
        setResults(await client.SearchShowsAsync(query));
      } else {
        setResults([]);
      }
    })();
  };
  const onShowPress = (id: number, title: string) => {
    navigation.navigate('Details', { id, title });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search for anime"
        autoCorrect={false}
        keyboardType="web-search"
        returnKeyType="search"
        style={styles.textInput}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
      />
      {results != null && results.length > 0 ? (
        <ShowList shows={results} onShowPress={onShowPress} />
      ) : (
        <Text style={textStyle}>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Constants.statusBarHeight
  },
  textInput: {
    borderColor: '#888',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginVertical: 8,
    width: '80%'
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default SearchScreen;