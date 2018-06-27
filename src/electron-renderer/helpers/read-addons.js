import { executeAction } from './ipc-processor.js';

export default function(path) {
  return executeAction('get-addons', path, true);
}
