import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';

import * as api from '../api';

export function Atrists({route}) {
  const [loading, setLoading] = React.useState(false);
  const [artists, setArtists] = React.useState({});
  const {id} = route.params;

  React.useEffect(() => {
    api
      .getTracks({id})
      .then(({data}) => {
        const artists = data.items.reduce((memo, {track: {artists}}) => {
          artists.forEach(artist => {
            memo.id = artist;
          });
          return memo;
        }, {});
        setArtists(artists);
      })
      .catch(error => {});
  }, []);

  function renderItem({item: id}) {
    const artist = artists[id];
    return <ArtistItem id={id} artist={artist} />;
  }

  return (
    <>
      <FlatList
        data={Object.keys(artists)}
        renderItem={renderItem}
        keyExtractor={item => item}
      />

      <SafeAreaView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 22,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="blue" animating={loading} />
      </SafeAreaView>
    </>
  );
}

const ArtistItem = React.memo(({id, artist}) => {
  return (
    <View>
      <Text>{artist.name}</Text>
      <Text>{artist.type}</Text>
    </View>
  );
}, shouldRerender);

function shouldRerender({id: pId}, {d: nId}) {
  return pId !== nId;
}
