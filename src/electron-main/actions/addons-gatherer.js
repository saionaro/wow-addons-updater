const fs = require('fs');

const transform = addonTitle => ({
  id: addonTitle,
  name: addonTitle,
});

const normalizeName = name =>
  name
    .replace(/ /g, '-')
    .replace(/\r/, '')
    .replace(/-v1.*$/, '')
    .replace(/\n/, '');

function getAddonsList(instance, event, path) {
  const addons = {};
  fs.readdir(path, (err, folders) => {
    if (err) {
      instance.window.webContents.send('answer/get-addons', {
        fail: true,
        error: err
      });
      return;
    }
    const foldersCount = folders.length;
    let current = 0;
    const check = () => {
      current++;
      if (current === foldersCount) {
        instance.window.webContents.send('answer/get-addons', {
          fail: false,
          data: Object.keys(addons).map(transform)
        });
      }
    };
    folders.forEach((folder) => {
      fs.readdir(`${path}/${folder}`, (err, files) => {
        if (files) {
          const tocFile = files.find((file) => /toc$/.test(file));
          fs.readFile(`${path}/${folder}/${tocFile}`, 'utf8', (error, data) => {
            if (error) {
              return error;
            }
            const arr = data.split('\n');
            let name = arr.find((elem) => /^## Title:/i.test(elem));
            name = name.replace(/## Title: ?/, '');

            if (
              /^\|cffffe00a/.test(name) ||
              /^\|cffffd/.test(name)
            ) {
              name = 'Deadly Boss Mods';
            }
            if (/^WeakAuras/.test(name)) {
              name = 'WeakAuras 2';
            }
            if (/^Details/.test(name)) {
              name = 'Details';
            }

            name = normalizeName(name);
            addons[name] = true;
            check();
          });
        } else {
          check();
        }
      })
    });
  });
}

module.exports = function(instance) {
  return getAddonsList.bind(null, instance);
};
