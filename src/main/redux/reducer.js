import {combineReducers} from 'redux';
import {reducer as playlist} from '../../playlist/redux';

export const reducer = combineReducers({
  playlist,
});
