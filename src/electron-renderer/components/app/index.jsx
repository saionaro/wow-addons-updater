import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AddonsTable from '../addons-table/index.jsx';
import DirectoryInput from '../directory-input/index.jsx';
import Search from '../search/index.jsx';
import './style.less';

export default class App extends PureComponent {
  static propTypes = {
    installAddon: PropTypes.func.isRequired,
    chooseDirectory: PropTypes.func.isRequired,
    searchAddon: PropTypes.func.isRequired,
    updateAddon: PropTypes.func.isRequired,
    updateAll: PropTypes.func.isRequired,

    addons: PropTypes.shape(),
    search: PropTypes.shape(),
  };

  render() {
    const {
      installAddon,
      chooseDirectory,
      searchAddon,
      updateAddon,
      updateAll,
      search,
      addons,
      addons: {
        directory,
      },
    } = this.props;

    return (
      <div className="au-app">
        <div className="au-app__row">
          <DirectoryInput
            chooseDirectory={chooseDirectory}
          />
          {directory && (
            <Search
              searchAddon={searchAddon}
              onClickResult={installAddon}
              data={search}
            />
          )}
        </div>
        <AddonsTable
          {...addons}
          updateAddon={updateAddon}
          updateAll={updateAll}
        />
      </div>
    );
  }
}
