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
      isOffline: types.optional(types.boolean, false),
      isShowingMessage: types.optional(types.boolean, false),
    })
    .actions(self => {
      const set = (key, value) => {
        self[key] = value;
      };
  
      return {set};
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
  
    export const networkStore = NetworkStore.create({
      isOffline: false,
      isShowingMessage: false,
    });
    
    type NetworkStoreType = typeof networkStore;
    
    export type {NetworkStoreType};