import React, { useEffect, useState } from 'react';
import UserSummary, { LoadingUserSummary } from './ProfileComponent/UserSummary';
import ModelExcerpt from './ProfileComponent/ModelExcerpt';
import { mapUserResponseToUser, ModelType, UserType } from '../../../types/ResponseTypes';
import { useParams } from 'react-router-dom';
import { UserResponseType } from '../../../actions/user/userActions';
import axios from 'axios';
import ApiRoute from '../../../services/ApiRoutesService';
import LoadingMessage from '../../components/Utils/LoadingMessage';
import NoResults from '../../components/Utils/NoResults';

interface UserProfileViewParams {
  username: string;
}

const UserProfileView: React.FC = () => {

  const {username} = useParams<UserProfileViewParams>();

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [models, setModels] = useState<ModelType[] | null>(null);

  useEffect(() => {
    setIsUserLoading(true);
    setIsModelLoading(true);

    axios.get<UserResponseType>(ApiRoute.constructProfileUrlWithUsername(username)).then(res => {
      const user = mapUserResponseToUser(res.data);
      setUser(user);
    }).catch(err => {
      setUser(null);
    }).finally(() => {
      setIsUserLoading(false);
    });
  }, []);

  const renderModels = () => {
    if (models?.length) {
      return models.map((model, index) => (
        <ModelExcerpt model={model} key={index}/>
      ));
    }
    return <NoResults/>;
  };

  return (
    <div className="bg-gray-100 w-screen h-screen overflow-hidden flex justify-center">
      <div className="flex-grow max-w-4xl h-full">
        <div className="p-1 block sm:flex">
          {
            !user ? <LoadingUserSummary/> :
              <UserSummary user={user}/>
          }
          <div className="mt-4 w-full max-w-2xl">
            <h1 className="text-center font-semibold text-xl">Creations</h1>
            <div className="p-2 w-full flex flex-col justify-center items-center space-y-4">
              {
                isModelLoading ? <LoadingMessage/> :
                  renderModels()
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
