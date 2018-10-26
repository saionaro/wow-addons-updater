import { executeAction } from './ipc-processor';
import { AnswerData } from '../types/main-process';

export default function(searchQuery:string):Promise<void|AnswerData> {
  return executeAction('search-addon', { searchQuery }, true);
}
