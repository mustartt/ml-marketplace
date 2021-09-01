import { combineReducers } from 'redux';

import authReducer from './AuthReducer/authReducer';
import layoutReducer from './LayoutReducer/layoutReducer';
import modelReducer from './ModelReducer/modelReducer';
import userReducer from './UserReducer/userReducer';

const rootReducer = combineReducers({
  authState: authReducer,
  layoutState: layoutReducer,
  modelState: modelReducer,
  userState: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
