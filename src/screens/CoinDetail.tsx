import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Box, DetailItem, Text } from 'src/components';
import { StoreContext } from 'src/context';
import { MainStackParamList } from 'src/types/navigation';
import {
  LineChart,
} from "react-native-chart-kit";
import theme from 'src/theme';
import { DEVICE_WIDTH } from 'src/utils/dimensions';

interface Props extends NativeStackScreenProps<MainStackParamList, 'CoinDetail'> { }


export default observer(function ({ navigation, route }: Props) {

  const { store } = useContext(StoreContext)

  const [eurPrice, setEurPrice] = useState(null)
  const [gbpPrice, setGbpPrice] = useState(null)
  const [coin, setCoin] = useState(store.coin.coinMap.get(route.params.id))
  const [loading, setLoading] = useState(true)
  const [isGraphLoading, setGraphLoading] = useState(true)
  const [points, setPoints] = useState([])

  const { name, symbol, displaySymbol, currentUSDPrice, marketCap, dailyPriceChangePercentage, totalDailyVolume, highDay, lowDay, circulatingSupply, supply } = coin

  const fetchCoinHistory = async () => {
    try {
      const coinHistory = await store.coin.fetchCoinHistory({ symbol, timeframe: 'day', limit: 30 })
      setPoints(coinHistory)
    } catch (err) {
      showMessage({ message: err });
    }
  }

  const fetchCoinInfo = useCallback(async ({ currency, symbol }) => {
    try {
      const newCoinInfo = await store.coin.fetchCoinInfo({ currency, symbol })
      if (newCoinInfo.TOSYMBOL === 'EUR') {
        setEurPrice(newCoinInfo.PRICE)
      } else if (newCoinInfo.TOSYMBOL === 'GBP') {
        setGbpPrice(newCoinInfo.PRICE)
      }
    } catch (err) {
      showMessage({ message: err });
    }
  }, [coin])



  useEffect(() => {
    async function load() {
      setLoading(true)
      setGraphLoading(true)
      await fetchCoinInfo({ currency: 'GBP', symbol: coin.symbol })
      await fetchCoinInfo({ currency: 'EUR', symbol: coin.symbol })
      setLoading(false)
      await fetchCoinHistory()
      setGraphLoading(false)
    }
    load()
  }, [])


  return (
    <Box
      height="100%"
      padding="l">
      <DetailItem value={name} titleVariant="title" />
      <DetailItem title="Symbol" value={displaySymbol} />
      <DetailItem title="Market Cap" value={marketCap} />
      <DetailItem title="Daily Price Percentage Change" value={dailyPriceChangePercentage} />
      <DetailItem title="Total Daily Volume" value={totalDailyVolume} />
      <DetailItem title="Highest Value Today" value={highDay} />
      <DetailItem title="Lowest Value Today" value={lowDay} />
      {loading ? <Text variant='subtitle' color='black'>Loading...</Text> :
        <Box>
          <DetailItem title="Price in EUR" value={eurPrice} symbol="€" />
          <DetailItem title="Price in GBP" value={gbpPrice} symbol="£" />
        </Box>}
      <DetailItem title="Price in USD" value={currentUSDPrice} />
      <DetailItem title="Circulating supply" value={circulatingSupply} />
      <DetailItem title="Total supply" value={supply} />
      {isGraphLoading ? null : <LineChart
        //@ts-ignore
        data={{
          // labels: points.map(({ date }) => date),
          datasets: [
            {
              data: points.map(({ value }) => value)
            }
          ]
        }}
        xAxisLabel={"TIME"}
        width={DEVICE_WIDTH - 60}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="$"
        yAxisInterval={2}
        formatXLabel={() => 's'}
        chartConfig={{
          backgroundColor: theme.colors.primary,
          backgroundGradientFrom: theme.colors.primary,
          backgroundGradientTo: theme.colors.black10,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => 'black',
          labelColor: (opacity = 1) => 'black',
          propsForLabels: {
            fontSize: 8
          },
          propsForDots: {
            r: 2,
            strokeWidth: 1,
          }
        }}
        bezier
        style={{ paddingTop: 8 }}
      />}
    </Box>
  );
})
