import { combineReducers } from 'redux';

import authReducer from './AuthReducer/authReducer';
import layoutReducer from './LayoutReducer/layoutReducer';
import modelReducer from './ModelReducer/modelReducer';

const rootReducer = combineReducers({
  authState: authReducer,
  layoutState: layoutReducer,
  modelState: modelReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
