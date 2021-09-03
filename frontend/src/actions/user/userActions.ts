import { Dispatch } from 'redux';
import { UserActionType } from '../../store/reducers/UserReducer/userReducer';
import axios from 'axios';
import ApiRoute from '../../services/ApiRoutesService';

export type UserDetailsResponseType = {
  firstname: string;
  lastname: string;
  profile_img: string;
}

export type UserResponseType = {
  id: number;
  username: string;
  email: string;
  roles: string[];
  details: UserDetailsResponseType;
};

const UserActions = {
  setCurrentUser: () => (dispatch: Dispatch<UserActionType>) => {
    axios.get<UserResponseType>(ApiRoute.userSelf).then(res => {
      const userProfile = {
        firstname: res.data.details.firstname,
        lastname: res.data.details.lastname,
        profileImage: res.data.details.profile_img,
      };
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