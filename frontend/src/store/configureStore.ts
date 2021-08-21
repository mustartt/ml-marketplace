import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer, { RootState } from './reducers/rootReducer';

const configureStore = (initialState: RootState) => {
  return compose(
    applyMiddleware(thunk),
  )(createStore)(rootReducer, initialState);
};

export default configureStore;