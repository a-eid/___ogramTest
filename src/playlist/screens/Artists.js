import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {InteractionManager} from 'react-native';

import {getTrack} from '../redux/actions';

export function AtristsCmp({route, loading, artists = {}, getTrack}) {
  const {id} = route.params;

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      getTrack(id);
    });
  }, []);

  function renderItem({item: id}) {
    return <ArtistItem id={id} artist={artists[id]} />;
  }

  return (
    <>
      <FlatList
        data={Object.keys(artists)}
        renderItem={renderItem}
        keyExtractor={item => item}
      />

      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="blue" animating={loading} />
      </SafeAreaView>
    </>
  );
}

const ArtistItem = React.memo(({id, artist}) => {
  return (
    <View style={styles.artistsContainer}>
      <Text>{artist.name}</Text>
      <Text>{artist.type}</Text>
    </View>
  );
}, shouldRerender);

function shouldRerender({id: pId}, {d: nId}) {
  return pId !== nId;
}

const styles = StyleSheet.create({
  artistsContainer: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    margin: 10,
    borderColor: '#eee',
  },
  loader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 22,
    justifyContent: 'center',
  },
});

function mapStateToProps({playlist: {track}}, props) {
  return {
    artists: track[props.route.params.id]?.artists,
    loading: !(props.route.params.id in track),
  };
}

export const Atrists = connect(mapStateToProps, {getTrack})(AtristsCmp);
