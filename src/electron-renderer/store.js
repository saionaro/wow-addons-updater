import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';

const initialState = {
  addons: {
    list: [],
    directory: '',
    fetching: {},
    failed: {},
    updated: {},
    failedRead: false,
    updateProcess: false,
  },
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger)
);

export default store;
