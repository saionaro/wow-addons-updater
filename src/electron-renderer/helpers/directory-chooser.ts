import { executeAction } from './ipc-processor';
import { AnswerData } from '../types/main-process';

interface ChooseDirectoryData extends AnswerData {
  directory: string;
}

export default function():Promise<ChooseDirectoryData> {
  return executeAction('choose-directory', {}, true).then((data: AnswerData) =>
    Promise.resolve(<ChooseDirectoryData>data));
}
