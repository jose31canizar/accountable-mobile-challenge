import {types} from 'mobx-state-tree';
import {CoinStore, CoinStoreType} from './coin-store';
import {NetworkStore, NetworkStoreType} from './network-store';

export type TRootStore = {
  coin: CoinStoreType;
  network: NetworkStoreType;
  clear: () => Promise<void>;
};

const RootStore = types
  .model({
    coin: CoinStore,
    network: NetworkStore,
  })
  .actions(self => {
    const clear = async () => {
      self.coin.clear();
    };

    return {clear};
  });

export default RootStore;
