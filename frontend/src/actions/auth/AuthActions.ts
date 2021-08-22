import { Dispatch } from 'redux';
import { AuthActionType } from '../../store/reducers/AuthReducer/authReducer';

interface TokensResponse {
  access_token: string,
  refresh_token: string
}

const AuthActions = {
  getAccessToken: () => (dispatch: Dispatch<AuthActionType>) => {
    const refreshToken = window.localStorage.getItem('refresh_token');
    if (refreshToken) {
      fetch('http://localhost:8080/api/user/refresh', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }).then(res => res.json()).then((result: TokensResponse) => {
        window.localStorage.setItem('refresh_token', result.refresh_token);
        dispatch({
          type: 'SET_AUTH',
          payload: result.access_token,
        });
      }).catch(error => {
        console.error(error);
        dispatch({
          type: 'UNSET_AUTH',
          payload: '',
        });
      });
    } else {
      dispatch({
        type: 'UNSET_AUTH',
        payload: '',
      });
    }
  },
  authenticate: (username: string, password: string) => (dispatch: Dispatch<AuthActionType>) => {
    fetch('http://localhost:8080/api/user/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(res => res.json()).then((result: TokensResponse) => {
      window.localStorage.setItem('refresh_token', result.refresh_token);
      dispatch({
        type: 'SET_AUTH',
        payload: result.access_token,
      });
    }).catch(error => {
      console.error(error);
      dispatch({
        type: 'UNSET_AUTH',
        payload: '',
      });
    });
  },
};

export default AuthActions;