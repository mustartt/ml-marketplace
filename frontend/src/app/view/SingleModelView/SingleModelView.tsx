import React, { useEffect } from 'react';
import LayoutGoBackComponent from '../../components/Layout/LayoutGoBackComponent';
import SingleModelComponent from './SingleModelComponent';
import { useDispatch, useSelector } from 'react-redux';
import SingleModelActions from '../../../actions/model/SingleModelActions';
import { RootState } from '../../../store/reducers/rootReducer';

interface SingleModelViewProps {
  id: string;
}

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
    <div className="flex justify-center bg-white w-full h-screen">
      <div className="bg-gray-50 justify-center w-full h-full max-w-4xl">
        <LayoutGoBackComponent onBack={() => {
        }}/>
        {isLoading ?
          'Is Loading...' :
          <SingleModelComponent
            post={{
              title: model?.name || '',
              excerpt: model?.excerpt || '',
              description: model?.description || '',
            }}
            meta={{
              publisher: {
                id: model?.publisher.id || -1,
                name: model?.publisher.username || 'USER_NOTFOUND',
              },
              updated: model?.updatedAt || new Date(),
              tags: model?.tags || [],
              category: model?.category || 'CATEGORY_UNDEFINED',
              framework: model?.framework || 'FRAMEWORK_UNDEFINED',
              format: model?.format || 'FORMAT_UNDEFINED',
            }}/>
        }
      </div>
    </div>
  );
};

export default SingleModelView;