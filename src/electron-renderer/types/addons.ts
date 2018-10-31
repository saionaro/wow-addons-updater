export interface Addon {
   id?: string;
   title: string;
   addonToken?: string;
   href?: string;
   archiveUrl?: string;
}

interface IdBoolMap {
   [key: string]: boolean;
}

export interface StoreState {
   readonly list: ReadonlyArray<Addon>;
   readonly directory: string;
   readonly fetching: IdBoolMap;
   readonly failed: IdBoolMap;
   readonly updated: IdBoolMap;
   readonly failedRead: boolean;
   readonly updateProcess: boolean;
}

export interface SetAddonsDirectoryPayload {
   path: string;
}

export interface SetAddonsListPayload {
   list: Array<Addon>;
}

export interface SetFetchStatePayload {
   id: string;
   state: boolean;
}

export interface SetUpdatedStatePayload {
   id: string;
   state: boolean;
}

export interface SetFailedReadPayload {
   state: boolean;
}

export interface SetUpdateProcessPayload {
   id: string;
   state: boolean;
}
