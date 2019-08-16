import * as React from 'react';

import { Button } from '../button';
import { StoreState as AddonsState } from '../../types/addons';
import { StoreState as SearchState } from '../../types/search';
import { AddonsTable } from '../addons-table';
import { DirectoryInput } from '../directory-input';
import { Search } from '../search';
import './style.less';

export interface AppProps {
  installAddon: Function;
  chooseDirectory: React.ReactEventHandler;
  searchAddon: Function;
  updateAddon: Function;
  updateAll: React.ReactEventHandler;
  addons: AddonsState;
  search: SearchState;
}

export class App extends React.PureComponent<AppProps> {
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
        updateProcess
      },
    } = this.props;

    return (
      <div className="au-app">
        <div className="au-app__row">
          <DirectoryInput
            chooseDirectory={chooseDirectory}
          />
          <Button
            disabled={updateProcess || !addons.list.length}
            className="au-app__update-button"
            caption="Update All"
            onClick={updateAll}
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
          data={addons}
          updateAddon={updateAddon}
        />
      </div>
    );
  }
}
