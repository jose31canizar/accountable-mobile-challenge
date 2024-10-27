import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Box, DetailItem } from 'src/components';
import { StoreContext } from 'src/context';
import { MainStackParamList } from 'src/types/navigation';

interface Props extends NativeStackScreenProps<MainStackParamList, 'CoinDetail'> { }


export default observer(function ({ navigation, route }: Props) {
  const { store } = useContext(StoreContext)

  const [coin, setCoin] = useState(store.coin.coinMap.get(route.params.id))

  const { name, symbol, currentUSDPrice, marketCapRank, dailyPriceChangePercent, weeklyPriceChangePercent } = coin

  return (
    <Box
      height="100%"
      padding="s"
      backgroundColor="primary">
      <DetailItem value={name} titleVariant="title" />
      <DetailItem title="Symbol" value={symbol} />
      <DetailItem title="Current USD Price" value={currentUSDPrice} />
      <DetailItem title="Market Cap Rank" value={marketCapRank} />
      <DetailItem title="Daily Price Percentage Change" value={dailyPriceChangePercent} />
      <DetailItem title="Weekly Price Percentage Change" value={weeklyPriceChangePercent} />

      <DetailItem title="Price in USD" value={0} />
      <DetailItem title="Price in EUR" value={0} />
      <DetailItem title="Price in GBP" value={0} />
      <DetailItem title="Market Cap" value={0} />
      <DetailItem title="24-hour trading volume" value={0} />
      <DetailItem title="Circulating supply" value={0} />
      <DetailItem title="Total supply" value={0} />
      <DetailItem title="All-time high price" value={0} />
      <DetailItem title="All-time low price" value={0} />
      <DetailItem title="Price chart (last 30 days)" value={0} />

      - Price in multiple currencies (USD, EUR, GBP, etc.)
      - Market cap
      - 24-hour trading volume
      - Circulating supply
      - Total supply (if available)
      - All-time high price
      - All-time low price
      - Price chart (last 30 days)
    </Box>
  );
})
