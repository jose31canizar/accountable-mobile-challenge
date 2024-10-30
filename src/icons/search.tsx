import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './index';

export default function ({ selected = false, color = "#171717", size = 24, disabled }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3913 15.4516C13.1904 16.4201 11.6629 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.6627 16.4203 13.1901 15.4519 14.3909L20.4443 19.3833L19.3837 20.444L14.3913 15.4516ZM15.5 10C15.5 13.0376 13.0376 15.5 10 15.5C6.96243 15.5 4.5 13.0376 4.5 10C4.5 6.96243 6.96243 4.5 10 4.5C13.0376 4.5 15.5 6.96243 15.5 10Z"
        fill={color}
      />
    </Svg>
  );
}
