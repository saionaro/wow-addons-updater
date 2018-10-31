import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedApp } from './components/app/container';

import store from './store';

import './style.less';

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
