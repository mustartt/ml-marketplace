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

const LoadingUserSummary = () => {
  return (
    <div className="animate-pulse flex-shrink-0 p-5 flex flex-col items-center">
      <div
        className="flex-shrink-0 bg-gray-400 w-48 h-48 rounded-full border-2 border-indigo-600 border-opacity-50 object-cover shadow-md"
      />
      <div className="text-center">
        <h1 className="mt-3 font-semibold text-2xl text-gray-900">
          <span className="text-gray-400 bg-gray-400">User Loading</span>
        </h1>
        <h3 className="mt-1 text-lg text-gray-500">
          <span className="text-gray-400 bg-gray-400">username</span>
        </h3>
        <h3 className="mt-2 font-semibold text-lg text-gray-700">
          <span className="text-gray-400 bg-gray-400">user email</span>
        </h3>
      </div>
    </div>
  );
};

export default UserSummary;
export { LoadingUserSummary };
