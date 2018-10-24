import { executeAction } from './ipc-processor.js';

export default function(searchQuery) {
  return executeAction('search-addon', { searchQuery }, true);
}
