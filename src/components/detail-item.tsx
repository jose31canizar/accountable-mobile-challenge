import { ResponsiveValue } from '@shopify/restyle';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { formatFiatValue } from 'src/utils/currency';
import { Box, Text } from './index';

interface DetailProps extends StyleProp<any> {
  title?: string;
  value: string | number;
  style?: ViewStyle;
  titleVariant?: ResponsiveValue<"title" | "subtitle" | "caption", {}>;
  symbol?: string;
}
export default function ({ title, value, titleVariant = 'subtitle', symbol = "$", style, ...rest }: DetailProps) {
  return (
    <Box
      backgroundColor="black10"
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      {...rest}>
      {title ? <Text variant={titleVariant} color="black">{title}</Text> : null}
      <Box flexDirection='row'>
        {typeof value === 'number' ? <Text variant={titleVariant} color='black'>{symbol}</Text> : null}
        <Text variant={titleVariant} color="black">{typeof value === 'number' ? formatFiatValue(`${value}`) : value}</Text>
      </Box>

    </Box>
  );
}
