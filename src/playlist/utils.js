export function getDistinctArtists(data) {
  return data.reduce((memo, {track = {}}) => {
    if (!track) return memo;
    const {artists = []} = track;
    artists.forEach(artist => {
      memo[artist.id] = artist;
    });
    return memo;
  }, {});
}
