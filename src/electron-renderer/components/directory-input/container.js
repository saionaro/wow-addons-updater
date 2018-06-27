import { connect } from 'react-redux';

import DirectoryInput from './index.jsx';
import { chooseDirectory } from '../../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  chooseDirectory: () => dispatch(chooseDirectory()),
});

const ConnectedDirectoryInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectoryInput);

export default ConnectedDirectoryInput;
