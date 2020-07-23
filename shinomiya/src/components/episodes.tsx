import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Episode } from '../funimation/types';
import { useColorScheme } from 'react-native-appearance';

interface EpisodesProps {
  data: Episode[]
}
const Episodes = ({ data }: EpisodesProps) => {
  const colorScheme = useColorScheme();
  const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
  return (
    <View>
      <FlatList<Episode> data={data} keyExtractor={item => item.id.toString()} renderItem={({item}) => (
        <TouchableOpacity>
          <Text style={textStyle}>{item.title}</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
};

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

export default Episodes;