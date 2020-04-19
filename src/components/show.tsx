import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Dimensions, ImageBackground, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Show } from '../funimation/types';

const wrap = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return [text];
  const lines: string[] = [];
  const totalLineCount = Math.ceil(text.length / maxLength);
  let totalLength = 0;
  for (let i = 0; i < totalLineCount; i++) {
    if (text[totalLength + maxLength] === ' ') {
      lines.push(text.substring(totalLength, totalLength + maxLength));
      totalLength += maxLength + 1;
      continue;
    }

    const partToSearch = text.substring(totalLength, totalLength + maxLength);
    const lastSpace = partToSearch.lastIndexOf(' ');

    if (i === totalLineCount - 1 || lastSpace === -1) {
      lines.push(text.substring(totalLength));
      break;
    } else {
      lines.push(text.substring(totalLength, totalLength + lastSpace));
      totalLength += lastSpace + 1;
    }
  }
  return lines;
};

interface ShowProps {
  data: Show;
  onPress: () => void;
}
const ShowItem: React.FunctionComponent<ShowProps> = ({ data, ...props }) => {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');
  const itemSize = width / 2 - 8;

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
            <Text style={textStyles} key={i}>{line}</Text>
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

export default ShowItem;