const { dialog } = require("electron");

async function chooseDirectory(instance, event, options) {
  const { uuid } = options;

  try {
    const { filePaths: data } = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    });

    if (data && data[0]) {
      instance.window.webContents.send("answer/choose-directory", {
        uuid,
        fail: false,
        data: {
          directory: data[0]
        }
      });
    } else {
      instance.window.webContents.send("answer/choose-directory", {
        uuid,
        fail: true,
        error: new Error()
      });
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = function(instance) {
  return chooseDirectory.bind(null, instance);
};
