import { connect } from 'react-redux';

import DirectoryInput from './index.jsx';
import { searchAddon } from '../../actions';

const mapStateToProps = ({
  addons: { searchCache, searchList, searchPending },
}) => ({ searchCache, searchList, searchPending });

const mapDispatchToProps = dispatch => ({
  searchAddon: (payload) => dispatch(searchAddon(payload)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectoryInput);

export default Search;
