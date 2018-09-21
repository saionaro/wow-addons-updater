const fs = require('fs');
const path = require('path');
const request = require('request');
const AdmZip = require('adm-zip');

const log = require('../utils/logger.js');

const removeFile = path =>
  new Promise((res, rej) => {
    fs.unlink(path, err => {
      if (err) {
        return rej(err);
      }
      res();
    });
  });

const unzip = (path, destination) =>
  new Promise((res, rej) => {
    new AdmZip(path)
      .extractAllToAsync(destination, true, err => {
        if (err) {
          return rej(err);
        }
        removeFile(path)
          .then(res)
          .catch(rej);
      });
  });

const downloadFile = (title, url, tempPath) => {
  log(`Download ${url}`);
  const zipPath = path.join(tempPath, `${title}.zip`);
  return new Promise(res => {
    request(url)
      .pipe(fs.createWriteStream(zipPath))
      .on('finish', () => {
        res(zipPath);
      });
  });
};

const isZipUrl = res =>
  /zip$/.test(res.request.uri.href);

const getZipUrl = url =>
  new Promise((res, rej) => {
    log(`Fetching ${url}`);
    request(url, (err, response) => {
      if (err || !isZipUrl(response)) {
        log('Make error');
        return rej(err || new Error('Unknown error.'));
      }
      res(response.request.uri.href);
    });
  });

function updateAddon(instance, event, data) {
  const {
    title,
    addonsDirectory,
    uuid,
  } = data;
  log('Get data for ' + title);
  getZipUrl(`https://wow.curseforge.com/projects/${title}/files/latest`)
    .catch(() => {
      log('Second try');
      return getZipUrl(`https://www.wowace.com/projects/${title}/files/latest`);
    })
    .then(url => {
      return downloadFile(title, url, instance.tempPath);
    })
    .then(path => {
      return unzip(path, addonsDirectory);
    })
    .then(() => {
      log('Done');
      instance.window.webContents.send('answer/get-addon-data', {
        uuid,
        fail: false,
        data: {}
      });
    })
    .catch(err => {
      log('Caused error', err);
      instance.window.webContents.send('answer/get-addon-data', {
        uuid,
        fail: true,
        error: err
      });
    })
}

module.exports = function(instance) {
  return updateAddon.bind(null, instance);
};
