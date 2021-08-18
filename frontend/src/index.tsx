import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

const store = configureStore({userState: null});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);