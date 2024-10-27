import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Box, Text, DetailItem, Pressable } from './index';

export interface CoinItemProps {
  id: string;
  name: string;
  symbol: string;
  currentUSDPrice: number;
  marketCapRank: number;
  dailyPriceChangePercent: number;
  weeklyPriceChangePercent: number;
}

interface ListItemProps extends StyleProp<any>, CoinItemProps {
  style?: ViewStyle;
}
export default function ({ onPress, name, symbol, currentUSDPrice, marketCapRank, dailyPriceChangePercent, weeklyPriceChangePercent, style, ...rest }: ListItemProps) {
  return (
    <Pressable
      flex={1}
      marginTop="s"
      marginHorizontal="s"
      padding='s'
      backgroundColor='black10'
      borderRadius={16}
      {...rest}
      onPress={onPress}>
      <DetailItem value={name} titleVariant="title" />
      <DetailItem title="Symbol" value={symbol} />
      <DetailItem title="Current USD Price" value={currentUSDPrice} />
      <DetailItem title="Market Cap Rank" value={marketCapRank} />
      <DetailItem title="Daily Price Percentage Change" value={dailyPriceChangePercent} />
      <DetailItem title="Weekly Price Percentage Change" value={weeklyPriceChangePercent} />
    </Pressable>
  );
}
