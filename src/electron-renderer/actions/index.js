import {
  SET_ADDONS_DIRECTORY,
  SET_ADDONS_LIST,
  SET_FETCH_STATE,
  SET_FAILED,
  SET_UPDATED,
  SET_FAILED_READ_ADDONS_STATE,
  SET_UPDATE_PROCESS,
} from '../actionTypes';

import readAddons from '../helpers/read-addons.js';
import updateAddonHelper from '../helpers/update-addon.js';
import chooseDirectoryHelper from '../helpers/directory-chooser.js';

const getSetDirectoryAction = path =>
  ({ type: SET_ADDONS_DIRECTORY, path });

export function setAddonsDirectory(path) {
  return dispatch => {
    dispatch(getSetDirectoryAction(path));
    readAddons(path).then(list => {
      dispatch(setFailedReadAddonsState(false));
      dispatch(setAddonsList(list));
    }).catch(() => {
      dispatch(setFailedReadAddonsState(true));
    });
  };
}

export function setAddonsList(list) {
  return { type: SET_ADDONS_LIST, list };
}

export function setFetchState(id, state) {
  return { type: SET_FETCH_STATE, id, state };
}

const updateCallback = (id, result, dispatch) => {
  dispatch(setFetchState(id, false));
  dispatch(setUpdated(id, result));
  dispatch(setFailed(id, !result));
  dispatch(setUpdateProcess(false));
};

const updateAddonInner = (id, directory, dispatch) => {
  dispatch(setFetchState(id, true));
  dispatch(setUpdateProcess(true));
  return updateAddonHelper(id, directory).then(() => {
    updateCallback(id, true, dispatch);
  }).catch(() => {
    updateCallback(id, false, dispatch);
  });
}

export function updateAddon(id) {
  return (dispatch, getState) => {
    const { addons: { directory } } = getState();
    updateAddonInner(id, directory, dispatch);
  };
}

export function setFailed(id, state) {
  return { type: SET_FAILED, id, state };
}

export function setUpdated(id, state) {
  return { type: SET_UPDATED, id, state };
}

export function setFailedReadAddonsState(state) {
  return { type: SET_FAILED_READ_ADDONS_STATE, state }
}

function chainPromises(array = []) {
  return new Promise((resolve, reject) => {
    let current = -1;
    (function callback() {
      if (++current === array.length) {
        return resolve();
      }
      return array[current]().then(callback).catch(reject);
    }());
  });
}

export function updateAll() {
  return (dispatch, getState) => {
    const { addons: {
      list,
      directory,
    }} = getState();
    chainPromises(list.map(addon => () =>
      updateAddonInner(addon.id, directory, dispatch)))
      .then(() =>
        new Notification(`WOW Addons Updater`, {
          body: `All Addons Updated.`
        }));
  };
}

export function setUpdateProcess(state) {
  return { type: SET_UPDATE_PROCESS, state };
}

export function chooseDirectory() {
  return dispatch => {
    chooseDirectoryHelper()
      .then(res => {
        dispatch(setAddonsDirectory(res));
      })
      .catch(() => {});
  };
}
