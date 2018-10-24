import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from '../button/index.jsx';
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
