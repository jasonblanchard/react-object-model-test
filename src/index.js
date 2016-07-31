import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './app/state/configureStore';
import routes from './app/routes/index';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
