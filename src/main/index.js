import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import Navigator from './navigator';
import {store} from './redux';

export default function Main() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
