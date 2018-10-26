import {
  CLEANUP_SEARCH_RESULT,
  SET_SEARCH,
  SET_SEARCH_RESULT,
} from '../actionTypes';
import { StoreState } from '../types/search';
import { Action } from '../types/actions';

const initial:StoreState = {
  cache: {},
  pending: false,
  list: [],
};

export default function(state:StoreState = initial, action:Action) {

  switch (action.type) {

  case SET_SEARCH:
    return {
      ...state,
      pending: true,
    };

  case SET_SEARCH_RESULT:
    return {
      ...state,
      cache: {
        ...state.cache,
        ...action.payload.fullData,
      },
      list: action.payload.list,
      pending: false,
    };

  case CLEANUP_SEARCH_RESULT:
    return {
      ...state,
      list: [],
    };

  default:
    return state;
  }
}
