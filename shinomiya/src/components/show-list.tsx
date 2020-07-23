import React from 'react';
import { Show } from '../funimation/types';
import { FlatList } from 'react-native-gesture-handler';
import ShowItem from './show';

interface ShowListProps {
  shows: Show[];
  onShowPress: (id: number, title: string) => void;
  isLoading?: boolean;
  onLoadMoreAsync?: () => Promise<void>;
}
const ShowList: React.FunctionComponent<ShowListProps> = ({shows, onShowPress, isLoading: isLoadingMore, onLoadMoreAsync}) => {
  return (
    <FlatList<Show>
      data={shows}
      numColumns={2}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: 'space-evenly',
        width: '100%',
      }}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isLoadingMore}
      onEndReached={onLoadMoreAsync}
      renderItem={({item}) => (
        <ShowItem data={item} onPress={() => onShowPress(item.id, item.title)} />
      )} />
  );
};

export default ShowList;