import React from 'react';
import ModelResultComponent from '../../components/Product/ModelResultComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { ModelType } from '../../../types/ResponseTypes';

const IMG_URL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';

const ModelPageView: React.FC = () => {

  const state = useSelector((state: RootState) => state.modelState);

  const renderModels = () => {
    return state.models.map((model: ModelType, index: number) => {
        const publisherInfo = {
          name: model.publisher.username,
          profileUrl: '', /* not used */
        };

        const tags = model.tags.map((tag: string) => {
          return {
            name: tag,
            /* calculate redirect links */
          };
        });

        return <ModelResultComponent
          key={index}
          productID={model.id}
          img={IMG_URL}
          name={model.name}
          publisher={publisherInfo}
          type={model.category}
          excerpt={model.excerpt}
          price={model.price}
          updatedAt={model.updatedAt}
          architecture={model.framework}
          format={model.format}
          tags={tags}
        />;
      },
    );
  };

  const renderMainContent = () => {
    if (state.isLoading) {
      return (
        <div className="w-full flex justify-center items-center p-5">
          <div className="flex items-center animate-pulse text-gray-900 tracking-wide font-semibold text-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      );
    } else if (state.models.length > 0) {
      return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-5">
          {renderModels()}
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center items-center p-5">
          <span className="text-gray-900 tracking-wide font-semibold text-lg">No Results...</span>
        </div>
      );
    }
  };

  return renderMainContent();
};
export default ModelPageView;