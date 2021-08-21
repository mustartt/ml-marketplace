import React, { useEffect } from 'react';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import AuthActions from '../actions/auth/AuthActions';
import LoginComponent from './components/Login/LoginComponent';
import AppBgComponent from './components/AppBgComponent';
import RegisterComponent from './components/RegisterComponent';

const App: React.FC = () => {

  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.getAccessToken());
  }, []);

  return (
    <Router>
      <div>
        <h1>Application</h1>
        <pre>{JSON.stringify(authState, null, 2)}</pre>
        <button
          type="button"
          className="text-gray-100 m-3 bg-indigo-500 font-semibold px-5 py-3 rounded-full shadow"
          onClick={() => {
          dispatch(AuthActions.getAccessToken());
        }}>
          Reauthenticate
        </button>

        <ul className="flex space-x-5 px-10 py-10 bg-gray-900">
          <li className="text-gray-100 bg-indigo-500 font-semibold px-5 py-3 rounded-full shadow">
            <Link to="/">Home</Link>
          </li>
          <li className="text-gray-100 bg-indigo-500 font-semibold px-5 py-3 rounded-full shadow">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-gray-100 bg-indigo-500 font-semibold px-5 py-3 rounded-full shadow">
            <Link to="/register">Register</Link>
          </li>
        </ul>

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
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>

      </div>
    </Router>

  );
};

export default App;
