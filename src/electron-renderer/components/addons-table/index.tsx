import * as React from 'react';
import cn from 'classnames';

import { Button } from '../button';
import { StoreState } from '../../types/addons';
import './style.less';

export interface AddonsTableProps {
  data: StoreState;
  updateAddon: Function;
  updateAll: React.ReactEventHandler;
}

export class AddonsTable extends React.PureComponent<AddonsTableProps> {
  private renderBody = () => {
    const {
      data: {
        list,
        fetching,
        failed,
        updated,
        updateProcess,
      },
      updateAddon,
    } = this.props;
    return (
      <div className="au-addons-table__body">
        {list.map(addon => {
          return (
            <div
              className={cn(
                'au-addons-table__addon',
                fetching[addon.id] && 'au-addons-table__addon--fetching',
                failed[addon.id] && 'au-addons-table__addon--failed',
                updated[addon.id] && 'au-addons-table__addon--updated'
              )}
              key={addon.id}
              onClick={() => { !updateProcess && updateAddon(addon) }}
            >
              <span className="au-addons-table__icon"></span>
              {addon.title}
            </div>
          );
        })}
      </div>
    );
  }

  private renderReadError = () => {
    return (
      <div className="au-addons-table__error">
        Error while reading directory!
      </div>
    );
  }

  render() {
    const {
      data: {
        directory,
        failedRead,
        list,
        updateProcess,
      },
    } = this.props;
    return (
      <div className="au-addons-table">
        <div className="au-addons-table__head">
          <div className="au-addons-table__current">
            <div className="au-addons-table__current-label">
              Current directory:
            </div>
            <div className="au-addons-table__current-title">
              {directory}
            </div>
            {failedRead ? this.renderReadError() : this.renderBody()}
            {!!list.length && (
              <Button
                disabled={updateProcess}
                className="au-addons-table__update-button"
                caption="Update All"
                onClick={this.props.updateAll}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
