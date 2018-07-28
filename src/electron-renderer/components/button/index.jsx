import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.less';

export default class Button extends PureComponent {
  static propTypes = {
    caption: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
    disabled: false,
  };

  render() {
    const {
      caption,
      onClick,
      disabled,
      className,
    } = this.props;
    return (
      <button
        className={cn(
          'au-button',
          className
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {caption}
      </button>
    );
  }
}
