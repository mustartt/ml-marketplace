import { Dispatch } from 'redux';
import { UserActionType } from '../../store/reducers/UserReducer/userReducer';
import axios from 'axios';
import ApiRoute from '../../services/ApiRoutesService';

export type UserDetailsResponseType = {
  firstname: string | null;
  lastname: string | null;
  profile_img: string | null;
}

export type UserResponseType = {
  id: number;
  username: string;
  email: string;
  roles: string[];
  details: UserDetailsResponseType | null;
};

const UserActions = {
  setCurrentUser: () => (dispatch: Dispatch<UserActionType>) => {
    axios.get<UserResponseType>(ApiRoute.userSelf).then(res => {
      const userProfile = res.data.details ? {
        firstname: res.data.details.firstname,
        lastname: res.data.details.lastname,
        profileImage: res.data.details.profile_img,
      } : null;
      dispatch({
        type: 'SET_USER',
        payload: {
          user: {
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            userProfile: userProfile,
          },
        },
      });
    }).catch(err => {
      console.log(err);
    });
  },
  unsetCurrentUser: () => (dispatch: Dispatch<UserActionType>) => {
    dispatch({
      type: 'UNSET_USER',
      payload: null,
    });
  },
};

export default UserActions;