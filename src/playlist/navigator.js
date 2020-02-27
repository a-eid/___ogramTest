import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {Atrists, Playlist} from './screens';

export const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Playlist" component={Playlist} />
    <Stack.Screen name="Artists" component={Atrists} />
  </Stack.Navigator>
);
