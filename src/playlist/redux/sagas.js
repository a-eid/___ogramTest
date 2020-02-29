import {put, takeLatest, call} from 'redux-saga/effects';
import {actions} from './actions';
import * as api from '../api';
import {getDistinctArtists} from '../utils';

export function* fetchPlaylists({payload}) {
  const {page = 1} = payload;
  try {
    const data = yield call(api.getPlaylists, {page});
    yield put({type: actions.GET_PLAYLISTS_SUCCESS, payload: data});
  } catch (error) {
    yield put({type: actions.GET_PLAYLISTS_ERROR, payload: error});
  }
}

export function* fetchTracks({payload}) {
  const {id} = payload;

  try {
    const data = yield call(api.getTracks, {id});
    const artists = getDistinctArtists(data.items);
    yield put({
      type: actions.GET_TRACK_SUCCESS,
      payload: {id, artists},
    });
  } catch (error) {
    console.log({error});
    yield put({type: actions.GET_TRACK_ERROR, payload: error});
  }
}

export function* playlistSagas() {
  yield takeLatest(actions.GET_PLAYLISTS, fetchPlaylists);
  yield takeLatest(actions.GET_TRACK, fetchTracks);
}
