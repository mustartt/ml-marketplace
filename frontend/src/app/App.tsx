import React, { useEffect } from 'react';

import './index.scss';
import { useDispatch } from 'react-redux';
import AuthActions from '../actions/auth/AuthActions';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import UserViewContainer from './view/UserView/UserViewContainer';
import LoginComponent from './view/UserView/LoginComponent';
import GlobalNotifcation from './components/GlobalNotification/GlobalNotification';
import RegisterComponent from './view/UserView/RegisterComponent';
import UserProfileView from './view/UserView/UserProfileView';
import SingleModelView from './view/SingleModelView/SingleModelView';
import ModelPublishLayout from './view/ModelPublishView/ModelPublishLayout';
import MainLayout from './view/MainLayout';
import ExternalPageContainer from './view/ExternalPageView/ExternalPageContainer';

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
          <ExternalPageContainer>
            {
              Array.from({length: 10}, (value, key) =>
                <div className="h-10 mt-2 bg-gray-300"/>)
            }
          </ExternalPageContainer>
        </Route>

        <Route path="/user/:username" component={UserProfileView}/>

        <Route path="/profile">
          <UserViewContainer>
            <UserProfileView/>
          </UserViewContainer>
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

        <Route path="/model/:id" render={({match}) =>
          <SingleModelView id={match.params.id}/>
        }/>

        <Route path="/models/publish">
          <ModelPublishLayout/>
        </Route>

        <Route path="/">
          <MainLayout/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
