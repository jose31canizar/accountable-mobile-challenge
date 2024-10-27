import React from 'react';
import {TRootStore} from 'src/store/root-store';

export type TStoreContext = {
  store: TRootStore | null;
};

export const StoreContext = React.createContext<TStoreContext>({store: null});
