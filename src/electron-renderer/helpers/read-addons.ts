import { executeAction } from './ipc-processor';
import { Addon } from '../types/addons';
import { AnswerData } from '../types/main-process';

interface ReadAddonsData extends AnswerData {
  addons: Array<Addon>;
}

export default function(path:string):Promise<ReadAddonsData> {
  return executeAction('get-addons', { path }, true).then((data:AnswerData) =>
    Promise.resolve(<ReadAddonsData> data));
}
