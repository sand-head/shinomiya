import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Dimensions, ImageBackground, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Show } from '../funimation/types';

const wrap = (text: string, maxLength: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine: string[] = [], currentLength = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // if adding this word causes an overflow, finish this line
    // currentLine.length takes into account the number of spaces
    if (currentLength + currentLine.length + word.length >= maxLength) {
      lines.push(currentLine.join(' '));
      currentLine = [word];
      currentLength = word.length;
      continue;
    }
    currentLine.push(word);
    currentLength += word.length;
  }

  // if there's still a line unfinished, finish it
  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '));
  }

  return lines;
}

interface ShowProps {
  data: Show;
  onPress: () => void;
}
const ShowItem: React.FunctionComponent<ShowProps> = ({ data, ...props }) => {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');
  const itemSize = width / 2;

  const textStyles = [styles.text, colorScheme === 'light' ? {
    color: '#000',
    backgroundColor: '#fff'
  } : {
    color: '#fff',
    backgroundColor: '#000',
  }];

  return (
    <TouchableOpacity {...props} style={[styles.item, {
      width: itemSize,
      height: itemSize
    }]}>
      <ImageBackground style={styles.image} source={{ uri: data.thumbnail.url }}>
        <View style={styles.textWrapper}>
          {wrap(data.title, 18).map((line, i) => (
            <Text numberOfLines={1} style={textStyles} key={i}>{line}</Text>
          ))}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    margin: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 6,
    shadowColor: '#410099',
    shadowOpacity: 0.75,
    shadowRadius: 0,
    shadowOffset: {
      width: -4,
      height: 4
    }
  }
});

export default React.memo(ShowItem);