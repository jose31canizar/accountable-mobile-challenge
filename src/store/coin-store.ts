import {
  applySnapshot,
  cast,
  flow,
  getType,
  onSnapshot,
  SnapshotIn,
  types,
} from 'mobx-state-tree';
import API from 'src/api'
import { transformCoins } from 'src/utils/coin';
import { storage } from './mmk-store';

export interface CoinResult {
  Id: string;
  CoinName: string;
  Symbol: string;
  FakePriceChangePercentage24h: number;
  FakePriceChangePercentage7d: number;
}

export const Coin = types.model({
  id: types.number,
  name: types.string,
  symbol: types.string,
  currentUSDPrice: types.number,
  marketCapRank: types.number,
  dailyPriceChangePercentage: types.number,
  weeklyPriceChangePercentage: types.number
});

export const CoinStore = types
  .model({
    coinMap: types.map(Coin),
  })
  .actions(self => {
    const changeInfo = (data: SnapshotIn<typeof CoinStore>) => {
      applySnapshot(self, data);
    };

    return {changeInfo};
  })
  .actions(self => {
    const queryCoins = flow(function*({ query }) {
      let coinResult: CoinResult[]
      try {
        coinResult = yield API.searchCoins({ query })
        } catch(err) {
          console.log(err)
          throw err;
        }
        console.log(coinResult.length)
      return transformCoins(coinResult)
    })

    const fetchCoins = flow(function*({ page, enableCache }) {
      let coinResult: CoinResult[]

      if(self.coinMap.size && enableCache) {
        return Array.from(self.coinMap.values())
      }

      try {
      coinResult = yield API.getCoins({ page })
      } catch(err) {
        throw err;
      }

      try {
        coinResult.forEach((coin: CoinResult) => {
          self.coinMap.set(Number(coin.Id), {
          id: Number(coin.Id),
          name: coin.CoinName,
          symbol: coin.Symbol,
          currentUSDPrice: 0,
          marketCapRank: 0,
          dailyPriceChangePercentage: coin.FakePriceChangePercentage24h,
          weeklyPriceChangePercentage: coin.FakePriceChangePercentage7d
          })
        })
        } catch(err) {
          throw err;
        }

      return transformCoins(coinResult)
    })

    const init = flow(function* () {
      const rehydratedStore = storage.getString('coin.store')
      if (rehydratedStore) {
        console.log('count', Object.entries(JSON.parse(rehydratedStore).coinMap)?.length)
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

    return {init, clear, fetchCoins, queryCoins};
  });

export const coinStore = CoinStore.create({});

onSnapshot(coinStore, snapshot => {
  storage.set('coin.store', JSON.stringify(snapshot));
});

type CoinStoreType = typeof coinStore;

export type {CoinStoreType};
