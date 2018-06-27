const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');

const gatherAddonsWrapper = require('./actions/addons-gatherer.js');
const downloadAddonWrapper = require('./actions/addon-loader.js');
const chooseDirectoryWrapper = require('./actions/directory-chooser.js');

const inst = {
  window: null,
  tempPath: ''
};

const createWindow = (x, y) => new BrowserWindow({
  width: x,
  height: y,
  titleBarStyle: 'hiddenInset'
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  inst.window = createWindow(800, 600);
  inst.window.loadFile('./dist/index.html');
  if (process.env.NODE_ENV === 'development') {
    inst.window.webContents.openDevTools();
  }
  inst.tempPath = app.getPath('temp');

  // console.log(app.getPath('userData'));
  ipcMain.on('action/get-addons', gatherAddonsWrapper(inst));
  ipcMain.on('action/get-addon-data', downloadAddonWrapper(inst));
  ipcMain.on('action/choose-directory', chooseDirectoryWrapper(inst));
});
