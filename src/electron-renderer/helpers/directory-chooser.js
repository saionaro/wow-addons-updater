import { executeAction } from './ipc-processor.js';

export default function() {
  return executeAction('choose-directory', {}, true);
}
