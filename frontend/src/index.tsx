import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import setAuthenticationHeader from './services/AxiosAuthenticationService';

const store = configureStore({authState: {accessToken: '', isAuthenticated: false}});

store.subscribe(() => {
  setAuthenticationHeader(store.getState().authState);
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'),
);