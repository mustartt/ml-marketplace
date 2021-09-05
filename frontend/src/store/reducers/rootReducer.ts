import { combineReducers } from 'redux';

import authReducer from './AuthReducer/authReducer';
import layoutReducer from './LayoutReducer/layoutReducer';
import modelReducer from './ModelReducer/modelReducer';
import userReducer from './UserReducer/userReducer';
import singleModelReducer from './ModelReducer/singleModelReducer';

const rootReducer = combineReducers({
  authState: authReducer,
  layoutState: layoutReducer,
  modelState: modelReducer,
  singleModelState: singleModelReducer,
  userState: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
