import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Navigator as PlaylistNavigator} from '../playlist/navigator';

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <PlaylistNavigator />
    </NavigationContainer>
  );
}
