import {actions} from './actions';

const initState = {
  // people like to keep track of loading / error in redux
  // it make sense in some cases but not in this one ..
  loading: false,
  error: null,
  playlists: [],
};

export function reducer(state = initState, {payload, type}) {
  switch (type) {
    case actions.GET_PLAYLISTS:
      return {
        ...state,
        playlists: [...state.playlists, ...payload],
      };

    default:
      return state;
  }
}
