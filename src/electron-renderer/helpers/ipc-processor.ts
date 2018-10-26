import nanoid = require('nanoid');
import { Answer, AnswerData } from '../types/main-process';
const { ipcRenderer } = (<any>window).require('electron');

interface PromiseControl {
  rej: Function;
  res: Function;
}

interface PromiseControlMap {
  [key: string]: PromiseControl;
}

interface SubscribersMap {
  [key: string]: boolean;
}

const subscribes:SubscribersMap = {};
const promises:PromiseControlMap = {};

const wrapper = (event:Event, answer:Answer) => {
  if (answer.fail) {
    promises[answer.uuid].rej(answer.error);
  } else {
    promises[answer.uuid].res(answer.data);
  }
  delete promises[answer.uuid];
};

const callbackGatherer = (store:PromiseControlMap, uuid:string) =>
  (res: Function, rej: Function) =>
    (store[uuid] = { res, rej });

export function executeAction(action:string, payload:object, needAnswer:boolean):Promise<void|AnswerData> {
  const uuid = nanoid();

  ipcRenderer.send(`action/${action}`, {
    ...payload,
    uuid,
  });

  if (needAnswer) {
    const channel = `answer/${action}`;

    if (!subscribes[channel]) {
      subscribes[channel] = true;
      ipcRenderer.on(channel, wrapper);
    }

    return new Promise(callbackGatherer(promises, uuid));
  }
  return Promise.resolve();
}
