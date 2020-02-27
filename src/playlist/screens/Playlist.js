import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import {actions} from '../redux/actions';
import * as api from '../api';

import {PlaylistItem} from '../components/PlaylistItem';

export function Playlist() {
  const navigation = useNavigation();
  const playlists = useSelector(state => state.playlist.playlists);
  const [loading, setLoading] = React.useState(false);
  const [reachedEnd, setReachedEnd] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();

  async function getPlaylists(page) {
    try {
      setLoading(true);
      const playlist = await api.getPlaylists({page});
      dispatch({type: actions.GET_PLAYLISTS, payload: playlist.items});
      setLoading(false);
      if (playlist.next === null) setReachedEnd(true);
      console.log(playlist);
    } catch (error) {}
  }

  React.useEffect(() => {
    getPlaylists(1);
  }, []);

  function toDetails(id) {
    navigation.navigate('Artists', {id});
  }

  function renderItem({item}) {
    return <PlaylistItem item={item} id={item.id} toDetails={toDetails} />;
  }

  function handleEndReach() {
    console.log('handleEndReach');
    if (!loading && !reachedEnd) {
      getPlaylists(page + 1);
      setPage(page + 1);
    }
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
