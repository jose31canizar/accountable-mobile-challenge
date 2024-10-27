import { ResponsiveValue } from '@shopify/restyle';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Box, Text } from './index';

interface DetailProps extends StyleProp<any> {
  title?: string;
  value: string | number;
  style?: ViewStyle;
  titleVariant?: ResponsiveValue<"title" | "subtitle" | "caption", {}>;
}
export default function ({ title, value, titleVariant = 'subtitle', style, ...rest }: DetailProps) {
  return (
    <Box
      backgroundColor="black10"
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      {...rest}>
      {title ? <Text variant={titleVariant} color="black">{title}</Text> : null}
      <Text variant={titleVariant} color="black">{value}</Text>
    </Box>
  );
}
