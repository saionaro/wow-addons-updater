import {
  CLEANUP_SEARCH_RESULT,
  SET_ADDONS_DIRECTORY,
  SET_ADDONS_LIST,
  SET_FETCH_STATE,
  SET_FAILED,
  SET_UPDATED,
  SET_FAILED_READ_ADDONS_STATE,
  SET_SEARCH,
  SET_SEARCH_RESULT,
  SET_UPDATE_PROCESS,
} from '../actionTypes';
import { Addon } from '../types/addons';
import readAddons from '../helpers/read-addons';
import searchAddonHelper from '../helpers/search-addon';
import updateAddonHelper from '../helpers/update-addon';
import chooseDirectoryHelper from '../helpers/directory-chooser';
import debounce from '../helpers/debounce';

const getSetDirectoryAction = (path:string):object =>
  ({ type: SET_ADDONS_DIRECTORY, payload: { path } });

export function setAddonsDirectory(path:string):Function {
  return (dispatch:Function) => {
    dispatch(getSetDirectoryAction(path));
    readAddons(path).then(data => {
      dispatch(setFailedReadAddonsState(false));
      dispatch(setAddonsList(data.addons));
    }).catch(() => {
      dispatch(setFailedReadAddonsState(true));
    });
  };
}

export function setAddonsList(list:Array<Addon>):object {
  return { type: SET_ADDONS_LIST, payload: { list } };
}

export function setFetchState(id:string, state:boolean):object {
  return { type: SET_FETCH_STATE, payload: { id, state } };
}

const updateCallback = (id:string, result:boolean, dispatch:Function) => {
  dispatch(setFetchState(id, false));
  dispatch(setUpdated(id, result));
  dispatch(setFailed(id, !result));
  dispatch(setUpdateProcess(false));
};

const updateAddonInner = (addon:Addon, directory:string, dispatch:Function) => {
  dispatch(setFetchState(addon.id, true));
  dispatch(setUpdateProcess(true));
  return updateAddonHelper(addon, directory).then(() => {
    updateCallback(addon.id, true, dispatch);
  }).catch(() => {
    updateCallback(addon.id, false, dispatch);
  });
}

export function updateAddon(addon:Addon) {
  return (dispatch:Function, getState:Function) => {
    const { addons: { directory } } = getState();
    updateAddonInner(addon, directory, dispatch);
  };
}

export function setFailed(id:string, state:boolean) {
  return { type: SET_FAILED, payload: { id, state } };
}

export function setUpdated(id:string, state:boolean) {
  return { type: SET_UPDATED, payload: { id, state } };
}

export function setFailedReadAddonsState(state:boolean) {
  return { type: SET_FAILED_READ_ADDONS_STATE, payload: { state } }
}

export function updateAll() {
  return (dispatch:Function, getState:Function) => {
    const { addons: {
      list,
      directory,
    }} = getState();
    Promise.all(
      list.map((addon:Addon) =>
        updateAddonInner(addon, directory, dispatch)
      ))
      .then(() =>
        new Notification(`WOW Addons Updater`, {
          body: `All Addons Updated.`
        }));
  };
}

export function setUpdateProcess(state:boolean) {
  return { type: SET_UPDATE_PROCESS, payload: { state } };
}

export function chooseDirectory() {
  return (dispatch:Function) => {
    chooseDirectoryHelper()
      .then((res) => {
        dispatch(setAddonsDirectory(res.directory));
      })
      .catch(() => {});
  };
}

const searchDebounced = debounce(function(dispatch:Function, query:string) {
  dispatch({ type: SET_SEARCH });
  searchAddonHelper(query).then(res => {
    dispatch({ type: SET_SEARCH_RESULT, payload: res });
  });
}, 1000);

export function searchAddon(query:string) {
  return (dispatch:Function) => {
    searchDebounced(dispatch, query);
  };
}

export function installAddon(addon:Addon) {
  return (dispatch:Function, getState:Function) => {
    const { addons: { directory } } = getState();
    dispatch({ type: CLEANUP_SEARCH_RESULT });
    updateAddonInner(addon, directory, dispatch).then(() =>
      dispatch(setAddonsDirectory(directory)));
  };
}
