import {applyMiddleware, compose, createStore,} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const configureStore = (initialState: any) => {
    return compose(
        applyMiddleware(thunk)
    )(createStore)(rootReducer, initialState);
}

export default configureStore;