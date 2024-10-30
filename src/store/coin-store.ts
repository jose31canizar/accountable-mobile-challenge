import { observable, ObservableMap } from 'mobx';
import {
  applySnapshot,
  cast,
  flow,
  getType,
  onSnapshot,
  SnapshotIn,
  types,
} from 'mobx-state-tree';
import { showMessage } from 'react-native-flash-message';
import API from 'src/api'
import { paginationProps } from 'src/screens/CoinOverview';
import { transformCoin, transformCoins } from 'src/utils/coin';
import { storage } from './mmk-store';

export interface PastDay {
  high: number;
  low: number;
}

export interface PastHour {
  high: number;
  changePct: number;
}

export interface MarketData {
  supply: number;
  mktCap: number;
}

export interface VolumeData {
  totalVolume24H: number;
}

export interface CoinResult {
 id: number;
 fullName: string;
 name: string;
 pastHour: PastHour;
 pastDay: PastDay;
 marketData: MarketData;
 volumeData: VolumeData;
}

export const Coin = types.model({
  id: types.number,
  name: types.optional(types.string, ''),
  symbol: types.optional(types.string, ''),
  displaySymbol: types.optional(types.string, ''),
  currentUSDPrice: types.optional(types.number, 0),
  marketCap: types.optional(types.number, 0),
  hourlyPriceChangePercentage: types.optional(types.number, 0),
  supply: types.optional(types.number, 0),
  totalDailyVolume: types.optional(types.number, 0),
  highDay: types.optional(types.number, 0),
  lowDay: types.optional(types.number, 0),
});

export const Currency = types.enumeration("Currency", ["USD", "EUR", "GBP"])

export interface CoinHistoryProps {
  currency: string;
  symbol: string;
  timeframe: string;
  limit: string;
}

export const CoinStore = types
  .model({
    coinMap: types.map(Coin),
    favorites: types.map(Coin),
    currency: Currency
  })
  .actions(self => {
    const changeInfo = (data: SnapshotIn<typeof CoinStore>) => {
      applySnapshot(self, data);
    };

    return {changeInfo};
  })
  .actions(self => {
    const fetchCoinHistory = flow(function*({ currency, symbol, timeframe, limit}: CoinHistoryProps) {
      try {
        const coinInfo = yield API.getCoinHistory({ currency: self.currency, symbol, timeframe, limit })
        return coinInfo.map(({ time, high }) => ({ value: high, date: time }));
      } catch(err) {
        showMessage(err?.message || err)
      }
    })

    const fetchCoinInfo = flow(function*({ currency, symbol }) {
      try {
        const coinInfo = yield API.getCoinInfo({ currency, symbol })
        return coinInfo
      } catch(err) {
        showMessage(err?.message || err)
      }
    })

    const saveCoin = flow(function*({ id }) {
      try {
        self.favorites.set(id, {...self.coinMap.get(id)})
      } catch(err) {
        showMessage(err?.message || err)
      }
    })

    const removeCoin = flow(function*({ id }) {
      self.favorites.delete(id)
    })

    const queryCoins = flow(function*({ query }) {
      let coinResult: CoinResult[]
      try {
        coinResult = yield API.searchCoins({ query })
        } catch(err) {
          showMessage(err?.message || err)
          throw err;
        }
      return transformCoins(coinResult, self.currency)
    })

    const fetchCoins = flow(function*({ page, enableCache }: paginationProps) {
      let coinResult: CoinResult[]

      if(self.coinMap.size && enableCache) {
        return Array.from(self.coinMap.values())
      }

      try {
      coinResult = yield API.getCoins({ page })
      
      } catch(err) {
        showMessage(err?.message || err)
        return []
      }

      try {
        coinResult.forEach((coin: CoinResult) => {
          try {
          self.coinMap.set(Number(coin.id), transformCoin(self.currency)(coin))
          } catch(err) {
           showMessage(err?.message || err)
           
          }
        })
        } catch(err) {
          showMessage(err?.message || err)
          if(err?.message === "Internal Server Error" ) {
            return []
          }
        }

      return transformCoins(coinResult, self.currency)
    })

    const init = flow(function* () {
      const rehydratedStore = storage.getString('coin.store')
      if (rehydratedStore) {
        // console.log('count', Object.entries(JSON.parse(rehydratedStore).coinMap)?.length)
        applySnapshot(self, JSON.parse(rehydratedStore));
      }
    });

    const clear = () => {
      // @ts-ignore
      const modelProperties = getType(self).properties;

      Object.entries(modelProperties).map(entry => {
        // @ts-ignore
        if ([entry[1]._defaultValue]) {
          // @ts-ignore
          self[entry[0]] = cast(entry[1]._defaultValue);
        } else {
          self[entry[0]] = cast(null);
        }
      });
    };

    return {init, clear, fetchCoins, queryCoins, saveCoin, removeCoin, fetchCoinInfo, fetchCoinHistory};
  });

export const coinStore = CoinStore.create({
  currency: 'USD'
});

onSnapshot(coinStore, snapshot => {
  storage.set('coin.store', JSON.stringify(snapshot));
});

type CoinStoreType = typeof coinStore;

export type {CoinStoreType};
