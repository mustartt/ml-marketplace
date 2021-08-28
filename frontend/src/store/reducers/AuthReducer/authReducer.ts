export type AuthActionType = {
  type: string;
  payload: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
}

const initialState = {
  isAuthenticated: false,
  accessToken: '',
};

export { initialState as authInitialState };

const authReducer = (state: AuthState = initialState, action: AuthActionType) => {
  switch (action.type) {
    case 'SET_AUTH':
      return Object.assign({}, state, {
        isAuthenticated: true,
        accessToken: action.payload,
      });
    case 'UNSET_AUTH':
      return Object.assign({}, state, {
        isAuthenticated: false,
        accessToken: '',
      });
    default:
      return state;
  }
};

export default authReducer;