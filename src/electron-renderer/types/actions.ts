import {
   SetAddonsDirectoryPayload,
   SetAddonsListPayload,
   SetFetchStatePayload,
   SetUpdatedStatePayload,
   SetFailedReadPayload,
   SetUpdateProcessPayload,
} from './addons';
import { SetSearchResultPayload } from './search';

export interface AnyPayload extends
   SetAddonsDirectoryPayload,
   SetAddonsListPayload,
   SetFetchStatePayload,
   SetUpdatedStatePayload,
   SetFailedReadPayload,
   SetUpdateProcessPayload,
   SetSearchResultPayload {

}

export interface Action {
   type: string;
   payload?: AnyPayload;
}
