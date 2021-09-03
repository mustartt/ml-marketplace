export type User = {
  id: number;
  username: string;
  email: string;
  userProfile: {
    firstname: string;
    lastname: string;
    profileImage: string;
  };
}

export type UserState = {
  user: User | null;
}

const defaultState: UserState = {
  user: null,
};

export { defaultState as userDefaultState };

export type UserActionType = {
  type: string;
  payload: null | {
    user: User;
  };
};

const userReducer = (state: UserState = defaultState, action: UserActionType) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.payload?.user,
      });
    case 'UNSET_USER':
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;