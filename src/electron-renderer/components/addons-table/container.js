import { connect } from 'react-redux';

import AddonsTable from './index.jsx';
import {
  updateAddon,
  updateAll,
} from '../../actions';

const mapStateToProps = state => {
  const {
    list,
    directory,
    fetching,
    failed,
    updated,
    failedRead,
    updateProcess,
  } = state.addons;
  return {
    list,
    directory,
    fetching,
    failed,
    updated,
    failedRead,
    updateProcess,
  };
};

const mapDispatchToProps = dispatch => ({
  updateAddon: title => dispatch(updateAddon(title)),
  updateAll: () => dispatch(updateAll()),
});

const ConnectedAddonsTable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddonsTable);

export default ConnectedAddonsTable;
