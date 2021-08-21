import { combineReducers } from 'redux';

import authReducer from './AuthReducer/authReducer';

const rootReducer = combineReducers({
  authState: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;