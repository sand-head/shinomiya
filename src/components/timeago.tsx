import React from 'react';
import { StyleProp, TextStyle, Text } from 'react-native';
import { format } from 'timeago.js';

interface TimeAgoProps {
  date: string;
  style?: StyleProp<TextStyle>;
}

const TimeAgo: React.FunctionComponent<TimeAgoProps> = ({date, style}) => {
  return (
    <Text style={style}>{format(date)}</Text>
  );
};

export default TimeAgo;