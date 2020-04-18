import React from 'react';
import { Show } from '../funimation/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';

interface ShowProps {
  data: Show;
  onPress: () => void;
}
const ShowItem: React.FunctionComponent<ShowProps> = ({data, ...props}) => {
  return (
    <TouchableOpacity {...props} style={{
      flex: 1, // todo: style this and add thumbnail bg
      width: '100%'
    }}>
      <Text style={{color: '#fff'}}>{data.title}</Text>
    </TouchableOpacity>
  );
};

export default ShowItem;