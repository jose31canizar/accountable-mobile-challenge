import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './index';

export default function ({ selected = false, fillColor = "none", color = "#EB9999", size = 24, disabled, ...rest }: IconProps) {
    return <Svg
        {...rest}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fillColor}>
        <Path stroke={color} strokeWidth={2} d="m10 1.236 1.519 4.674a2 2 0 0 0 1.902 1.382h4.914l-3.976 2.888a2 2 0 0 0-.726 2.236l1.518 4.674-3.975-2.888a2 2 0 0 0-2.352 0L4.85 17.09l1.518-4.674a2 2 0 0 0-.726-2.236L1.665 7.292h4.914A2 2 0 0 0 8.481 5.91z" />
    </Svg>
}