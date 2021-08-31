import React, { useEffect } from 'react';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import AuthActions from '../actions/auth/AuthActions';
import MainLayout from './view/MainLayout';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ModelPublishForm from './view/ModelPublishView/ModelPublishForm';
import ModelPublishLayout from './view/ModelPublishView/ModelPublishLayout';


const App: React.FC = () => {

  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.getAccessToken());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/test">
          <div className="bg-gray-900 w-screen h-screen">
          <ModelPublishForm/>
          </div>
        </Route>

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
