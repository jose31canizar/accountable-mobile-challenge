import {
    applySnapshot,
    cast,
    flow,
    getType,
    onSnapshot,
    SnapshotIn,
    types,
  } from 'mobx-state-tree';
  import { storage } from './mmk-store';
  
  export const NetworkStore = types
    .model({
      isOffline: types.maybeNull(types.string),
      isShowingMessage: types.maybeNull(types.string)
    })
    .actions(self => {
      const changeInfo = (data: SnapshotIn<typeof NetworkStore>) => {
        applySnapshot(self, data);
      };
  
      return {changeInfo};
    })
    .actions(self => {
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
  
      return { clear };
    });
  
  export const networkStore = NetworkStore.create({});
  
  onSnapshot(networkStore, snapshot => {
    // storage.set('network.store', JSON.stringify(snapshot));
  });
  
  type NetworkStoreType = typeof networkStore;
  
  export type {NetworkStoreType};
  