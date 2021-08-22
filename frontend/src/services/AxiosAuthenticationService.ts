import axios from 'axios';
import { AuthState } from '../store/reducers/AuthReducer/authReducer';

function setAuthenticationHeader(authState: AuthState) {
  const {accessToken, isAuthenticated} = authState;
  axios.interceptors.request.use((config) => {
    if (!isAuthenticated || accessToken === '') {
      return config;
    }
    const newConfig = Object.assign({}, config);
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    return newConfig;
  });
}

export default setAuthenticationHeader;