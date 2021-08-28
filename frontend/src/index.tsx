import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import setAuthenticationHeader from './services/AxiosAuthenticationService';
import { authInitialState } from './store/reducers/AuthReducer/authReducer';
import { layoutDefaultState } from './store/reducers/LayoutReducer/layoutReducer';

const store = configureStore(
  {
    authState: authInitialState,
    layoutState: layoutDefaultState,
  },
);

store.subscribe(() => {
  setAuthenticationHeader(store.getState().authState);
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'),
);