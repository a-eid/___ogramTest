export const actions = {
  GET_PLAYLISTS: 'playlist/GET_PLAYLISTS',
  GET_PLAYLISTS_SUCCESS: 'playlist/GET_PLAYLISTS_SUCCESS',
  GET_PLAYLISTS_ERROR: 'playlist/GET_PLAYLISTS_ERROR',

  GET_TRACK: 'playlist/GET_TRACK',
  GET_TRACK_SUCCESS: 'playlist/GET_TRACK_SUCCESS',
  GET_TRACK_ERROR: 'playlist/GET_TRACK_ERROR',
};

export function getPlaylist(page) {
  return {
    type: actions.GET_PLAYLISTS,
    payload: {page},
  };
}

export function getTrack(id) {
  return {
    type: actions.GET_TRACK,
    payload: {id},
  };
}
