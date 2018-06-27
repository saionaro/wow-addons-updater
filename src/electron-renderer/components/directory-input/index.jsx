import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class App extends PureComponent {
  static propTypes = {
    chooseDirectory: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="au-directory-input">
        <button
          className="au-directory-input__choose"
          onClick={this.props.chooseDirectory}
        >
          Choose Directory
        </button>
      </div>
    );
  }
}
