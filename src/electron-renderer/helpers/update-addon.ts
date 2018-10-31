import { executeAction } from './ipc-processor';
import { Addon } from '../types/addons';
import { AnswerData } from '../types/main-process';

export default function(addonData:Addon, addonsDirectory:string):Promise<void|AnswerData> {
  return executeAction('get-addon-data', {
    addonData,
    addonsDirectory
  }, true);
}
