const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const extract = require("extract-zip");
const UserAgent = require("user-agents");

const PREFIX = "https://www.curseforge.com";

const generateAgent = new UserAgent({ platform: "Win32" });

const FAKE_HEADERS = {
  authority: "www.curseforge.com",
  method: "GET",
  accept: "text/html,application/xhtml+xml,application/xml;",
  "accept-language": "en-US,en;"
};

const log = require("../utils/logger.js");

const getConfig = url => ({
  url,
  headers: {
    ...FAKE_HEADERS,
    "user-agent": generateAgent()
  }
});

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
    extract(path, { dir: destination }, function(err) {
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
    request(getConfig(url))
      .pipe(fs.createWriteStream(zipPath))
      .on("finish", () => {
        res(zipPath);
      });
  });
};

const getZipUrl = url => {
  return new Promise((res, rej) => {
    request(getConfig(url), (err, _response, body) => {
      if (err) {
        return rej(err);
      }

      const bodyContent = cheerio.load(body);
      const rows = bodyContent(".listing-project-file tr");

      const needsRow = Array.prototype.find.call(rows, item => {
        const rowContent = cheerio.load(item);
        const tds = rowContent("td");

        const versionType = tds
          .eq(0)
          .text()
          .trim();

        if (versionType !== "R") {
          return false;
        }

        const gameVersion = tds
          .eq(4)
          .text()
          .trim();

        if (parseInt(gameVersion, 10) < 8) {
          return false;
        }

        return true;
      });

      try {
        const needsRowContent = cheerio.load(needsRow);
        const td = needsRowContent("td").last();
        const tdContent = cheerio.load(td.html());
        const url = tdContent("a")
          .eq(0)
          .attr("href")
          .trim();

        res(`${PREFIX}${url}/file`);
      } catch (e) {
        rej(e);
      }
    });
  });
};

const buildCurseUrl = title =>
  `https://www.curseforge.com/wow/addons/${title}/files`;

function loadAddon(instance, event, data) {
  const {
    addonData: { title, archiveUrl, addonToken },
    addonsDirectory,
    uuid
  } = data;
  log("Get data for " + title);

  getZipUrl(archiveUrl || buildCurseUrl(addonToken || title))
    .then(url => {
      return downloadFile(title, url, instance.tempPath);
    })
    .then(path => {
      return unzip(path, addonsDirectory);
    })
    .then(() => {
      log("Done");
      instance.window.webContents.send("answer/get-addon-data", {
        uuid,
        fail: false,
        data: {}
      });
    })
    .catch(err => {
      log("Caused error", err);
      instance.window.webContents.send("answer/get-addon-data", {
        uuid,
        fail: true,
        error: err
      });
    });
}

module.exports = function(instance) {
  return loadAddon.bind(null, instance);
};
