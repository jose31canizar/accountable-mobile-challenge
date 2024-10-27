import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './index';

export default function ({ selected = false, color = "#171717", size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} fill="none">
      <Path fill={color} d="M7 15.353v1a1 1 0 0 0 1-1zM7 10.5l-.687-.726A1 1 0 0 0 6 10.5zm3 0h1a1 1 0 0 0-.342-.753zm0 4.853H9a1 1 0 0 0 1 1zm4.235 0v1a1 1 0 0 0 1-1zM16 8.176v1a1 1 0 0 0 .636-1.771zM8.5 2l.636-.772L8.5.705l-.636.523zM1 8.176l-.636-.771A1 1 0 0 0 1 9.176zm1.765 7.177h-1a1 1 0 0 0 1 1zm0-7.177h1v-1h-1zm11.47 0v-1h-1v1zM8 15.353V10.5H6v4.853zm-.313-4.126c.55-.521.744-.535.78-.535.056 0 .273.036.875.561l1.316-1.506c-.623-.544-1.332-1.05-2.183-1.055-.871-.003-1.566.518-2.162 1.082zM9 10.5v4.853h2V10.5zm1 5.853h4.235v-2H10zm6.636-8.948-7.5-6.177-1.272 1.544 7.5 6.176zM7.864 1.228l-7.5 6.177 1.272 1.543 7.5-6.176zm-5.1 15.125H7v-2H2.764zM1 9.176h1.765v-2H1zm.765-1v7.177h2V8.176zm14.235-1h-1.765v2H16zm-2.765 1v7.177h2V8.176z" />
    </Svg>
  );
}
