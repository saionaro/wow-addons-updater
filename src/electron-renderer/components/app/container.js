import { connect } from 'react-redux';

import App from './index.jsx';
import {
  chooseDirectory,
  installAddon,
  searchAddon,
  updateAddon,
  updateAll,
} from '../../actions';

function mapStateToProps({ addons, search }) {
  return { addons, search };
}

function mapDispatchToProps(dispatch) {
  const wrapper = fn => payload => dispatch(fn(payload));
  return {
    chooseDirectory: wrapper(chooseDirectory),
    installAddon: wrapper(installAddon),
    searchAddon: wrapper(searchAddon),
    updateAddon: wrapper(updateAddon),
    updateAll: wrapper(updateAll),
  };
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default ConnectedApp;
