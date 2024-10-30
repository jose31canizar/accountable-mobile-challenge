import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Star } from 'src/icons';
import theme from 'src/theme';
import { Box, Text, DetailItem, Pressable, Button } from './index';

export interface CoinItemProps {
  id: string;
  name: string;
  symbol: string;
  displaySymbol: string;
  currentUSDPrice: number;
  marketCap: number;
  hourlyPriceChangePercentage: number;
  totalDailyVolume: number;
  highDay: number;
  lowDay: number;
}

interface ListItemProps extends CoinItemProps {
  onPress: () => void;
  onFavoritePress: () => void;
  isSaved?: boolean;
}

export default function ({ onPress, onFavoritePress, isSaved, name, symbol, displaySymbol, currentUSDPrice, marketCap, hourlyPriceChangePercentage, totalDailyVolume, highDay, lowDay }: ListItemProps) {
  return (
    <Pressable
      flex={1}
      marginTop="s"
      marginHorizontal="s"
      padding='s'
      backgroundColor='black10'
      borderRadius={16}
      onPress={onPress}>
      <Box flexDirection='row' justifyContent='space-between' >
        <DetailItem value={name} titleVariant="title" />
        <Button accessibilityLabel="favoriteButton" onPress={onFavoritePress} variant='primary' backgroundColor='black10'>
          <Star accessibilityLabel="starIcon" fillColor={isSaved ? "#EB9999" : theme.colors.black10} />
        </Button>
      </Box>
      <DetailItem title="Symbol" value={displaySymbol} />
      <DetailItem title="Current USD Price" value={currentUSDPrice} />
      <DetailItem title="Market Cap" value={marketCap} />
      <DetailItem title="Daily Price Percentage Change" value={hourlyPriceChangePercentage} />
      <DetailItem title="Total Daily Volume" value={totalDailyVolume} />
      <DetailItem title="Highest Value Today" value={highDay} />
      <DetailItem title="Lowest Value Today" value={lowDay} />
    </Pressable>
  );
}
