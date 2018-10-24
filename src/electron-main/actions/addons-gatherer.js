const fs = require('fs');

const transform = addonTitle => ({
  id: addonTitle,
  title: addonTitle,
});

const normalizeName = name =>
  name
    .replace(/ /g, '-')
    .replace(/\r/, '')
    .replace(/-v1.*$/, '')
    .replace(/\n/, '');

const sorterer = (fst, scd) => {
  const item1 = fst.toLowerCase();
  const item2 = scd.toLowerCase();
  if (item1 < item2) return -1;
  if (item1 > item2) return 1;
  return 0;
}

function getAddonsList(instance, event, data) {
  const { path, uuid } = data;
  const addons = {};
  fs.readdir(path, (err, folders) => {
    if (err) {
      instance.window.webContents.send('answer/get-addons', {
        uuid,
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
          uuid,
          fail: false,
          data: Object.keys(addons).sort(sorterer).map(transform),
        });
      }
    };
    folders.forEach((folder) => {
      fs.readdir(`${path}/${folder}`, (err, files) => {
        if (files) {
          const tocFile = files.find((file) => /toc$/.test(file));
          fs.readFile(`${path}/${folder}/${tocFile}`, 'utf8', (error, data) => {
            if (error) {
              check();
              return error;
            }
            const arr = data.split('\n');
            let name = arr.find((elem) => /^## Title:/i.test(elem));
            if (!name) {
              return check();
            }
            name = name.replace(/## Title: ?/, '');

            if (
              /^\|cffffe00a/.test(name) ||
              /^\|cffffd/.test(name)
            ) {
              name = 'Deadly Boss Mods';
            }
            if (/^weakauras/i.test(name)) {
              name = 'WeakAuras 2';
            }
            if (/^details/i.test(name)) {
              name = 'Details';
            }
            if (/raider\.io/i.test(name)) {
              name = 'RaiderIO';
            }
            if (/vuhdo/i.test(name)) {
              name = 'Vuhdo';
            }
            if (/o item level/i.test(name)) {
              name = 'O Item Level';
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
