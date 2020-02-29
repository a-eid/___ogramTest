import {all} from 'redux-saga/effects';
import {playlistSagas} from '../../playlist/redux/sagas';

export function* root() {
  yield all([playlistSagas()]);
}
