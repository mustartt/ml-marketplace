import React, { useEffect } from 'react';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
import AuthActions from '../actions/auth/AuthActions';
import axios from 'axios';

const App: React.FC = () => {

  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('mounted')
    dispatch(AuthActions.getAccessToken());
  }, []);

  return (
    <div>
      <h1>Application</h1>
      <pre>{JSON.stringify(authState, null, 2)}</pre>
      <button onClick={() => {
        dispatch(AuthActions.getAccessToken());
      }}>Reauthenticate
      </button>
      <button onClick={() => {
        console.log(authState);

        axios.get('http://localhost:8080/api/users').then(result => {
          console.log(result);
        }).catch(error => {
          console.log(error);
        });
      }}>Test
      </button>
    </div>
  );
};

export default App;
