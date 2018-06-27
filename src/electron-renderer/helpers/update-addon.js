import { executeAction } from './ipc-processor.js';

export default function(title, addonsDirectory) {
  return executeAction('get-addon-data', {
    title,
    addonsDirectory
  }, true);
}
