import { connect } from 'react-redux';
import { App } from './index';
import {
  chooseDirectory,
  installAddon,
  searchAddon,
  updateAddon,
  updateAll,
} from '../../actions';
import { StoreState as AddonsState} from '../../types/addons';
import { StoreState as SearchState } from '../../types/search';

function mapStateToProps({ addons, search }:{addons: AddonsState, search: SearchState}) {
  return { addons, search };
}

function mapDispatchToProps(dispatch: Function) {
  const wrapper = (fn: Function) => (payload: any) => dispatch(fn(payload));
  return {
    chooseDirectory: wrapper(chooseDirectory),
    installAddon: wrapper(installAddon),
    searchAddon: wrapper(searchAddon),
    updateAddon: wrapper(updateAddon),
    updateAll: wrapper(updateAll),
  };
}

export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
