import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { ModelType } from '../../../types/ResponseTypes';
import ModelDisplayComponent from '../../components/Product/ModelDisplayComponent';
import LoadingMessage from '../../components/Utils/LoadingMessage';

const ModelPageView: React.FC = () => {

  const state = useSelector((state: RootState) => state.modelState);

  const renderModels = () => {
    return state.models.map((model: ModelType, index: number) => {
        return (
          <ModelDisplayComponent
            key={index}
            product={model}
            meta={{
              rating: 3,
              likes: 123,
              comments: 123,
              downloads: 123,
            }}/>
        );
      },
    );
  };

  const renderMainContent = () => {
    if (state.isLoading) {
      return (
        <div className="w-full flex justify-center items-center p-5">
          <LoadingMessage/>
        </div>
      );
    } else if (state.models.length > 0) {
      return (
        <div className="w-full overflow-y-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-5">
            {renderModels()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center items-center p-5">
          <span className="text-gray-700 tracking-wide font-semibold text-lg">No Results...</span>
        </div>
      );
    }
  };

  return (
    <div className="p-5">
      {renderMainContent()}
    </div>
  );
};
export default ModelPageView;