import { combineReducers } from 'redux';

import authReducer from './AuthReducer/authReducer';
import layoutReducer from './LayoutReducer/layoutReducer';

const rootReducer = combineReducers({
  authState: authReducer,
  layoutState: layoutReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
