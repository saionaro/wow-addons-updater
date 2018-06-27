import {
  SET_ADDONS_DIRECTORY,
  SET_ADDONS_LIST,
  SET_FETCH_STATE,
  SET_FAILED,
  SET_UPDATED,
  SET_FAILED_READ_ADDONS_STATE,
  SET_UPDATE_PROCESS,
} from '../actionTypes';

const setList = (state, data) => {
  const newState = Object.assign({}, state);
  newState.list = data.list;
  return newState;
};

const setDir = (state, data) => {
  const newState = Object.assign({}, state);
  newState.directory = data.path;
  newState.list = [];
  newState.fetching = {};
  newState.failed = {};
  newState.updated = {};
  return newState;
};

const setFetchState = (state, data) => {
  const newState = Object.assign({}, state);
  newState.fetching = Object.assign({}, newState.fetching);
  newState.fetching[data.id] = data.state;
  return newState;
};

const setFailed = (state, data) => {
  const newState = Object.assign({}, state);
  newState.failed = Object.assign({}, newState.failed);
  newState.failed[data.id] = data.state;
  return newState;
};

const setUpdated = (state, data) => {
  const newState = Object.assign({}, state);
  newState.updated = Object.assign({}, newState.updated);
  newState.updated[data.id] = data.state;
  return newState;
};

const setFailedReadState = (state, data) => {
  const newState = Object.assign({}, state);
  newState.failedRead = data.state;
  return newState;
}

const setUpdateProcess = (state, data) => {
  const newState = Object.assign({}, state);
  newState.updateProcess = data.state;
  return newState;
}

export default function(state = {}, action) {
  switch (action.type) {
  case SET_ADDONS_DIRECTORY:
    return setDir(state, action);
  case SET_ADDONS_LIST:
    return setList(state, action);
  case SET_FETCH_STATE:
    return setFetchState(state, action);
  case SET_FAILED:
    return setFailed(state, action);
  case SET_UPDATED:
    return setUpdated(state, action);
  case SET_FAILED_READ_ADDONS_STATE:
    return setFailedReadState(state, action);
  case SET_UPDATE_PROCESS:
    return setUpdateProcess(state, action);
  default:
    return state;
  }
}
