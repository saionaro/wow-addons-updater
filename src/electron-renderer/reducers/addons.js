import {
  SET_ADDONS_DIRECTORY,
  SET_ADDONS_LIST,
  SET_FETCH_STATE,
  SET_FAILED,
  SET_UPDATED,
  SET_FAILED_READ_ADDONS_STATE,
  SET_UPDATE_PROCESS,
} from '../actionTypes';

const initial = {
  list: [],
  directory: '',
  fetching: {},
  failed: {},
  updated: {},
  failedRead: false,
  updateProcess: false,
};

export default function(state = initial, action) {

  switch (action.type) {

  case SET_ADDONS_DIRECTORY:
    return {
      ...state,
      directory: action.payload.path,
      list: [],
      fetching: {},
      failed: {},
      updated: {},
    };

  case SET_ADDONS_LIST:
    return {
      ...state,
      list: action.payload.list,
    };

  case SET_FETCH_STATE:
    return {
      ...state,
      fetching: {
        ...state.fetching,
        [action.payload.id]: action.payload.state,
      },
    };

  case SET_FAILED:
    return {
      ...state,
      failed: {
        ...state.failed,
        [action.payload.id]: action.payload.state,
      }
    };

  case SET_UPDATED:
    return {
      ...state,
      updated: {
        ...state.updated,
        [action.payload.id]: action.payload.state,
      },
    };

  case SET_FAILED_READ_ADDONS_STATE:
    return {
      ...state,
      failedRead: action.payload.state,
    };

  case SET_UPDATE_PROCESS:
    return {
      ...state,
      updateProcess: action.payload.state,
    };

  default:
    return state;
  }
}
