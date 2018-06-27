import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.less';

export default class AddonsTable extends PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    directory: PropTypes.string.isRequired,
    fetching: PropTypes.object.isRequired,
    failed: PropTypes.object.isRequired,
    updated: PropTypes.object.isRequired,
    updateAddon: PropTypes.func.isRequired,
    updateAll: PropTypes.func.isRequired,
    failedRead: PropTypes.bool.isRequired,
    updateProcess: PropTypes.bool.isRequired,
  };

  _renderBody = () => {
    const {
      list,
      fetching,
      failed,
      updated,
      updateAddon,
      updateProcess,
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
              onClick={() => { !updateProcess && updateAddon(addon.name) }}
            >
              {addon.name}
            </div>
          );
        })}
      </div>
    );
  }

  _renderReadError = () => {
    return (
      <div className="au-addons-table__error">
        Error while reading directory!
      </div>
    );
  }

  render() {
    const {
      directory,
      failedRead,
      list,
      updateProcess,
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
            {failedRead ? this._renderReadError() : this._renderBody()}
            {!!list.length && (
              <button
                disabled={updateProcess}
                className="au-addons-table__update-all"
                onClick={this.props.updateAll}
              >
                Update All
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
