import { executeAction } from './ipc-processor.js';

export default function(addonData, addonsDirectory) {
  return executeAction('get-addon-data', {
    addonData,
    addonsDirectory
  }, true);
}
