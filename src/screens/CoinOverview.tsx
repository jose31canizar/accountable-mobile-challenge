import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, SafeAreaView, Text, List, ListItem } from "src/components";
import { observer } from "mobx-react";
import { HomeTabParamList, MainStackParamList } from 'src/types/navigation';
import { StatusBar } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from 'src/context';
import { CoinItemProps } from "components/list-item";
import { showMessage } from "react-native-flash-message";
import { clearData } from "src/utils/storage";
import { ObservableMap } from "mobx";
import { CoinResult } from "src/store/coin-store";

const INITIAL_PAGE = 0;

type OverviewNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'CoinOverview'>,
  NativeStackScreenProps<MainStackParamList>
>;

export interface paginationProps {
  page?: number;
  limit?: number;
  enableCache?: boolean;
}

interface ExtraRenderItemProps {
  isSaved: boolean;
}


interface RenderItemProps {
  item: CoinItemProps & ExtraRenderItemProps;
}

interface RenderItemGeneratorProps {
  favorites?: ObservableMap<number, CoinResult>;
  onPress: ({ id, name, symbol: string }) => void;
  onFavoritePress: ({ id }) => void;
}

export const renderItem = ({ onPress, onFavoritePress }: RenderItemGeneratorProps) => (props: RenderItemProps) => {
  const { id, name, symbol, displaySymbol, currentUSDPrice, marketCap, hourlyPriceChangePercentage, highDay, lowDay, totalDailyVolume, isSaved } = props.item;

  return <ListItem
    onPress={() => onPress({ id, name, symbol })}
    onFavoritePress={() => onFavoritePress({ id })}
    isSaved={isSaved}
    id={id}
    name={name}
    symbol={symbol}
    displaySymbol={displaySymbol}
    currentUSDPrice={currentUSDPrice}
    marketCap={marketCap}
    hourlyPriceChangePercentage={hourlyPriceChangePercentage}
    totalDailyVolume={totalDailyVolume}
    highDay={highDay}
    lowDay={lowDay}
  />
}

export default observer(function ({
  navigation,
  route,
}: OverviewNavigationProps) {

  const { store } = useContext(StoreContext)
  const [coins, setCoins] = useState([])
  const [paginationCounter, setPaginationCounter] = useState(store.coin.coinMap.size / 10)
  const [isListRefreshing, setRefreshing] = useState(false)

  const fetchCoins = useCallback(async ({ page, enableCache }: paginationProps) => {
    try {
      setRefreshing(true)
      const newCoins = await store.coin.fetchCoins({ page, enableCache })
      const mergedCoins = [...coins, ...newCoins]
      setCoins(mergedCoins.map((coin) => ({ ...coin, isSaved: store.coin.favorites?.has(coin.id) })))
      if (newCoins.length !== 0) {
        setPaginationCounter(paginationCounter + 1)
      }
    } catch (err) {
      showMessage({ message: err });
    } finally {
      setRefreshing(false)
    }
  }, [coins, paginationCounter])

  useEffect(() => {
    fetchCoins({ page: INITIAL_PAGE, enableCache: true })
  }, [])


  const onRefresh = async () => {
    setPaginationCounter(INITIAL_PAGE)
    setCoins([])
    await clearData()
    fetchCoins({ page: INITIAL_PAGE })
  }

  const onEndReached = useCallback(() => {
    if (coins.length) {
      fetchCoins({ page: paginationCounter })
    }
  }, [paginationCounter])

  const onItemPress = ({ name, symbol, id }) => {
    if (store.network.isOffline) {
      showMessage({ message: "Oh no! Looks like we've lost connection 😔" })
    } else {
      navigation.navigate('CoinDetail', { title: `${name} (${symbol})`, id })
    }
  }

  const onFavoritePress = useCallback(({ id }) => {
    if (store.coin.favorites.has(id)) {
      store.coin.removeCoin({ id })
    } else {
      store.coin.saveCoin({ id })
    }
    setCoins(coins.map((coin) => ({ ...coin, isSaved: store.coin.favorites?.has(coin.id) })))
  }, [coins, store.coin.favorites])


  return <Box
    flex={1}
    justifyContent="flex-start"
    backgroundColor="primary"
  >
    <StatusBar barStyle="light-content" />
    <SafeAreaView flex={1} backgroundColor="primary">
      <List
        data={coins.slice()}
        renderItem={renderItem({ onPress: onItemPress, onFavoritePress })}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        refreshing={isListRefreshing}
      />
    </SafeAreaView>
  </Box>
})