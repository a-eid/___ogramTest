import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

export const PlaylistItem = React.memo(({item, toDetails}) => {
  const {
    images: [image],
    description,
  } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toDetails(item.id)}>
      <Image source={{uri: image.url}} style={styles.image} />
      <Text style={styles.text}>{description.substr(0, 150)} ...</Text>
    </TouchableOpacity>
  );
}, shouldPlaylistItemRerender);

function shouldPlaylistItemRerender({id: pId}, {d: nId}) {
  return pId !== nId;
}

const styles = StyleSheet.create({
  container: {height: 250, backgroundColor: 'red', marginBottom: 20},
  image: {width: 100, height: 100},
  text: {},
});
