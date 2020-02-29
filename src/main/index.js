import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import Navigator from './navigator';
import {configureStore} from './redux/store';
import {root as rootSaga} from './redux/saga';

const store = configureStore();
store.runSaga(rootSaga);

export default function Main() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
