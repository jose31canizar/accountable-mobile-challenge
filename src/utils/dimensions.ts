import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;

export const SMALL_DEVICE_WIDTH = 320;

export const SMALL_DEVICE_HEIGHT = 760;

export const isSmallDevice = () => DEVICE_HEIGHT < SMALL_DEVICE_HEIGHT;
