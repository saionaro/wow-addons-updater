const { ipcRenderer } = window.require('electron');

export function executeAction(action, payload, needAnswer) {
  return new Promise((res, rej) => {
    ipcRenderer.send(`action/${action}`, payload);
    if (needAnswer) {
      const channel = `answer/${action}`;
      const callback = (event, answ) => {
        ipcRenderer.removeListener(channel, callback);
        if (answ.fail) {
          return rej(answ.error)
        }
        res(answ.data);
      };
      ipcRenderer.on(`answer/${action}`, callback);
    } else {
      res();
    }
  });
}
