import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '../button/index.jsx';
import './style.less';

export default class DirectoryInput extends PureComponent {
  static propTypes = {
    chooseDirectory: PropTypes.func.isRequired,
  };

  render() {
    const { chooseDirectory } = this.props;
    return (
      <div className="au-directory-input">
        <Button
          caption="Choose Directory"
          className="au-directory-input__choose-button"
          onClick={chooseDirectory}
        />
      </div>
    );
  }
}
