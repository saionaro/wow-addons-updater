import nanoid from 'nanoid';
const { ipcRenderer } = window.require('electron');

const subscribes = {};
const promises = {};

const wrapper = (event, answer) => {
  if (answer.fail) {
    promises[answer.uuid].rej(answer.error);
  } else {
    promises[answer.uuid].res(answer.data);
  }
  delete promises[answer.uuid];
};

const callbackGatherer = (store, uuid) => (res, rej) =>
  (store[uuid] = { res, rej });

export function executeAction(action, payload, needAnswer) {
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
