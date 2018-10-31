import * as React from 'react';

import { Button } from '../button';
import './style.less';

export interface DirectoryInput {
  chooseDirectory: React.ReactEventHandler;
}

export const DirectoryInput: React.SFC<DirectoryInput> = (props) => {
  const { chooseDirectory } = props;
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
