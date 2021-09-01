import React, { useRef, useState } from 'react';
import CustomInputField from '../CustomInputField';
import HeroIcons from '../HeroIcons';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AuthActions, { TokensResponse } from '../../../actions/auth/AuthActions';
import ApiRoute from '../../../services/ApiRoutesService';
import LayoutActions from '../../../actions/layout/LayoutActions';
import LoadingSpinner from '../Utils/LoadingSpinner';

interface LoginProps {

}

const LoginComponent: React.FC<LoginProps> = () => {
  const dispatch = useDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (usernameRef.current && passwordRef.current) {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      setIsLoading(true);

      axios.post<TokensResponse>(ApiRoute.auth, {username, password}).then(res => {
        dispatch(AuthActions.setAuthentication(res.data.access_token, res.data.refresh_token));
        window.location.assign(ApiRoute.root);
      }).catch(err => {
        dispatch(LayoutActions.autoCloseNotification('info', `${err.toString()} Invalid username or password!`));
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="w-full md:w-96 py-10 px-5 bg-gray-100 rounded-3xl shadow-xl">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900 uppercase">Login</h1>
        <p>Enter your account information</p>
      </div>
      <div className="flex -mx-3">
        <div className="w-full px-3 mb-5">
          <CustomInputField
            icon={<div className="h-5 w-5">{HeroIcons.user}</div>}
            name="username"
            label="Username"
            inputType="text"
            inputRef={usernameRef}
            placeholder="john_smith"/>
        </div>
      </div>
      <div className="flex -mx-3">
        <div className="w-full px-3 mb-12">
          <CustomInputField
            icon={<div className="h-5 w-5">{HeroIcons.key}</div>}
            name="password"
            label="Password"
            inputType="password"
            inputRef={passwordRef}
            placeholder="**********"/>
        </div>
      </div>
      <div className="flex -mx-3">
        <div className="w-full px-3 mb-5">
          <button
            onClick={handleSubmit}
            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold uppercase">
            <span className="flex justify-center items-center h-6">
              {
                !isLoading ? 'Login' :
                  <LoadingSpinner/>
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;