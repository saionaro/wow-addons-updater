import * as React from 'react';
import cn from 'classnames';

import './style.less';

export interface Button {
  caption: string;
  onClick: React.ReactEventHandler;
  disabled?: boolean;
  className?: string;
}

export const Button: React.SFC<Button> = (props) => {
  const {
    caption,
    onClick,
    disabled,
    className,
  } = props;
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
