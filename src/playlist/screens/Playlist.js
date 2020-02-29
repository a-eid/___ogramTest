import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import {PlaylistItem} from '../components/PlaylistItem';
import {getPlaylist} from '../redux/actions';

function PlaylistCmp({playlists, page, loading, getPlaylist, next}) {
  const navigation = useNavigation();

  React.useEffect(() => {
    getPlaylist(page + 1);
  }, []);

  function toDetails(id) {
    navigation.navigate('Artists', {id});
  }

  function renderItem({item}) {
    return <PlaylistItem item={item} id={item.id} toDetails={toDetails} />;
  }

  function handleEndReach() {
    console.log('here we goo');
    if (!loading && next !== false) getPlaylist(page + 1);
  }

  return (
    <>
      <FlatList
        data={playlists}
        renderItem={renderItem}
        keyExtractor={item => item.uri}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReach}
      />
      <SafeAreaView style={styles.loadingView}>
        <ActivityIndicator size="large" color="blue" animating={loading} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 22,
    justifyContent: 'center',
  },
});

function mapStateToProps({playlist}) {
  const {playlists, page, loading, next} = playlist;
  return {playlists, page, loading, next};
}

export const Playlist = connect(mapStateToProps, {getPlaylist})(PlaylistCmp);
