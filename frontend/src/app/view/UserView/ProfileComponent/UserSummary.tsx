import { UserType } from '../../../../types/ResponseTypes';
import React from 'react';

interface UserSummaryProps {
  user: UserType;
}

const UserSummary: React.FC<UserSummaryProps> = ({user}) => {
  return (
    <div className="flex-shrink-0 p-5 flex flex-col items-center">
      <img
        className="flex-shrink-0 w-48 h-48 rounded-full border-2 border-indigo-600 border-opacity-90 object-cover shadow-md"
        alt="User Icon"
        src={user.details.profileImage}/>
      <div className="text-center">
        <h1 className="font-semibold text-2xl text-gray-900">{`${user.details.firstname} ${user.details.lastname}`}</h1>
        <h3 className="text-lg text-gray-500">{user.username}</h3>
        <h3 className="font-semibold text-lg text-gray-700">{user.email}</h3>
      </div>
    </div>
  );
};

export default UserSummary;