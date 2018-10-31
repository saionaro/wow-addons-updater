const { dialog } = require('electron');

function chooseDirectory(instance, event, options) {
  const { uuid } = options;
  const data = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (data && data[0]) {
    instance.window.webContents.send('answer/choose-directory', {
      uuid,
      fail: false,
      data: {
        directory: data[0],
      },
    });
  } else {
    instance.window.webContents.send('answer/choose-directory', {
      uuid,
      fail: true,
      error: new Error()
    });
  }
}

module.exports = function(instance) {
  return chooseDirectory.bind(null, instance);
};
