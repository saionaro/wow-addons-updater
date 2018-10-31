import { Addon } from './addons';

export interface SetSearchResultPayload {
   fullData: Addon;
   list: Array<Addon>;
}

interface CacheMap {
   [key: string]: Addon;
 }

export interface StoreState {
   readonly cache: CacheMap;
   readonly pending: boolean;
   readonly list: ReadonlyArray<string>;
}
