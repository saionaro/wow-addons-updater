const request = require('request');
const cheerio = require('cheerio');
const crypto = require('crypto');
const baseUrl = 'https://www.curseforge.com';
const searchUrl = `${baseUrl}/wow/addons/search?search=`;
const log = require('../utils/logger.js');

const clearTitle = title =>
  title
  && title.replace(/\n/g, '')
  && title.replace(/\s+\s/g, '');

function searchAddon(instance, event, data) {
  const {
    searchQuery,
    uuid,
  } = data;
  log('Get data for ' + searchQuery);
  if (!searchQuery) {
    return instance.window.webContents.send('answer/search-addon', {
      uuid,
      fail: false,
      data: {
        fullData: {},
        list: [],
      },
    });
  }
  request(`${searchUrl}${searchQuery}`, (err, response, body) => {
    if (err) {
      return instance.window.webContents.send('answer/search-addon', {
        uuid,
        fail: true,
        error: err,
      });
    }
    const $ = cheerio.load(body);
    const addons = $('.project-list-item');
    const fullData = {};
    const list = [].map.call(addons, item => {
      const $item = cheerio.load(item);
      const md5sum = crypto.createHash('md5');
      const title = clearTitle($item('.list-item__title').text());
      const href = `${baseUrl}${$item('.list-item__details a').attr('href')}`;
      md5sum.update(`${title}${href}`);
      const hash = md5sum.digest('hex');
      fullData[hash] = {
        title: clearTitle($item('.list-item__title').text()),
        href: `${baseUrl}${$item('.list-item__details a').attr('href')}`,
      };
      return hash;
    });
    instance.window.webContents.send('answer/search-addon', {
      uuid,
      fail: false,
      data: {
        fullData,
        list: list
      },
    });
  });
}

module.exports = function(instance) {
  return searchAddon.bind(null, instance);
};
