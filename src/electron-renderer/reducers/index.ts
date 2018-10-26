import { combineReducers } from 'redux';
import addons from './addons';
import search from './search';

const addonsApp = combineReducers({
  addons,
  search,
});

export default addonsApp;
