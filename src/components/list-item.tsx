import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Star } from 'src/icons';
import { Box, Text, DetailItem, Pressable, Button } from './index';

export interface CoinItemProps {
  id: string;
  name: string;
  symbol: string;
  displaySymbol: string;
  currentUSDPrice: number;
  marketCap: number;
  dailyPriceChangePercentage: number;
  totalDailyVolume: number;
  highDay: number;
  lowDay: number;
}

interface ListItemProps extends StyleProp<any>, CoinItemProps {
  onPress: () => void;
  onFavoritePress: () => void;
  style?: ViewStyle;
}
export default function ({ onPress, onFavoritePress, isSaved, name, symbol, displaySymbol, currentUSDPrice, marketCap, dailyPriceChangePercentage, totalDailyVolume, highDay, lowDay, style, ...rest }: ListItemProps) {
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
      <Box flexDirection='row' justifyContent='space-between' >
        <DetailItem value={name} titleVariant="title" />
        <Button onPress={onFavoritePress} variant='primary' backgroundColor='black10'>
          <Star fillColor={isSaved ? "#EB9999" : "none"} />
        </Button>
      </Box>
      <DetailItem title="Symbol" value={displaySymbol} />
      <DetailItem title="Current USD Price" value={currentUSDPrice} />
      <DetailItem title="Market Cap" value={marketCap} />
      <DetailItem title="Daily Price Percentage Change" value={dailyPriceChangePercentage} />
      <DetailItem title="Total Daily Volume" value={totalDailyVolume} />
      <DetailItem title="Highest Value Today" value={highDay} />
      <DetailItem title="Lowest Value Today" value={lowDay} />
    </Pressable>
  );
}
