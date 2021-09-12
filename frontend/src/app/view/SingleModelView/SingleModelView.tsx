import React, { useEffect } from 'react';
import SingleModelComponent from './SingleModelComponent';
import { useDispatch, useSelector } from 'react-redux';
import SingleModelActions from '../../../actions/model/SingleModelActions';
import { RootState } from '../../../store/reducers/rootReducer';
import ExternalPageContainer from '../ExternalPageView/ExternalPageContainer';
import { ModelType } from '../../../types/ResponseTypes';
import LoadingMessage from '../../components/Utils/LoadingMessage';

interface SingleModelViewProps {
  id: string;
}

const DEFAULT_MODEL: ModelType = {
  id: 0,
  name: 'NAME_UNDEFINED',
  category: 'CATEGORY_UNDEFINED',
  description: '# Description',
  excerpt: 'Excerpt',
  format: 'FORMAT_UNDEFINED',
  framework: 'FORMAT_UNDEFINED',
  price: 0,
  publisher: {
    username: 'USER_UNDEFINED',
    email: 'EMAIL_UNDEFINED',
    id: 0,
    roles: [],
    details: {
      firstname: 'FIRSTNAME_UNDEFINED',
      lastname: 'LASTNAME_UNDEFINED',
      profileImage: 'PROFILE_IMAGE_UNDEFINED',
    },
  },
  tags: [],
  updatedAt: new Date(),
  createdAt: new Date(),
};

const SingleModelView: React.FC<SingleModelViewProps> = ({id}) => {

  const {isLoading, model, error} = useSelector((state: RootState) => state.singleModelState);
  const dispatch = useDispatch();

  useEffect(() => {
    const modelId = parseInt(id || '');
    if (isNaN(modelId)) {
      dispatch(SingleModelActions.invalidId('Invalid ID'));
    } else {
      dispatch(SingleModelActions.load(modelId));
    }
  }, []);

  return (
    <ExternalPageContainer>
      <div className="flex justify-center">
        {
          isLoading ?
            <div className="mt-20">
              <LoadingMessage/>
            </div> :
            (
              error ?
                <div className="mt-20">
                  {error}
                </div> :
                <div className="flex-grow max-w-6xl">
                  <SingleModelComponent
                    model={model || DEFAULT_MODEL}/>
                </div>
            )
        }
      </div>
    </ExternalPageContainer>
  );
};

export default SingleModelView;