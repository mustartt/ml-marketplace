import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import AuthActions from '../actions/auth/AuthActions';
import LoginComponent from './components/Login/LoginComponent';
import AppBgComponent from './components/AppBgComponent';
import RegisterComponent from './components/RegisterComponent';
import SearchBox from './components/SearchBox/SearchBox';
import ModelPageView from './view/ModelResult/ModelPageView';
import ModelResultView from './view/ModelResult/ModelResultView';

const App: React.FC = () => {

  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.getAccessToken());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <AppBgComponent>
            <LoginComponent/>
          </AppBgComponent>
        </Route>
        <Route path="/register">
          <AppBgComponent>
            <RegisterComponent/>
          </AppBgComponent>
        </Route>
        <Route path="/models">
          <ModelResultView />
        </Route>
        <Route path="/">
          <SearchBox
            isImmediate
            search={(val) => {
              console.log(val);
            }}/>
        </Route>
      </Switch>
    </Router>

  );
};

export default App;
