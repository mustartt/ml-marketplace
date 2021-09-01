import React, { useEffect } from 'react';

import './index.scss';
import { useDispatch } from 'react-redux';
import AuthActions from '../actions/auth/AuthActions';
import MainLayout from './view/MainLayout';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ModelPublishForm from './view/ModelPublishView/ModelPublishForm';
import ModelPublishLayout from './view/ModelPublishView/ModelPublishLayout';
import UserViewContainer from './view/UserView/UserViewContainer';
import LoginComponent from './view/UserView/LoginComponent';
import GlobalNotifcation from './components/GlobalNotification/GlobalNotification';
import RegisterComponent from './view/UserView/RegisterComponent';

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.getAccessToken());
  }, []);

  return (
    <BrowserRouter>
      <GlobalNotifcation/>
      <Switch>
        <Route path="/test">
          <div className="bg-gray-900 w-screen h-screen">
            <ModelPublishForm/>
          </div>
        </Route>

        <Route path="/models/publish">
          <ModelPublishLayout/>
        </Route>

        <Route path="/register">
          <UserViewContainer>
            <RegisterComponent/>
          </UserViewContainer>
        </Route>

        <Route path="/login">
          <UserViewContainer>
            <LoginComponent/>
          </UserViewContainer>
        </Route>

        <Route path="/">
          <MainLayout/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
