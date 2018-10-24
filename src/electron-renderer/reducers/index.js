import { combineReducers } from 'redux';
import addons from './addons.js';
import search from './search.js';

const addonsApp = combineReducers({
  addons,
  search,
});

export default addonsApp;
