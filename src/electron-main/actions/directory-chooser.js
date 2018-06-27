const { dialog } = require('electron');

function chooseDirectory(instance) {
  const data = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (data && data[0]) {
    instance.window.webContents.send('answer/choose-directory', {
      fail: false,
      data: data[0]
    });
  } else {
    instance.window.webContents.send('answer/choose-directory', {
      fail: true,
      error: new Error()
    });
  }
}

module.exports = function(instance) {
  return chooseDirectory.bind(null, instance);
};
