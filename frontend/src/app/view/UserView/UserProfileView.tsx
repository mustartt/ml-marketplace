import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';

const UserProfileView: React.FC = () => {

  const userState = useSelector((state: RootState) => state.userState);

  return (
    <div className="w-90 p-10 rounded-lg bg-gray-200 text-black text-md">
      <pre>
        {JSON.stringify(userState, null, 2)}
      </pre>
    </div>
  );
};

export default UserProfileView;