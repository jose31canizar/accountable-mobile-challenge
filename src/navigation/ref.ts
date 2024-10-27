import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';
import {MainStackParamList} from 'src/types';

export const navigationRef =
  React.createRef<NavigationContainerRef<MainStackParamList>>();
