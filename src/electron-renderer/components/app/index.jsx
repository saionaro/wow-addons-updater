import React, { PureComponent } from 'react';

import AddonsTable from '../addons-table/container.js';
import DirectoryInput from '../directory-input/container.js';

export default class App extends PureComponent {
  render() {
    return (
      <div className="au-app">
        <DirectoryInput />
        <AddonsTable />
      </div>
    );
  }
}
