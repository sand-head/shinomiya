import React from 'react';
import { Show } from '../funimation/types';
import { FlatList } from 'react-native-gesture-handler';
import ShowItem from './show';

interface ShowListProps {
  shows: Show[];
  onShowPress: (id: number, title: string) => void;
}
const ShowList: React.FunctionComponent<ShowListProps> = ({shows, onShowPress}) => {
  return (
    <FlatList<Show>
      data={shows}
      numColumns={2}
      style={{
        flex: 1,
      }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <ShowItem data={item} onPress={() => onShowPress(item.id, item.title)} />
      )} />
  );
};

export default ShowList;