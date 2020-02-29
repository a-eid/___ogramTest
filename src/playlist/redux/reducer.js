import {actions} from './actions';
import produce from 'immer';

import {PAGE_SIZE} from '../api';

const initState = {
  page: 0,
  loading: false,
  error: null,
  next: null,
  playlists: [],
  track: {
    // [id] => ...
  },
};

export const reducer = produce((draft = initState, {type, payload}) => {
  switch (type) {
    case actions.GET_PLAYLISTS:
      draft.loading = true;
      break;

    case actions.GET_PLAYLISTS_SUCCESS:
      draft.loading = false;
      draft.playlists.push(...payload.items);
      draft.error = null;
      draft.next = payload.next;
      if (payload.items.length > 0) draft.page = payload.offset / PAGE_SIZE + 1;
      return draft;

    case actions.GET_PLAYLISTS_ERROR:
      draft.loading = false;
      break;

    case actions.GET_TRACK_SUCCESS:
      draft.track[payload.id] = payload;
      break;

    case actions.GET_TRACK_ERROR:
      //
      break;

    default:
      return draft;
  }
});
