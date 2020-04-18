import React from 'react';
import { Show } from '../funimation/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Dimensions, ImageBackground } from 'react-native';

interface ShowProps {
  data: Show;
  onPress: () => void;
}
const ShowItem: React.FunctionComponent<ShowProps> = ({ data, ...props }) => {
  const { width } = Dimensions.get('window');
  const itemSize = width / 2 - 8;
  return (
    <TouchableOpacity {...props} style={[styles.item, {
      width: itemSize,
      height: itemSize
    }]}>
      <ImageBackground style={styles.image} source={{ uri: data.thumbnail.url }}>
        <Text style={[styles.text, {
          color: '#fff',
          backgroundColor: '#000',
        }]}>{data.title}</Text>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 6,
    margin: 8,
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